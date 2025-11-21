# SQL Server Manager - User Guide

## Quick Start Guide

### 1. First Launch
When you first launch SQL Server Manager, you'll see the main interface divided into two sections:

**Left Panel (Server Management)**
- Connection Settings
- Server Management Buttons
- Server List with Checkboxes
- Search and Selection Controls

**Right Panel (Query Execution)**
- SQL Query Input Area
- Query Results Grid
- Execution Log
- Status Bar

### 2. Setting Up Your Servers

#### Method 1: Import from Text File
1. Click the **"Import"** button (orange)
2. Select a text file with server names (one per line)
3. Servers are automatically added to the list

**Example text file format:**
```
SERVER001
SERVER002
SERVER003
STORE_DB_001
STORE_DB_002
```

#### Method 2: Manage Manually
1. Click the **"Manage"** button (green)
2. Type server name in the text box
3. Click **"Add"** button
4. Repeat for all servers
5. Click **"Save & Close"**

**Note:** Server list is automatically saved to:
`%APPDATA%\SqlServerManager\server_list.json`

### 3. Connecting to Servers

1. **Enter Credentials:**
   - Username: SQL Server username (same for all servers)
   - Password: SQL Server password
   - Database: Database name (default: "master")

2. **Select Servers:**
   - Check boxes next to servers you want to connect to
   - OR click **"Select All"** for all servers
   - Use search box to filter large lists

3. **Connect:**
   - Click the blue **"Connect"** button
   - Wait for connection status to update
   - Status shows next to each server name

**Connection Status:**
- "Connected" - Successfully connected
- "Failed: [reason]" - Connection failed

### 4. Executing Queries

#### Simple Query
1. Ensure servers are connected (green status)
2. Select servers you want to query (checkboxes)
3. Type SQL query in the query box:
   ```sql
   SELECT TOP 10 * FROM Users
   ```
4. Click **"Execute Query"** (blue button)
5. Results appear in the grid below
6. Each row includes the server name

#### Update Query
1. Write your UPDATE/INSERT/DELETE query:
   ```sql
   UPDATE Settings SET Value = 'NewValue' WHERE Key = 'Config'
   ```
2. Click **"Execute Query"**
3. Check log for rows affected on each server

### 5. Using Table Comparison (Key Feature)

This is the most important feature for maintaining data consistency across servers.

#### Step-by-Step:
1. **Connect to servers** from the main form first
2. **Select servers** you want to compare
3. Click **"Compare"** button (purple)
4. In the comparison window:
   - **Center Server**: Enter your master/reference server name
     - Example: `CENTRAL_DB_SERVER`
   - **Table Name**: Enter the table to compare
     - Example: `Products` or `dbo.Products`
5. Click **"Compare Tables"** (blue button)

#### Understanding Results:
The comparison grid shows:
- **Server Name**: Remote server being compared
- **Center Count**: Number of rows on center server
- **Server Count**: Number of rows on remote server
- **Difference**: How many rows differ
- **Status**: Color-coded status

**Color Codes:**
- 🟢 **Green (Match)**: Counts are identical ✓
- 🔴 **Red (Missing Rows)**: Remote server has fewer rows than center
- 🟡 **Yellow (Extra Rows)**: Remote server has more rows than center
- ⚫ **Gray (Error)**: Could not query this server

#### Generating Update Scripts:
1. After comparison, click **"Generate Update Script"**
2. Review the generated SQL guidance
3. Script shows what needs to be done for each mismatched server
4. Click **"Copy to Clipboard"** to copy script
5. Review and execute manually (script provides templates, not executable SQL)

**Important:** 
- Center server is READ-ONLY
- Updates are only generated for remote servers
- You must customize the generated scripts with your actual key columns

### 6. Export Features

#### Export Query Results:
1. Execute a query to get results
2. Click **"Export CSV"** (green button)
3. Choose location and filename
4. CSV file includes server names and all columns

#### Export Comparison Results:
1. Run a table comparison
2. Click **"Export Results"** in comparison window
3. Save CSV file with comparison data
4. Use for reporting or analysis

### 7. Advanced Features

#### Search Servers:
- Type in the search box above server list
- List filters in real-time
- Useful for finding specific servers in large lists

#### Detailed Logging:
- Check **"Detailed Logging"** checkbox
- All operations are logged to:
  `%APPDATA%\SqlServerManager\log.txt`
- Useful for troubleshooting and auditing

#### Bulk Selection:
- **Select All**: Checks all visible servers
- **Deselect All**: Unchecks all servers
- Combine with search for selective bulk operations

### 8. Best Practices

#### For 1000+ Servers:
1. **Use Search**: Filter servers before selecting
2. **Batch Operations**: Don't connect to all at once
   - Select by region/group
   - Process in batches of 100-200
3. **Connection Timeout**: Fast failure (5s) prevents long waits
4. **Monitor Logs**: Watch for failed connections

#### For Table Comparison:
1. **Start Small**: Test with a few servers first
2. **Off-Peak Hours**: Run large comparisons during low-traffic times
3. **Review Scripts**: Always review generated SQL before executing
4. **Backup First**: Take backups before running updates

#### For Query Execution:
1. **Test Queries**: Test on one server before running on all
2. **Use Transactions**: Wrap updates in transactions when possible
3. **Check Logs**: Review execution results in log panel
4. **Export Results**: Keep records of important queries

### 9. Troubleshooting

#### Connection Failures:
- **Check:** SQL Server running and accessible
- **Check:** Firewall allows SQL Server traffic
- **Check:** SQL authentication enabled
- **Check:** Credentials are correct
- **Try:** Connect to one server manually first

#### Slow Performance:
- **Reduce:** Number of simultaneous connections
- **Use:** Search to filter server list
- **Check:** Network connectivity
- **Consider:** Running in batches

#### Table Comparison Issues:
- **Verify:** Table exists on all servers
- **Check:** Table names are correct (case-sensitive)
- **Ensure:** User has SELECT permissions
- **Try:** Use fully qualified names: `[database].[schema].[table]`

### 10. Keyboard Shortcuts

- **Ctrl+A** in server list: Select All
- **Ctrl+F**: Focus search box (when implemented)
- **Ctrl+E**: Execute query (when focused on query box)

### 11. Tips & Tricks

1. **Save Time**: Create query templates in a text file
2. **Organize**: Use meaningful server names
3. **Document**: Add comments to saved queries
4. **Export Often**: Keep CSV exports for records
5. **Review Logs**: Check logs after bulk operations
6. **Test First**: Always test queries on a single server first

### 12. Common Workflows

#### Daily Query Routine:
```
1. Launch application
2. Connect to servers (saved credentials)
3. Run standard queries
4. Export results to CSV
5. Close application (auto-disconnect)
```

#### Monthly Sync Check:
```
1. Connect to all stores
2. Open Table Comparison
3. Compare critical tables one by one
4. Generate update scripts
5. Review and execute updates
6. Export comparison reports
```

#### Adding New Servers:
```
1. Prepare text file with server names
2. Click "Import"
3. Select file
4. Verify servers added
5. Connect and test
```

## Conclusion

SQL Server Manager is designed to make managing 1000+ SQL Server instances straightforward and efficient. The key is using the right tool for each task:

- **Regular Queries**: Use main query interface
- **Data Consistency**: Use table comparison
- **Bulk Management**: Use import/export and search
- **Auditing**: Use detailed logging and CSV exports

For additional help, see README.md in the SqlServerManager folder.
