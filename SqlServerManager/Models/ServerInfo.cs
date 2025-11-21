namespace SqlServerManager.Models
{
    public class ServerInfo
    {
        public string ServerName { get; set; } = string.Empty;
        public bool IsSelected { get; set; }
        public string ConnectionStatus { get; set; } = "Not Connected";
        public DateTime? LastConnectionAttempt { get; set; }
        
        public ServerInfo() { }
        
        public ServerInfo(string serverName)
        {
            ServerName = serverName;
        }
    }
}
