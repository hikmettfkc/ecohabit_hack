using SqlServerManager.Models;
using SqlServerManager.Services;
using System.Data;

namespace SqlServerManager.Forms
{
    public partial class TableComparisonForm : Form
    {
        private DatabaseService _databaseService;
        private List<ServerInfo> _servers;
        private string _username;
        private string _password;
        private string _database;
        private List<ComparisonResult> _comparisonResults = new List<ComparisonResult>();
        
        public TableComparisonForm(DatabaseService databaseService, List<ServerInfo> servers, 
            string username, string password, string database)
        {
            InitializeComponent();
            _databaseService = databaseService;
            _servers = servers;
            _username = username;
            _password = password;
            _database = string.IsNullOrEmpty(database) ? "master" : database;
        }
        
        private async void btnCompare_Click(object sender, EventArgs e)
        {
            var centerServer = txtCenterServer.Text.Trim();
            var tableName = txtTableName.Text.Trim();
            
            if (string.IsNullOrEmpty(centerServer))
            {
                MessageBox.Show("Please enter the center server name.", "Validation Error", 
                    MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }
            
            if (string.IsNullOrEmpty(tableName))
            {
                MessageBox.Show("Please enter the table name to compare.", "Validation Error", 
                    MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }
            
            var selectedServers = _servers.Where(s => s.IsSelected).ToList();
            if (selectedServers.Count == 0)
            {
                MessageBox.Show("Please select at least one server from the main form.", "Validation Error", 
                    MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }
            
            btnCompare.Enabled = false;
            lblStatus.Text = "Comparing table counts...";
            progressBar.Style = ProgressBarStyle.Marquee;
            
            try
            {
                // Get center count
                LogMessage($"Getting count from center server: {centerServer}");
                var centerCount = await _databaseService.ExecuteCountQueryAsync(
                    centerServer, tableName, _username, _password, _database);
                
                if (centerCount < 0)
                {
                    MessageBox.Show("Failed to get count from center server.", "Error", 
                        MessageBoxButtons.OK, MessageBoxIcon.Error);
                    return;
                }
                
                LogMessage($"Center server count: {centerCount}");
                
                // Get counts from all selected servers
                _comparisonResults.Clear();
                var tasks = selectedServers.Select(async server =>
                {
                    var serverCount = await _databaseService.ExecuteCountQueryAsync(
                        server.ServerName, tableName, _username, _password, _database);
                    
                    var result = new ComparisonResult
                    {
                        ServerName = server.ServerName,
                        TableName = tableName,
                        CenterCount = centerCount,
                        ServerCount = serverCount,
                        Difference = centerCount - serverCount,
                        NeedsUpdate = serverCount >= 0 && serverCount != centerCount,
                        Status = serverCount < 0 ? "Error" : 
                                (serverCount == centerCount ? "Match" : 
                                (serverCount < centerCount ? "Missing Rows" : "Extra Rows"))
                    };
                    
                    lock (_comparisonResults)
                    {
                        _comparisonResults.Add(result);
                    }
                    
                    LogMessage($"[{server.ServerName}] Count: {serverCount}, Difference: {result.Difference}, Status: {result.Status}");
                });
                
                await Task.WhenAll(tasks);
                
                // Display results
                DisplayComparisonResults();
                
                var mismatchCount = _comparisonResults.Count(r => r.NeedsUpdate);
                lblStatus.Text = $"Comparison complete. {mismatchCount} servers need updates.";
                
                if (mismatchCount > 0)
                {
                    btnGenerateUpdate.Enabled = true;
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Comparison error: {ex.Message}", "Error", 
                    MessageBoxButtons.OK, MessageBoxIcon.Error);
                lblStatus.Text = "Comparison failed.";
            }
            finally
            {
                btnCompare.Enabled = true;
                progressBar.Style = ProgressBarStyle.Blocks;
            }
        }
        
        private void DisplayComparisonResults()
        {
            var dataTable = new DataTable();
            dataTable.Columns.Add("Server Name", typeof(string));
            dataTable.Columns.Add("Table", typeof(string));
            dataTable.Columns.Add("Center Count", typeof(int));
            dataTable.Columns.Add("Server Count", typeof(int));
            dataTable.Columns.Add("Difference", typeof(int));
            dataTable.Columns.Add("Status", typeof(string));
            
            foreach (var result in _comparisonResults.OrderBy(r => r.Status).ThenBy(r => r.ServerName))
            {
                dataTable.Rows.Add(
                    result.ServerName,
                    result.TableName,
                    result.CenterCount,
                    result.ServerCount >= 0 ? result.ServerCount : (object)DBNull.Value,
                    result.ServerCount >= 0 ? result.Difference : (object)DBNull.Value,
                    result.Status
                );
            }
            
            dataGridViewComparison.DataSource = dataTable;
            
            // Color code the rows
            foreach (DataGridViewRow row in dataGridViewComparison.Rows)
            {
                var status = row.Cells["Status"].Value?.ToString();
                switch (status)
                {
                    case "Match":
                        row.DefaultCellStyle.BackColor = Color.LightGreen;
                        break;
                    case "Missing Rows":
                        row.DefaultCellStyle.BackColor = Color.LightCoral;
                        break;
                    case "Extra Rows":
                        row.DefaultCellStyle.BackColor = Color.LightYellow;
                        break;
                    case "Error":
                        row.DefaultCellStyle.BackColor = Color.LightGray;
                        break;
                }
            }
        }
        
        private void btnGenerateUpdate_Click(object sender, EventArgs e)
        {
            var serversNeedingUpdate = _comparisonResults.Where(r => r.NeedsUpdate).ToList();
            
            if (serversNeedingUpdate.Count == 0)
            {
                MessageBox.Show("No servers need updates.", "Information", 
                    MessageBoxButtons.OK, MessageBoxIcon.Information);
                return;
            }
            
            var updateScript = new System.Text.StringBuilder();
            updateScript.AppendLine("-- Update Script Generated: " + DateTime.Now);
            updateScript.AppendLine("-- Table: " + txtTableName.Text);
            updateScript.AppendLine("-- Center Server: " + txtCenterServer.Text);
            updateScript.AppendLine("-- Servers needing update: " + serversNeedingUpdate.Count);
            updateScript.AppendLine();
            
            foreach (var result in serversNeedingUpdate)
            {
                updateScript.AppendLine($"-- Server: {result.ServerName}");
                updateScript.AppendLine($"-- Current Count: {result.ServerCount}, Target Count: {result.CenterCount}");
                
                if (result.Difference > 0)
                {
                    // Missing rows - need to insert
                    updateScript.AppendLine($"-- Action: INSERT {result.Difference} rows");
                    updateScript.AppendLine($"-- You need to sync data from center server");
                    updateScript.AppendLine($"-- Example: INSERT INTO {result.TableName} SELECT * FROM [{txtCenterServer.Text}].[{_database}].dbo.{result.TableName} WHERE [key_column] NOT IN (SELECT [key_column] FROM {result.TableName})");
                }
                else
                {
                    // Extra rows - need to delete
                    updateScript.AppendLine($"-- Action: DELETE {Math.Abs(result.Difference)} extra rows");
                    updateScript.AppendLine($"-- Example: DELETE FROM {result.TableName} WHERE [key_column] NOT IN (SELECT [key_column] FROM [{txtCenterServer.Text}].[{_database}].dbo.{result.TableName})");
                }
                
                updateScript.AppendLine();
            }
            
            txtUpdateScript.Text = updateScript.ToString();
            
            LogMessage($"Update script generated for {serversNeedingUpdate.Count} servers.");
        }
        
        private void btnExportComparison_Click(object sender, EventArgs e)
        {
            if (_comparisonResults.Count == 0)
            {
                MessageBox.Show("No comparison results to export.", "Export Error", 
                    MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }
            
            using var saveFileDialog = new SaveFileDialog
            {
                Filter = "CSV Files (*.csv)|*.csv",
                Title = "Export Comparison Results",
                FileName = $"comparison_{txtTableName.Text}_{DateTime.Now:yyyyMMdd_HHmmss}.csv"
            };
            
            if (saveFileDialog.ShowDialog() == DialogResult.OK)
            {
                try
                {
                    var dataTable = (DataTable)dataGridViewComparison.DataSource;
                    var exportService = new ExportService();
                    exportService.ExportToCsv(dataTable, saveFileDialog.FileName);
                    
                    MessageBox.Show("Comparison results exported successfully.", "Export Complete", 
                        MessageBoxButtons.OK, MessageBoxIcon.Information);
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Export error: {ex.Message}", "Error", 
                        MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
        }
        
        private void btnCopyScript_Click(object sender, EventArgs e)
        {
            if (!string.IsNullOrEmpty(txtUpdateScript.Text))
            {
                Clipboard.SetText(txtUpdateScript.Text);
                MessageBox.Show("Update script copied to clipboard.", "Copy Complete", 
                    MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
        }
        
        private void LogMessage(string message)
        {
            var timestamp = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
            var logEntry = $"[{timestamp}] {message}";
            txtLog.AppendText(logEntry + Environment.NewLine);
        }
    }
}
