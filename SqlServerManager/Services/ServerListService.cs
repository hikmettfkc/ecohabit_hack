using System.Text.Json;
using SqlServerManager.Models;

namespace SqlServerManager.Services
{
    public class ServerListService
    {
        private const string ServerListFileName = "server_list.json";
        private string _appDataPath;
        
        public ServerListService()
        {
            _appDataPath = Path.Combine(
                Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData),
                "SqlServerManager"
            );
            
            if (!Directory.Exists(_appDataPath))
            {
                Directory.CreateDirectory(_appDataPath);
            }
        }
        
        public List<ServerInfo> LoadServerList()
        {
            var filePath = Path.Combine(_appDataPath, ServerListFileName);
            
            if (!File.Exists(filePath))
            {
                // Create default empty list
                return new List<ServerInfo>();
            }
            
            try
            {
                var json = File.ReadAllText(filePath);
                var servers = JsonSerializer.Deserialize<List<ServerInfo>>(json);
                return servers ?? new List<ServerInfo>();
            }
            catch
            {
                return new List<ServerInfo>();
            }
        }
        
        public void SaveServerList(List<ServerInfo> servers)
        {
            var filePath = Path.Combine(_appDataPath, ServerListFileName);
            var json = JsonSerializer.Serialize(servers, new JsonSerializerOptions 
            { 
                WriteIndented = true 
            });
            File.WriteAllText(filePath, json);
        }
        
        public List<ServerInfo> ImportFromTextFile(string filePath)
        {
            var servers = new List<ServerInfo>();
            
            if (!File.Exists(filePath))
            {
                throw new FileNotFoundException("Server list file not found", filePath);
            }
            
            var lines = File.ReadAllLines(filePath);
            foreach (var line in lines)
            {
                var trimmedLine = line.Trim();
                if (!string.IsNullOrWhiteSpace(trimmedLine) && !trimmedLine.StartsWith("#"))
                {
                    servers.Add(new ServerInfo(trimmedLine));
                }
            }
            
            return servers;
        }
        
        public void ExportToTextFile(List<ServerInfo> servers, string filePath)
        {
            var lines = servers.Select(s => s.ServerName).ToArray();
            File.WriteAllLines(filePath, lines);
        }
        
        public string GetServerListPath()
        {
            return Path.Combine(_appDataPath, ServerListFileName);
        }
    }
}
