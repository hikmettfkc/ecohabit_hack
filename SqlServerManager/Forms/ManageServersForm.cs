using SqlServerManager.Models;
using SqlServerManager.Services;

namespace SqlServerManager.Forms
{
    public partial class ManageServersForm : Form
    {
        private ServerListService _serverListService;
        private List<ServerInfo> _servers;
        
        public List<ServerInfo> UpdatedServers => _servers;
        
        public ManageServersForm(List<ServerInfo> servers, ServerListService serverListService)
        {
            InitializeComponent();
            _serverListService = serverListService;
            _servers = new List<ServerInfo>(servers.Select(s => new ServerInfo 
            { 
                ServerName = s.ServerName, 
                IsSelected = s.IsSelected,
                ConnectionStatus = s.ConnectionStatus,
                LastConnectionAttempt = s.LastConnectionAttempt
            }));
            
            RefreshServerList();
        }
        
        private void RefreshServerList()
        {
            listBoxServers.Items.Clear();
            foreach (var server in _servers)
            {
                listBoxServers.Items.Add(server.ServerName);
            }
        }
        
        private void btnAdd_Click(object sender, EventArgs e)
        {
            var serverName = txtServerName.Text.Trim();
            
            if (string.IsNullOrEmpty(serverName))
            {
                MessageBox.Show("Please enter a server name.", "Validation Error", 
                    MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }
            
            if (_servers.Any(s => s.ServerName.Equals(serverName, StringComparison.OrdinalIgnoreCase)))
            {
                MessageBox.Show("Server already exists in the list.", "Duplicate Server", 
                    MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }
            
            _servers.Add(new ServerInfo(serverName));
            RefreshServerList();
            txtServerName.Clear();
        }
        
        private void btnRemove_Click(object sender, EventArgs e)
        {
            if (listBoxServers.SelectedIndex >= 0)
            {
                var result = MessageBox.Show("Are you sure you want to remove this server?", 
                    "Confirm Removal", MessageBoxButtons.YesNo, MessageBoxIcon.Question);
                
                if (result == DialogResult.Yes)
                {
                    _servers.RemoveAt(listBoxServers.SelectedIndex);
                    RefreshServerList();
                }
            }
            else
            {
                MessageBox.Show("Please select a server to remove.", "Selection Required", 
                    MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
        }
        
        private void btnSave_Click(object sender, EventArgs e)
        {
            try
            {
                _serverListService.SaveServerList(_servers);
                MessageBox.Show("Server list saved successfully.", "Save Complete", 
                    MessageBoxButtons.OK, MessageBoxIcon.Information);
                this.DialogResult = DialogResult.OK;
                this.Close();
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error saving server list: {ex.Message}", "Save Error", 
                    MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
        
        private void btnCancel_Click(object sender, EventArgs e)
        {
            this.DialogResult = DialogResult.Cancel;
            this.Close();
        }
        
        private void btnExport_Click(object sender, EventArgs e)
        {
            using var saveFileDialog = new SaveFileDialog
            {
                Filter = "Text Files (*.txt)|*.txt",
                Title = "Export Server List",
                FileName = $"servers_{DateTime.Now:yyyyMMdd}.txt"
            };
            
            if (saveFileDialog.ShowDialog() == DialogResult.OK)
            {
                try
                {
                    _serverListService.ExportToTextFile(_servers, saveFileDialog.FileName);
                    MessageBox.Show("Server list exported successfully.", "Export Complete", 
                        MessageBoxButtons.OK, MessageBoxIcon.Information);
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Export error: {ex.Message}", "Error", 
                        MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
        }
    }
}
