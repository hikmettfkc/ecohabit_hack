using System.Data;
using System.Text;

namespace SqlServerManager.Services
{
    public class ExportService
    {
        public void ExportToCsv(DataTable dataTable, string filePath, string serverName = "")
        {
            var csv = new StringBuilder();
            
            // Add header with server name if provided
            if (!string.IsNullOrEmpty(serverName))
            {
                csv.AppendLine($"# Server: {serverName}");
                csv.AppendLine($"# Export Date: {DateTime.Now}");
                csv.AppendLine();
            }
            
            // Add column headers
            var columnHeaders = dataTable.Columns.Cast<DataColumn>()
                .Select(column => EscapeCsvField(column.ColumnName));
            csv.AppendLine(string.Join(",", columnHeaders));
            
            // Add rows
            foreach (DataRow row in dataTable.Rows)
            {
                var fields = row.ItemArray.Select(field => 
                    EscapeCsvField(field?.ToString() ?? string.Empty));
                csv.AppendLine(string.Join(",", fields));
            }
            
            File.WriteAllText(filePath, csv.ToString(), Encoding.UTF8);
        }
        
        public void ExportMultipleResultsToCsv(List<(string ServerName, DataTable Data)> results, string filePath)
        {
            var csv = new StringBuilder();
            
            csv.AppendLine($"# Multi-Server Query Results");
            csv.AppendLine($"# Export Date: {DateTime.Now}");
            csv.AppendLine($"# Total Servers: {results.Count}");
            csv.AppendLine();
            
            foreach (var (serverName, dataTable) in results)
            {
                csv.AppendLine($"# Server: {serverName}");
                csv.AppendLine($"# Rows: {dataTable.Rows.Count}");
                
                if (dataTable.Rows.Count > 0)
                {
                    // Add column headers
                    var columnHeaders = dataTable.Columns.Cast<DataColumn>()
                        .Select(column => EscapeCsvField(column.ColumnName));
                    csv.AppendLine(string.Join(",", columnHeaders));
                    
                    // Add rows
                    foreach (DataRow row in dataTable.Rows)
                    {
                        var fields = row.ItemArray.Select(field => 
                            EscapeCsvField(field?.ToString() ?? string.Empty));
                        csv.AppendLine(string.Join(",", fields));
                    }
                }
                
                csv.AppendLine();
            }
            
            File.WriteAllText(filePath, csv.ToString(), Encoding.UTF8);
        }
        
        private string EscapeCsvField(string field)
        {
            if (field.Contains(",") || field.Contains("\"") || field.Contains("\n"))
            {
                return $"\"{field.Replace("\"", "\"\"")}\"";
            }
            return field;
        }
    }
}
