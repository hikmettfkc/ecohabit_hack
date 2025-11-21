using System.Data;
using System.Data.SqlClient;
using SqlServerManager.Models;

namespace SqlServerManager.Services
{
    public class DatabaseService
    {
        private Dictionary<string, SqlConnection> _connections = new Dictionary<string, SqlConnection>();
        private int _connectionTimeout = 5; // seconds
        
        public event EventHandler<string>? LogMessage;
        
        public void SetConnectionTimeout(int seconds)
        {
            _connectionTimeout = seconds;
        }
        
        public async Task<bool> TestConnectionAsync(string serverName, string username, string password, string database = "master")
        {
            try
            {
                var connectionString = BuildConnectionString(serverName, username, password, database);
                using var connection = new SqlConnection(connectionString);
                await connection.OpenAsync();
                return true;
            }
            catch (Exception ex)
            {
                LogMessage?.Invoke(this, $"Connection failed to {serverName}: {ex.Message}");
                return false;
            }
        }
        
        public async Task<Dictionary<string, bool>> ConnectToServersAsync(List<ServerInfo> servers, string username, string password, string database = "master")
        {
            var results = new Dictionary<string, bool>();
            
            // Close existing connections
            CloseAllConnections();
            
            var tasks = servers.Where(s => s.IsSelected).Select(async server =>
            {
                var success = false;
                try
                {
                    var connectionString = BuildConnectionString(server.ServerName, username, password, database);
                    var connection = new SqlConnection(connectionString);
                    
                    using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(_connectionTimeout));
                    await connection.OpenAsync(cts.Token);
                    
                    lock (_connections)
                    {
                        _connections[server.ServerName] = connection;
                    }
                    
                    success = true;
                    server.ConnectionStatus = "Connected";
                    LogMessage?.Invoke(this, $"Connected to {server.ServerName}");
                }
                catch (Exception ex)
                {
                    server.ConnectionStatus = $"Failed: {ex.Message}";
                    LogMessage?.Invoke(this, $"Failed to connect to {server.ServerName}: {ex.Message}");
                }
                finally
                {
                    server.LastConnectionAttempt = DateTime.Now;
                    lock (results)
                    {
                        results[server.ServerName] = success;
                    }
                }
            });
            
            await Task.WhenAll(tasks);
            return results;
        }
        
        public async Task<List<QueryResult>> ExecuteQueryAsync(string query, List<ServerInfo> servers)
        {
            var results = new List<QueryResult>();
            var tasks = servers.Where(s => s.IsSelected && _connections.ContainsKey(s.ServerName)).Select(async server =>
            {
                var result = new QueryResult { ServerName = server.ServerName };
                var startTime = DateTime.Now;
                
                try
                {
                    SqlConnection? connection;
                    lock (_connections)
                    {
                        connection = _connections.ContainsKey(server.ServerName) ? _connections[server.ServerName] : null;
                    }
                    
                    if (connection == null || connection.State != ConnectionState.Open)
                    {
                        result.Success = false;
                        result.Message = "No active connection";
                        return result;
                    }
                    
                    using var command = new SqlCommand(query, connection);
                    command.CommandTimeout = 30;
                    
                    if (query.Trim().ToUpper().StartsWith("SELECT"))
                    {
                        using var adapter = new SqlDataAdapter(command);
                        var dataTable = new DataTable();
                        await Task.Run(() => adapter.Fill(dataTable));
                        
                        result.Success = true;
                        result.ResultData = dataTable;
                        result.RowsAffected = dataTable.Rows.Count;
                        result.Message = $"Query executed successfully. {dataTable.Rows.Count} rows returned.";
                    }
                    else
                    {
                        var rowsAffected = await command.ExecuteNonQueryAsync();
                        result.Success = true;
                        result.RowsAffected = rowsAffected;
                        result.Message = $"Query executed successfully. {rowsAffected} rows affected.";
                    }
                    
                    LogMessage?.Invoke(this, $"[{server.ServerName}] {result.Message}");
                }
                catch (Exception ex)
                {
                    result.Success = false;
                    result.Message = $"Error: {ex.Message}";
                    LogMessage?.Invoke(this, $"[{server.ServerName}] Error: {ex.Message}");
                }
                finally
                {
                    result.ExecutionTime = DateTime.Now - startTime;
                    lock (results)
                    {
                        results.Add(result);
                    }
                }
                
                return result;
            });
            
            await Task.WhenAll(tasks);
            return results;
        }
        
        public async Task<int> ExecuteCountQueryAsync(string serverName, string tableName, string username, string password, string database)
        {
            try
            {
                var connectionString = BuildConnectionString(serverName, username, password, database);
                using var connection = new SqlConnection(connectionString);
                await connection.OpenAsync();
                
                var query = $"SELECT COUNT(*) FROM {tableName}";
                using var command = new SqlCommand(query, connection);
                var result = await command.ExecuteScalarAsync();
                
                return Convert.ToInt32(result);
            }
            catch (Exception ex)
            {
                LogMessage?.Invoke(this, $"Error counting rows in {tableName} on {serverName}: {ex.Message}");
                return -1;
            }
        }
        
        public void CloseAllConnections()
        {
            lock (_connections)
            {
                foreach (var connection in _connections.Values)
                {
                    try
                    {
                        if (connection.State != ConnectionState.Closed)
                        {
                            connection.Close();
                            connection.Dispose();
                        }
                    }
                    catch { }
                }
                _connections.Clear();
            }
            
            LogMessage?.Invoke(this, "All connections closed.");
        }
        
        private string BuildConnectionString(string serverName, string username, string password, string database)
        {
            return $"Server={serverName};Database={database};User Id={username};Password={password};Connection Timeout={_connectionTimeout};";
        }
        
        public bool IsConnected(string serverName)
        {
            lock (_connections)
            {
                return _connections.ContainsKey(serverName) && 
                       _connections[serverName].State == ConnectionState.Open;
            }
        }
    }
}
