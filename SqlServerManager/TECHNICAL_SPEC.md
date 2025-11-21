# SQL Server Manager - Technical Specification

## System Architecture

### Overview
SQL Server Manager is a desktop application built using .NET 8.0 Windows Forms framework. It uses a layered architecture pattern separating concerns into Models, Services, and Forms (UI).

### Architecture Diagram
```
┌─────────────────────────────────────────────────┐
│              Presentation Layer                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │
│  │ MainForm │  │ Manage   │  │   Table      │  │
│  │          │  │ Servers  │  │ Comparison   │  │
│  └──────────┘  └──────────┘  └──────────────┘  │
└─────────────────────────────────────────────────┘
                       │
┌─────────────────────────────────────────────────┐
│              Service Layer                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │
│  │ Database │  │ Server   │  │   Export     │  │
│  │ Service  │  │ List     │  │   Service    │  │
│  │          │  │ Service  │  │              │  │
│  └──────────┘  └──────────┘  └──────────────┘  │
└─────────────────────────────────────────────────┘
                       │
┌─────────────────────────────────────────────────┐
│              Data Layer                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │
│  │ Server   │  │ Query    │  │ Comparison   │  │
│  │ Info     │  │ Result   │  │ Result       │  │
│  └──────────┘  └──────────┘  └──────────────┘  │
└─────────────────────────────────────────────────┘
                       │
┌─────────────────────────────────────────────────┐
│            External Systems                      │
│  ┌──────────────────────────────────────────┐  │
│  │     SQL Server Instances (1000+)         │  │
│  │     File System (AppData)                │  │
│  └──────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

## Component Details

### 1. Models (Data Objects)

#### ServerInfo
```csharp
public class ServerInfo
{
    public string ServerName { get; set; }
    public bool IsSelected { get; set; }
    public string ConnectionStatus { get; set; }
    public DateTime? LastConnectionAttempt { get; set; }
}
```
**Purpose:** Represents a SQL Server instance with its connection state.

#### QueryResult
```csharp
public class QueryResult
{
    public string ServerName { get; set; }
    public bool Success { get; set; }
    public DataTable? ResultData { get; set; }
    public string Message { get; set; }
    public int RowsAffected { get; set; }
    public TimeSpan ExecutionTime { get; set; }
}
```
**Purpose:** Encapsulates query execution results from a single server.

#### ComparisonResult
```csharp
public class ComparisonResult
{
    public string ServerName { get; set; }
    public string TableName { get; set; }
    public int CenterCount { get; set; }
    public int ServerCount { get; set; }
    public int Difference { get; set; }
    public string Status { get; set; }
    public bool NeedsUpdate { get; set; }
}
```
**Purpose:** Stores table row count comparison between center and remote servers.

### 2. Services (Business Logic)

#### DatabaseService
**Responsibilities:**
- Manage SQL Server connections
- Execute queries across multiple servers
- Handle connection pooling and timeouts
- Provide count queries for table comparison

**Key Methods:**
- `ConnectToServersAsync()`: Parallel connection to multiple servers
- `ExecuteQueryAsync()`: Parallel query execution
- `ExecuteCountQueryAsync()`: Get row count from specific table
- `CloseAllConnections()`: Cleanup all open connections

**Performance Considerations:**
- Uses async/await for non-blocking operations
- Implements parallel Task execution for multi-server operations
- Configurable connection timeout (default: 5 seconds)
- Thread-safe connection dictionary with locks

#### ServerListService
**Responsibilities:**
- Persist server list to disk
- Import/export server lists
- Manage server list file location

**Key Methods:**
- `LoadServerList()`: Load from JSON file in AppData
- `SaveServerList()`: Save to JSON file
- `ImportFromTextFile()`: Import from plain text
- `ExportToTextFile()`: Export to plain text

**Storage:**
- Location: `%APPDATA%\SqlServerManager\server_list.json`
- Format: JSON serialization
- Auto-creates directory if not exists

#### ExportService
**Responsibilities:**
- Export data to CSV format
- Handle CSV field escaping
- Support multi-server result exports

**Key Methods:**
- `ExportToCsv()`: Single DataTable to CSV
- `ExportMultipleResultsToCsv()`: Multiple results to single CSV
- `EscapeCsvField()`: Proper CSV formatting

### 3. Forms (User Interface)

#### MainForm
**Components:**
- CheckedListBox: Server selection
- TextBoxes: Credentials, query input, logging
- DataGridView: Query results display
- Buttons: Connect, Execute, Export, Manage, etc.
- ProgressBar: Operation progress indicator

**Event Handlers:**
- `btnConnect_Click`: Initiate connections
- `btnExecuteQuery_Click`: Execute SQL query
- `btnImportServers_Click`: Import server list
- `btnExportResults_Click`: Export to CSV
- `btnTableComparison_Click`: Open comparison form

**Lifecycle:**
- `InitializeComponent()`: UI initialization
- `LoadServerList()`: Load saved servers on startup
- `OnFormClosing()`: Cleanup connections and save state

#### ManageServersForm
**Components:**
- TextBox: Server name input
- ListBox: Server list display
- Buttons: Add, Remove, Export, Save, Cancel

**Features:**
- Add/remove servers individually
- Export server list to text file
- Save changes to persistent storage
- Cancel without saving

#### TableComparisonForm
**Components:**
- TextBoxes: Center server, table name, update script, log
- DataGridView: Comparison results with color coding
- Buttons: Compare, Generate Update, Export, Copy Script
- ProgressBar: Comparison progress

**Features:**
- Parallel row count queries
- Color-coded result display
- Automatic update script generation
- Clipboard integration
- Result export to CSV

## Data Flow

### Query Execution Flow
```
1. User enters query in MainForm
2. User selects servers and clicks Execute
3. MainForm calls DatabaseService.ExecuteQueryAsync()
4. DatabaseService executes query on each server in parallel
5. Results collected in List<QueryResult>
6. MainForm displays combined results in DataGridView
7. Log updates shown in real-time via events
```

### Table Comparison Flow
```
1. User opens TableComparisonForm from MainForm
2. User enters center server and table name
3. User clicks Compare
4. Service gets count from center server
5. Service gets counts from all selected servers in parallel
6. Results aggregated into List<ComparisonResult>
7. Form displays color-coded results
8. User can generate update scripts based on differences
```

### Server List Management Flow
```
1. User clicks Import or Manage
2. ServerListService loads/imports server names
3. Server list updated in memory
4. User confirms changes
5. ServerListService saves to JSON file
6. MainForm refreshes display
```

## Performance Characteristics

### Connection Phase
- **Parallel Connections:** All servers connect simultaneously
- **Timeout:** 5 seconds per connection attempt
- **Failure Handling:** Failed connections don't block others
- **Estimated Time for 1000 servers:** 5-10 seconds (assuming most succeed)

### Query Execution
- **Parallel Execution:** All queries run simultaneously
- **Query Timeout:** 30 seconds per query
- **Result Aggregation:** Combines results from all servers
- **Estimated Time:** Depends on query complexity, typically 5-60 seconds

### Table Comparison
- **Step 1:** Get center count (1 query, ~1 second)
- **Step 2:** Get remote counts in parallel (simultaneous, ~5 seconds for 1000 servers)
- **Total Time:** ~6-10 seconds for full comparison

## Security Considerations

### Credentials
- **Storage:** NOT stored (entered each session)
- **Transmission:** Direct to SQL Server (no intermediary)
- **Scope:** Same credentials used for all servers

### SQL Injection
- **Protection:** Uses parameterized commands where possible
- **Note:** User-entered queries are executed as-is (trusted environment)
- **Recommendation:** Application intended for admin use only

### File System
- **Server List:** Stored in user's AppData (user-specific)
- **Logs:** Stored in user's AppData (when detailed logging enabled)
- **Permissions:** Uses standard user file permissions

## Configuration

### Default Settings
```csharp
// Connection
ConnectionTimeout = 5 seconds
QueryTimeout = 30 seconds
DefaultDatabase = "master"

