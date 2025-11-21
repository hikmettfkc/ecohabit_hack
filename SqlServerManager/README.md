# SQL Server Manager - Multi-Server Query Tool

A comprehensive C# Windows Forms application designed to manage and query SQL Server databases across 1000+ devices from a centralized location.

## Features

### 1. **Server Management**
- **Embedded Server List**: Server list is stored internally in the application's AppData folder (no manual text file editing needed)
- **Import/Export**: Import server lists from text files or export current list
- **Search**: Quick search functionality to find servers in large lists
- **Bulk Selection**: Select all or deselect all servers with one click

### 2. **Connection Management**
- Connect to multiple SQL servers simultaneously with same credentials
- Configurable connection timeout (default 5 seconds)
- Quick timeout for failed connections to avoid delays
- Automatic connection cleanup on application close
- Real-time connection status display

### 3. **Query Execution**
- Execute SQL queries across selected servers
- View combined results in DataGridView with server name column
- Real-time logging of query execution
- Support for both SELECT and UPDATE/INSERT/DELETE queries
- Parallel query execution for better performance

### 4. **Logging System**
- Real-time log display in application
- Optional detailed logging to file
- Timestamp on all log entries
- Color-coded console-style log viewer

### 5. **Export Capabilities**
- Export query results to CSV format
- Include server names and timestamps in exports
- Support for multi-server result exports

### 6. **Table Comparison (Most Important Feature)**
- Compare table row counts between center server and remote servers
- **Center server is READ-ONLY** - no updates will be performed on it
- Visual color-coded comparison results:
  - **Green**: Matching counts
  - **Red**: Missing rows (remote server has fewer rows)
  - **Yellow**: Extra rows (remote server has more rows)
  - **Gray**: Connection/query errors
- Automatic update script generation
- Identifies which servers need updates
- Export comparison results to CSV

### 7. **Modern UI Design**
- Clean, modern interface with color-coded buttons
- Responsive layout that adapts to window size
- Progress indicators for long-running operations
- Organized panels for different functionalities
- Professional color scheme

## Installation

### Requirements
- Windows OS
- .NET 8.0 Runtime or later
- Visual Studio 2022 (for development)
- SQL Server access credentials

### Building from Source
1. Open `SqlServerManager.sln` in Visual Studio 2022
2. Restore NuGet packages (should happen automatically)
3. Build the solution (Ctrl + Shift + B)
4. Run the application (F5)

### Deployment
1. Build the project in Release mode
2. Navigate to `bin/Release/net8.0-windows/`
3. Copy the entire folder to target machine
4. Run `SqlServerManager.exe`

## Usage

### Initial Setup

1. **Add Servers**:
   - Click "Manage" button to open Server Management dialog
   - Add servers one by one, or
   - Click "Import" to load from a text file (one server per line)
   - Server list is automatically saved in AppData

2. **Connect to Servers**:
   - Enter SQL Server username and password
   - Optionally specify database (default is "master")
   - Select servers from the list (use checkboxes)
   - Click "Connect" button
   - Connection status will be displayed next to each server

### Executing Queries

1. Select connected servers from the list
2. Enter SQL query in the query text box
3. Click "Execute Query"
4. Results will be displayed in the DataGridView
5. Logs will show execution status for each server

### Table Comparison

1. Connect to servers first from main form
2. Select the servers you want to compare
3. Click "Compare" button to open Table Comparison form
4. Enter the **center server name** (the master/reference server)
5. Enter the **table name** to compare
6. Click "Compare Tables"
7. View color-coded comparison results
8. Click "Generate Update Script" to create SQL commands
9. Review generated script (it will guide you on what needs to be synced)
10. Copy script to clipboard or manually execute on servers

**Important**: The center server is treated as read-only. The comparison will only generate update scripts for remote servers to match the center server's data.

### Export Results

- Click "Export CSV" button after executing a query
- Choose location and filename
- Results are saved with server names and timestamps

## Architecture

### Project Structure
```
SqlServerManager/
├── Models/
│   ├── ServerInfo.cs          - Server information model
│   ├── QueryResult.cs         - Query execution results
│   └── ComparisonResult.cs    - Table comparison results
├── Services/
│   ├── DatabaseService.cs     - SQL Server connection and query execution
│   ├── ServerListService.cs   - Server list management (save/load/import/export)
│   └── ExportService.cs       - CSV export functionality
├── Forms/
│   ├── MainForm.cs            - Main application form
│   ├── ManageServersForm.cs   - Server management dialog
│   └── TableComparisonForm.cs - Table comparison dialog
├── Program.cs                 - Application entry point
└── SqlServerManager.csproj    - Project file
```

### Key Technologies
- **Framework**: .NET 8.0 Windows Forms
- **Database**: Microsoft.Data.SqlClient v5.2.2 for SQL Server connectivity
- **Data Storage**: JSON for server list persistence
- **UI**: Native Windows Forms controls with modern styling

## Configuration

### Server List Location
Server list is stored at:
```
%APPDATA%/SqlServerManager/server_list.json
```

### Detailed Log Location
When detailed logging is enabled, logs are saved at:
```
%APPDATA%/SqlServerManager/log.txt
```

### Connection Settings
- Default connection timeout: 5 seconds
- Default database: "master"
- Query timeout: 30 seconds

## Troubleshooting

### Connection Issues
- Verify SQL Server is accessible from your machine
- Check firewall settings
- Ensure SQL Server authentication is enabled
- Verify username and password

### Performance
- For 1000+ servers, connection phase may take several minutes
- Use search functionality to filter server list
- Select only necessary servers for queries
- Failed connections timeout quickly (5 seconds) to avoid delays

### Table Comparison
- Ensure table exists on all servers being compared
- Use fully qualified table names if needed: `[schema].[tablename]`
- Center server must be accessible with provided credentials
- Generated update scripts are templates - review before executing

## Future Enhancements

Possible improvements for future versions:
- Support for Windows Authentication
- Scheduled query execution
- Query templates/history
- Advanced table comparison (not just counts but actual data)
- Batch update execution
- Server grouping/tagging
- Multi-threaded connection pooling
- Export to Excel format
- Email notifications for comparison results

## License

This project is part of the ecohabit_hack repository.

## Support

For issues or questions, please refer to the repository issue tracker.

---

**Note**: This application was designed for environments where you have 1000+ SQL Server installations with identical database schemas and credentials. It excels at bulk operations and cross-server comparisons while maintaining a clean separation between read-only center data and updateable remote servers.
