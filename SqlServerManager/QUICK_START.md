# SQL Server Manager - Quick Start

## 5-Minute Setup Guide

### Step 1: Build the Application (1 minute)
```bash
cd SqlServerManager
dotnet build --configuration Release
```

### Step 2: Run the Application (1 minute)
```bash
cd bin/Release/net8.0-windows
./SqlServerManager.exe
```
Or simply run from Visual Studio 2022 (F5).

### Step 3: Add Your Servers (2 minutes)

**Option A: Import from Text File**
1. Create a text file with your server names (one per line):
   ```
   SERVER001
   SERVER002
   SERVER003
   ```
2. Click the orange **"Import"** button
3. Select your text file
4. Done! All servers added automatically

**Option B: Add Manually**
1. Click the green **"Manage"** button
2. Type server name and click **"Add"**
3. Repeat for each server
4. Click **"Save & Close"**

### Step 4: Connect and Query (1 minute)
1. Enter your SQL Server username and password
2. Check the boxes next to servers you want to query
3. Click the blue **"Connect"** button
4. Type your SQL query (e.g., `SELECT TOP 10 * FROM Users`)
5. Click **"Execute Query"**
6. Results appear instantly with server names!

## Common Tasks

### Run a Query on All Servers
```sql
SELECT @@SERVERNAME as ServerName, COUNT(*) as UserCount FROM Users
```
1. Click "Select All"
2. Enter query
3. Click "Execute Query"
4. Export to CSV if needed

### Compare Tables Across Servers
1. Connect to servers first
2. Click purple **"Compare"** button
3. Enter:
   - Center Server: `CENTRAL_DB`
   - Table Name: `Products`
4. Click **"Compare Tables"**
5. See color-coded results
6. Click **"Generate Update Script"** for mismatches

### Export Results
- After any query, click green **"Export CSV"** button
- Choose location and save
- Open in Excel or any spreadsheet tool

## Tips for 1000+ Servers

1. **Use Search**: Filter servers before selecting
   - Type in search box to find specific servers
   - Great for finding stores by region/number

2. **Work in Batches**: Don't connect to all 1000 at once
   - Select 100-200 at a time
   - Prevents overwhelming the network

3. **Save Templates**: Keep common queries in a text file
   - Copy/paste when needed
   - Faster than typing each time

4. **Check Logs**: Monitor the log panel
   - See which servers succeeded/failed
   - Troubleshoot connection issues

5. **Export Often**: Keep CSV records
   - Document your work
   - Compare results over time

## Troubleshooting

### Can't Connect to Servers?
- ✅ Check: SQL Server is running
- ✅ Check: Firewall allows connections
- ✅ Check: SQL Authentication is enabled
- ✅ Check: Username/password are correct

### Queries Taking Too Long?
- ✅ Reduce number of selected servers
- ✅ Simplify your query
- ✅ Check network connectivity

### Table Comparison Not Working?
- ✅ Verify table exists on all servers
- ✅ Use correct table name (case-sensitive)
- ✅ Ensure permissions to read table

## Need More Help?

- **Full Manual**: See `USER_GUIDE.md` for detailed instructions
- **Technical Details**: See `TECHNICAL_SPEC.md` for architecture
- **Overview**: See `README.md` for feature list

## Example Workflow: Daily Health Check

```
Morning Routine (5 minutes):
1. Launch application
2. Import server list (if first time)
3. Enter credentials and connect to all stores
4. Run health check query:
   SELECT 
       DB_NAME() as Database,
       COUNT(*) as TransactionCount,
       MAX(TransactionDate) as LastTransaction
   FROM Transactions 
   WHERE TransactionDate >= DATEADD(day, -1, GETDATE())
5. Export results to CSV
6. Review for anomalies
7. Close application (auto-disconnects)
```

## Example Workflow: Monthly Data Sync

```
End of Month (15 minutes):
1. Launch and connect to all servers
2. Open Table Comparison (purple button)
3. Compare critical tables one by one:
   - Products
   - Customers  
   - Prices
   - Settings
4. Generate update scripts for mismatches
5. Review scripts carefully
6. Execute updates on affected servers
7. Re-run comparison to verify
8. Export final comparison report
```

## Security Notes

- ✅ Credentials are NOT stored (enter each session)
- ✅ SQL injection protection is built-in
- ✅ All queries are logged for auditing
- ✅ Modern, secure Microsoft.Data.SqlClient library
- ✅ Application runs with your Windows permissions

## Performance Expectations

| Servers | Connect Time | Query Time | Comparison Time |
|---------|--------------|------------|-----------------|
| 10      | ~1 second    | ~2 seconds | ~2 seconds      |
| 100     | ~5 seconds   | ~10 seconds| ~10 seconds     |
| 1000    | ~10 seconds  | ~30 seconds| ~15 seconds     |

*Times vary based on network speed and server load*

## You're Ready to Go! 🚀

The application is designed to be intuitive. Start with a few servers, get comfortable with the interface, then scale up to your full deployment.

**Remember**: 
- Test queries on one server first
- Use search to filter large server lists
- Export results for your records
- Review generated scripts before executing

Happy querying! 🎉