// Storage
ServerListPath = "%APPDATA%/SqlServerManager/server_list.json"
LogFilePath = "%APPDATA%/SqlServerManager/log.txt"

// UI
MaximizedOnStart = true
DefaultFormSize = 1400x900
```

### Customization Points
Users can modify:
- Connection timeout (change in DatabaseService)
- Query timeout (change in DatabaseService)
- Default database
- UI colors and sizes (in Designer files)

## Error Handling

### Connection Errors
- Logged to UI log panel
- Server status updated to show error
- Other connections continue
- User notified of total failures

### Query Errors
- Each server's error logged separately
- Failed queries don't affect other servers
- Error message included in QueryResult
- User can see which servers failed

### File System Errors
- Import/Export failures show MessageBox
- Fallback to empty list if load fails
- Directory auto-created if missing

## Threading Model

### UI Thread
- All UI updates on main thread
- Uses `Invoke()` for cross-thread updates
- Event handlers run on UI thread

### Background Tasks
- Connections: Parallel async Tasks
- Queries: Parallel async Tasks
- File I/O: Synchronous (fast enough)

### Synchronization
- Lock on connection dictionary
- Lock on result collections during parallel updates
- No deadlock risk (simple lock hierarchy)

## Future Enhancement Opportunities

### Performance
- Connection pooling across sessions
- Cached server information
- Incremental result loading
- Background connection health checks

### Features
- Windows Authentication support
- Query templates/history
- Scheduled operations
- Advanced table comparison (data-level, not just count)
- Batch update execution
- Server grouping/tagging
- Excel export
- Email notifications

### Architecture
- Separate business logic into class library
- Add unit tests
- Implement dependency injection
- Add logging framework (e.g., Serilog)
- Configuration file support

## Dependencies

### NuGet Packages
- `System.Data.SqlClient` (v4.8.6): SQL Server connectivity

### Framework
- `.NET 8.0`
- `Windows Forms`
- `System.Text.Json`: JSON serialization

### Platform Requirements
- Windows OS
- .NET 8.0 Runtime or later
- Network access to SQL Servers

## Build and Deployment

### Build
```bash
dotnet build --configuration Release
```

### Output
```
bin/Release/net8.0-windows/
├── SqlServerManager.exe
├── SqlServerManager.dll
├── System.Data.SqlClient.dll
└── [other dependencies]
```

### Deployment
- Copy entire output folder
- No installation required
- Runs from any location
- Creates AppData folder on first run

### System Requirements
- OS: Windows 10/11 or Windows Server 2016+
- RAM: 512MB minimum, 1GB recommended
- Disk: 100MB for application, varies for logs
- Network: Access to SQL Server instances

## Monitoring and Logging

### Application Logs
- Location: UI log panel (always)
- Detailed log file: Optional, in AppData
- Format: Timestamped text entries
- Content: Connections, queries, errors

### Performance Metrics
Logged for each operation:
- Execution time
- Success/failure count
- Rows affected/returned
- Connection status

## Conclusion

SQL Server Manager is designed as a practical tool for managing large SQL Server deployments. The architecture prioritizes:

1. **Simplicity:** Easy to understand and modify
2. **Performance:** Parallel operations for speed
3. **Reliability:** Robust error handling
4. **Usability:** Clean UI with clear feedback
5. **Maintainability:** Layered architecture with clear separation

The codebase is structured to allow easy enhancements while maintaining the core functionality that makes it valuable for managing 1000+ database instances.
