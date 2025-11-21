using System.Data;

namespace SqlServerManager.Models
{
    public class QueryResult
    {
        public string ServerName { get; set; } = string.Empty;
        public bool Success { get; set; }
        public DataTable? ResultData { get; set; }
        public string Message { get; set; } = string.Empty;
        public int RowsAffected { get; set; }
        public TimeSpan ExecutionTime { get; set; }
    }
}
