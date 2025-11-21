using SqlServerManager.Models;
using SqlServerManager.Services;
using SqlServerManager.Forms;
using System.Data;

namespace SqlServerManager;

public partial class MainForm : Form
{
    private DatabaseService _databaseService;
    private ServerListService _serverListService;
    private ExportService _exportService;
    private List<ServerInfo> _servers;
    private bool _detailedLogging = false;
    
    public MainForm()
    {
        InitializeComponent();
        _databaseService = new DatabaseService();
        _serverListService = new ServerListService();
        _exportService = new ExportService();
        _servers = new List<ServerInfo>();
        
        _databaseService.LogMessage += OnLogMessage;
        
        LoadServerList();
        InitializeUI();
    }
    
    private void InitializeUI()
    {
        this.Text = "SQL Server Manager - Multi-Server Query Tool";
        this.WindowState = FormWindowState.Maximized;
        
        // Set modern colors
        this.BackColor = Color.FromArgb(240, 240, 245);
        
        RefreshServerCheckBoxList();
    }
    
    private void LoadServerList()
    {
        _servers = _serverListService.LoadServerList();
        if (_servers.Count == 0)
        {
            // Add sample server for demonstration
            _servers.Add(new ServerInfo("localhost"));
        }
    }
    
    private void RefreshServerCheckBoxList()
    {
        checkedListBoxServers.Items.Clear();
        foreach (var server in _servers)
        {
            var index = checkedListBoxServers.Items.Add(
                $"{server.ServerName} - {server.ConnectionStatus}");
            checkedListBoxServers.SetItemChecked(index, server.IsSelected);
        }
    }
    
