namespace SqlServerManager.Models
{
    public class ComparisonResult
    {
        public string ServerName { get; set; } = string.Empty;
        public string TableName { get; set; } = string.Empty;
        public int CenterCount { get; set; }
        public int ServerCount { get; set; }
        public int Difference { get; set; }
        public string Status { get; set; } = string.Empty;
        public bool NeedsUpdate { get; set; }
    }
}