    private async void btnConnect_Click(object sender, EventArgs e)
    {
        var username = txtUsername.Text.Trim();
        var password = txtPassword.Text;
        var database = txtDatabase.Text.Trim();
        
        if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
        {
            MessageBox.Show("Please enter username and password.", "Validation Error", 
                MessageBoxButtons.OK, MessageBoxIcon.Warning);
            return;
        }
        
        if (string.IsNullOrEmpty(database))
        {
            database = "master";
        }
        
        // Update selected servers
        UpdateServerSelection();
        
        btnConnect.Enabled = false;
        lblStatus.Text = "Connecting to servers...";
        progressBar.Style = ProgressBarStyle.Marquee;
        
        try
        {
            var results = await _databaseService.ConnectToServersAsync(_servers, username, password, database);
            
            RefreshServerCheckBoxList();
            
            var successCount = results.Values.Count(v => v);
            lblStatus.Text = $"Connected to {successCount} out of {results.Count} servers.";
            
            if (successCount == 0)
            {
                MessageBox.Show("Failed to connect to any server.", "Connection Error", 
                    MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
        catch (Exception ex)
        {
            MessageBox.Show($"Connection error: {ex.Message}", "Error", 
                MessageBoxButtons.OK, MessageBoxIcon.Error);
            lblStatus.Text = "Connection failed.";
        }
        finally
        {
            btnConnect.Enabled = true;
            progressBar.Style = ProgressBarStyle.Blocks;
        }
    }
    
    private async void btnExecuteQuery_Click(object sender, EventArgs e)
    {
        var query = txtQuery.Text.Trim();
        
        if (string.IsNullOrEmpty(query))
        {
            MessageBox.Show("Please enter a SQL query.", "Validation Error", 
                MessageBoxButtons.OK, MessageBoxIcon.Warning);
            return;
        }
        
        UpdateServerSelection();
        
        var selectedServers = _servers.Where(s => s.IsSelected).ToList();
        if (selectedServers.Count == 0)
        {
            MessageBox.Show("Please select at least one server.", "Validation Error", 
                MessageBoxButtons.OK, MessageBoxIcon.Warning);
            return;
        }
        
        btnExecuteQuery.Enabled = false;
        lblStatus.Text = "Executing query...";
        progressBar.Style = ProgressBarStyle.Marquee;
        dataGridViewResults.DataSource = null;
        
        try
        {
            var results = await _databaseService.ExecuteQueryAsync(query, selectedServers);
            
            DisplayResults(results);
            
            var successCount = results.Count(r => r.Success);
            lblStatus.Text = $"Query executed on {successCount} out of {results.Count} servers.";
        }
        catch (Exception ex)
        {
            MessageBox.Show($"Query execution error: {ex.Message}", "Error", 
                MessageBoxButtons.OK, MessageBoxIcon.Error);
            lblStatus.Text = "Query execution failed.";
        }
        finally
        {
            btnExecuteQuery.Enabled = true;
            progressBar.Style = ProgressBarStyle.Blocks;
        }
    }
    
    private void DisplayResults(List<QueryResult> results)
    {
        // Combine all results into one DataTable with ServerName column
        var combinedTable = new DataTable();
        combinedTable.Columns.Add("ServerName", typeof(string));
        
        bool headersAdded = false;
        
        foreach (var result in results.Where(r => r.Success && r.ResultData != null))
        {
            if (!headersAdded && result.ResultData != null)
            {
                foreach (DataColumn column in result.ResultData.Columns)
                {
                    if (!combinedTable.Columns.Contains(column.ColumnName))
                    {
                        combinedTable.Columns.Add(column.ColumnName, column.DataType);
                    }
                }
                headersAdded = true;
            }
            
            if (result.ResultData != null)
            {
                foreach (DataRow row in result.ResultData.Rows)
                {
                    var newRow = combinedTable.NewRow();
                    newRow["ServerName"] = result.ServerName;
                    
                    foreach (DataColumn column in result.ResultData.Columns)
                    {
                        if (combinedTable.Columns.Contains(column.ColumnName))
                        {
                            newRow[column.ColumnName] = row[column];
                        }
                    }
                    
                    combinedTable.Rows.Add(newRow);
                }
            }
        }
        
        dataGridViewResults.DataSource = combinedTable;
        
        // Auto-resize columns
        foreach (DataGridViewColumn column in dataGridViewResults.Columns)
        {
            column.AutoSizeMode = DataGridViewAutoSizeColumnMode.AllCells;
        }
    }
    
    private void UpdateServerSelection()
    {
        for (int i = 0; i < checkedListBoxServers.Items.Count && i < _servers.Count; i++)
        {
            _servers[i].IsSelected = checkedListBoxServers.GetItemChecked(i);
        }
    }
    
    private void OnLogMessage(object? sender, string message)
    {
        if (InvokeRequired)
        {
            Invoke(new Action(() => OnLogMessage(sender, message)));
            return;
        }
        
        var timestamp = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
        var logEntry = $"[{timestamp}] {message}";
        
        txtLog.AppendText(logEntry + Environment.NewLine);
        
        if (_detailedLogging)
        {
            // Save to file
            var logPath = Path.Combine(
                Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData),
                "SqlServerManager", "log.txt");
            File.AppendAllText(logPath, logEntry + Environment.NewLine);
        }
    }
    
    private void btnImportServers_Click(object sender, EventArgs e)
    {
        using var openFileDialog = new OpenFileDialog
        {
            Filter = "Text Files (*.txt)|*.txt|All Files (*.*)|*.*",
            Title = "Import Server List"
        };
        
        if (openFileDialog.ShowDialog() == DialogResult.OK)
        {
            try
            {
                var importedServers = _serverListService.ImportFromTextFile(openFileDialog.FileName);
                
                // Merge with existing servers (avoid duplicates)
                foreach (var server in importedServers)
                {
                    if (!_servers.Any(s => s.ServerName.Equals(server.ServerName, StringComparison.OrdinalIgnoreCase)))
                    {
                        _servers.Add(server);
                    }
                }
                
                _serverListService.SaveServerList(_servers);
                RefreshServerCheckBoxList();
                
                MessageBox.Show($"Imported {importedServers.Count} servers.", "Import Complete", 
                    MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Import error: {ex.Message}", "Error", 
                    MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
    }
    
    private void btnExportResults_Click(object sender, EventArgs e)
    {
        if (dataGridViewResults.DataSource == null)
        {
            MessageBox.Show("No results to export.", "Export Error", 
                MessageBoxButtons.OK, MessageBoxIcon.Warning);
            return;
        }
        
        using var saveFileDialog = new SaveFileDialog
        {
            Filter = "CSV Files (*.csv)|*.csv",
            Title = "Export Results",
            FileName = $"query_results_{DateTime.Now:yyyyMMdd_HHmmss}.csv"
        };
        
        if (saveFileDialog.ShowDialog() == DialogResult.OK)
        {
            try
            {
                var dataTable = (DataTable)dataGridViewResults.DataSource;
                _exportService.ExportToCsv(dataTable, saveFileDialog.FileName);
                
                MessageBox.Show("Results exported successfully.", "Export Complete", 
                    MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Export error: {ex.Message}", "Error", 
                    MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
    }
    
    private void chkDetailedLogging_CheckedChanged(object sender, EventArgs e)
    {
        _detailedLogging = chkDetailedLogging.Checked;
        OnLogMessage(this, _detailedLogging ? "Detailed logging enabled" : "Detailed logging disabled");
    }
    
    private void txtSearchServers_TextChanged(object sender, EventArgs e)
    {
        var searchText = txtSearchServers.Text.ToLower();
        
        checkedListBoxServers.Items.Clear();
        
        var filteredServers = string.IsNullOrWhiteSpace(searchText) 
            ? _servers 
            : _servers.Where(s => s.ServerName.ToLower().Contains(searchText)).ToList();
        
        foreach (var server in filteredServers)
        {
            var index = checkedListBoxServers.Items.Add(
                $"{server.ServerName} - {server.ConnectionStatus}");
            checkedListBoxServers.SetItemChecked(index, server.IsSelected);
        }
    }
    
    private void btnManageServers_Click(object sender, EventArgs e)
    {
        using var manageForm = new ManageServersForm(_servers, _serverListService);
        if (manageForm.ShowDialog() == DialogResult.OK)
        {
            _servers = manageForm.UpdatedServers;
            RefreshServerCheckBoxList();
        }
    }
    
    private void btnTableComparison_Click(object sender, EventArgs e)
    {
        var username = txtUsername.Text.Trim();
        var password = txtPassword.Text;
        var database = txtDatabase.Text.Trim();
        
        if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
        {
            MessageBox.Show("Please enter username and password first.", "Validation Error", 
                MessageBoxButtons.OK, MessageBoxIcon.Warning);
            return;
        }
        
        UpdateServerSelection();
        
        using var comparisonForm = new TableComparisonForm(_databaseService, _servers, username, password, database);
        comparisonForm.ShowDialog();
    }
    
    private void btnSelectAll_Click(object sender, EventArgs e)
    {
        for (int i = 0; i < checkedListBoxServers.Items.Count; i++)
        {
            checkedListBoxServers.SetItemChecked(i, true);
        }
        UpdateServerSelection();
    }
    
    private void btnDeselectAll_Click(object sender, EventArgs e)
    {
        for (int i = 0; i < checkedListBoxServers.Items.Count; i++)
        {
            checkedListBoxServers.SetItemChecked(i, false);
        }
        UpdateServerSelection();
    }
    
    protected override void OnFormClosing(FormClosingEventArgs e)
    {
        base.OnFormClosing(e);
        
        // Clean up connections
        _databaseService.CloseAllConnections();
        
        // Save server list
        _serverListService.SaveServerList(_servers);
    }
}
