namespace SqlServerManager;

partial class MainForm
{
    /// <summary>
    ///  Required designer variable.
    /// </summary>
    private System.ComponentModel.IContainer components = null;

    /// <summary>
    ///  Clean up any resources being used.
    /// </summary>
    /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
    protected override void Dispose(bool disposing)
    {
        if (disposing && (components != null))
        {
            components.Dispose();
        }
        base.Dispose(disposing);
    }

    #region Windows Form Designer generated code

    /// <summary>
    ///  Required method for Designer support - do not modify
    ///  the contents of this method with the code editor.
    /// </summary>
    private void InitializeComponent()
    {
        this.components = new System.ComponentModel.Container();
        this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
        this.ClientSize = new System.Drawing.Size(1400, 900);
        this.Text = "SQL Server Manager";
        this.StartPosition = FormStartPosition.CenterScreen;
        
        // Main container
        var mainContainer = new TableLayoutPanel
        {
            Dock = DockStyle.Fill,
            ColumnCount = 2,
            RowCount = 1,
            Padding = new Padding(10)
        };
        mainContainer.ColumnStyles.Add(new ColumnStyle(SizeType.Absolute, 350F));
        mainContainer.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 100F));
        
        // Left Panel - Server List
        var leftPanel = CreateLeftPanel();
        mainContainer.Controls.Add(leftPanel, 0, 0);
        
        // Right Panel - Query and Results
        var rightPanel = CreateRightPanel();
        mainContainer.Controls.Add(rightPanel, 1, 0);
        
        this.Controls.Add(mainContainer);
    }
    
    private Panel CreateLeftPanel()
    {
        var panel = new Panel { Dock = DockStyle.Fill };
        
        var layoutPanel = new TableLayoutPanel
        {
            Dock = DockStyle.Fill,
            RowCount = 7,
            ColumnCount = 1,
            Padding = new Padding(5)
        };
        
        // Connection Group
        var grpConnection = new GroupBox
        {
            Text = "Connection Settings",
            Dock = DockStyle.Fill,
            Padding = new Padding(10),
            Height = 180
        };
        
        var connectionLayout = new TableLayoutPanel
        {
            Dock = DockStyle.Fill,
            RowCount = 4,
            ColumnCount = 2,
            Padding = new Padding(5)
        };
        connectionLayout.ColumnStyles.Add(new ColumnStyle(SizeType.Absolute, 80F));
        connectionLayout.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 100F));
        
        txtUsername = new TextBox { Dock = DockStyle.Fill, Font = new Font("Segoe UI", 10F) };
        txtPassword = new TextBox { Dock = DockStyle.Fill, UseSystemPasswordChar = true, Font = new Font("Segoe UI", 10F) };
        txtDatabase = new TextBox { Dock = DockStyle.Fill, Text = "master", Font = new Font("Segoe UI", 10F) };
        btnConnect = new Button { Text = "Connect", Dock = DockStyle.Fill, Height = 35, BackColor = Color.FromArgb(0, 120, 212), ForeColor = Color.White, FlatStyle = FlatStyle.Flat, Font = new Font("Segoe UI", 10F, FontStyle.Bold) };
        btnConnect.FlatAppearance.BorderSize = 0;
        btnConnect.Click += btnConnect_Click;
        
        connectionLayout.Controls.Add(new Label { Text = "Username:", Dock = DockStyle.Fill, TextAlign = ContentAlignment.MiddleLeft, Font = new Font("Segoe UI", 9F) }, 0, 0);
        connectionLayout.Controls.Add(txtUsername, 1, 0);
        connectionLayout.Controls.Add(new Label { Text = "Password:", Dock = DockStyle.Fill, TextAlign = ContentAlignment.MiddleLeft, Font = new Font("Segoe UI", 9F) }, 0, 1);
        connectionLayout.Controls.Add(txtPassword, 1, 1);
        connectionLayout.Controls.Add(new Label { Text = "Database:", Dock = DockStyle.Fill, TextAlign = ContentAlignment.MiddleLeft, Font = new Font("Segoe UI", 9F) }, 0, 2);
        connectionLayout.Controls.Add(txtDatabase, 1, 2);
        connectionLayout.Controls.Add(btnConnect, 1, 3);
        
        grpConnection.Controls.Add(connectionLayout);
        
        // Server Management Buttons
        var serverButtonsPanel = new FlowLayoutPanel
        {
            Dock = DockStyle.Fill,
            Height = 40,
            FlowDirection = FlowDirection.LeftToRight,
            WrapContents = false
        };
        
        btnManageServers = new Button { Text = "Manage", Width = 80, Height = 30, BackColor = Color.FromArgb(76, 175, 80), ForeColor = Color.White, FlatStyle = FlatStyle.Flat, Font = new Font("Segoe UI", 9F) };
        btnManageServers.FlatAppearance.BorderSize = 0;
        btnManageServers.Click += btnManageServers_Click;
        
        btnImportServers = new Button { Text = "Import", Width = 80, Height = 30, BackColor = Color.FromArgb(255, 152, 0), ForeColor = Color.White, FlatStyle = FlatStyle.Flat, Font = new Font("Segoe UI", 9F) };
        btnImportServers.FlatAppearance.BorderSize = 0;
        btnImportServers.Click += btnImportServers_Click;
        
        btnTableComparison = new Button { Text = "Compare", Width = 80, Height = 30, BackColor = Color.FromArgb(156, 39, 176), ForeColor = Color.White, FlatStyle = FlatStyle.Flat, Font = new Font("Segoe UI", 9F) };
        btnTableComparison.FlatAppearance.BorderSize = 0;
        btnTableComparison.Click += btnTableComparison_Click;
        
        serverButtonsPanel.Controls.Add(btnManageServers);
        serverButtonsPanel.Controls.Add(btnImportServers);
        serverButtonsPanel.Controls.Add(btnTableComparison);
        
        // Search
        var searchPanel = new Panel { Dock = DockStyle.Fill, Height = 35 };
        txtSearchServers = new TextBox { Dock = DockStyle.Fill, PlaceholderText = "Search servers...", Font = new Font("Segoe UI", 10F) };
        txtSearchServers.TextChanged += txtSearchServers_TextChanged;
        searchPanel.Controls.Add(txtSearchServers);
        
        // Server List
        var grpServers = new GroupBox
        {
            Text = "Servers",
            Dock = DockStyle.Fill
        };
        
        checkedListBoxServers = new CheckedListBox
        {
            Dock = DockStyle.Fill,
            CheckOnClick = true,
            Font = new Font("Segoe UI", 9F)
        };
        
        grpServers.Controls.Add(checkedListBoxServers);
        
        // Select Buttons
        var selectButtonsPanel = new FlowLayoutPanel
        {
            Dock = DockStyle.Fill,
            Height = 35,
            FlowDirection = FlowDirection.LeftToRight
        };
        
        btnSelectAll = new Button { Text = "Select All", Width = 100, Height = 30, Font = new Font("Segoe UI", 9F) };
        btnSelectAll.Click += btnSelectAll_Click;
        btnDeselectAll = new Button { Text = "Deselect All", Width = 100, Height = 30, Font = new Font("Segoe UI", 9F) };
        btnDeselectAll.Click += btnDeselectAll_Click;
        
        selectButtonsPanel.Controls.Add(btnSelectAll);
        selectButtonsPanel.Controls.Add(btnDeselectAll);
        
        layoutPanel.RowStyles.Add(new RowStyle(SizeType.Absolute, 180F));
        layoutPanel.RowStyles.Add(new RowStyle(SizeType.Absolute, 40F));
        layoutPanel.RowStyles.Add(new RowStyle(SizeType.Absolute, 35F));
        layoutPanel.RowStyles.Add(new RowStyle(SizeType.Percent, 100F));
        layoutPanel.RowStyles.Add(new RowStyle(SizeType.Absolute, 35F));
        
        layoutPanel.Controls.Add(grpConnection, 0, 0);
        layoutPanel.Controls.Add(serverButtonsPanel, 0, 1);
        layoutPanel.Controls.Add(searchPanel, 0, 2);
        layoutPanel.Controls.Add(grpServers, 0, 3);
        layoutPanel.Controls.Add(selectButtonsPanel, 0, 4);
        
        panel.Controls.Add(layoutPanel);
        return panel;
    }
    
    private Panel CreateRightPanel()
    {
        var panel = new Panel { Dock = DockStyle.Fill };
        
        var layoutPanel = new TableLayoutPanel
        {
            Dock = DockStyle.Fill,
            RowCount = 4,
            ColumnCount = 1,
            Padding = new Padding(5)
        };
        
        // Query Group
        var grpQuery = new GroupBox
        {
            Text = "SQL Query",
            Dock = DockStyle.Fill,
            Height = 150
        };
        
        var queryLayout = new TableLayoutPanel
        {
            Dock = DockStyle.Fill,
            RowCount = 2,
            ColumnCount = 1
        };
        queryLayout.RowStyles.Add(new RowStyle(SizeType.Percent, 100F));
        queryLayout.RowStyles.Add(new RowStyle(SizeType.Absolute, 40F));
        
        txtQuery = new TextBox
        {
            Dock = DockStyle.Fill,
            Multiline = true,
            ScrollBars = ScrollBars.Both,
            Font = new Font("Consolas", 10F)
        };
        
        var queryButtonPanel = new FlowLayoutPanel
        {
            Dock = DockStyle.Fill,
            FlowDirection = FlowDirection.LeftToRight,
            Height = 40
        };
        
        btnExecuteQuery = new Button { Text = "Execute Query", Width = 120, Height = 35, BackColor = Color.FromArgb(0, 120, 212), ForeColor = Color.White, FlatStyle = FlatStyle.Flat, Font = new Font("Segoe UI", 10F, FontStyle.Bold) };
        btnExecuteQuery.FlatAppearance.BorderSize = 0;
        btnExecuteQuery.Click += btnExecuteQuery_Click;
        
        btnExportResults = new Button { Text = "Export CSV", Width = 100, Height = 35, BackColor = Color.FromArgb(76, 175, 80), ForeColor = Color.White, FlatStyle = FlatStyle.Flat, Font = new Font("Segoe UI", 9F) };
        btnExportResults.FlatAppearance.BorderSize = 0;
        btnExportResults.Click += btnExportResults_Click;
        
        chkDetailedLogging = new CheckBox { Text = "Detailed Logging", AutoSize = true, Margin = new Padding(10, 8, 0, 0), Font = new Font("Segoe UI", 9F) };
        chkDetailedLogging.CheckedChanged += chkDetailedLogging_CheckedChanged;
        
        queryButtonPanel.Controls.Add(btnExecuteQuery);
        queryButtonPanel.Controls.Add(btnExportResults);
        queryButtonPanel.Controls.Add(chkDetailedLogging);
        
        queryLayout.Controls.Add(txtQuery, 0, 0);
        queryLayout.Controls.Add(queryButtonPanel, 0, 1);
        
        grpQuery.Controls.Add(queryLayout);
        
        // Results Group
        var grpResults = new GroupBox
        {
            Text = "Query Results",
            Dock = DockStyle.Fill
        };
        
        dataGridViewResults = new DataGridView
        {
            Dock = DockStyle.Fill,
            ReadOnly = true,
            AllowUserToAddRows = false,
            AllowUserToDeleteRows = false,
            AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.AllCells,
            Font = new Font("Segoe UI", 9F)
        };
        
        grpResults.Controls.Add(dataGridViewResults);
        
        // Log Group
        var grpLog = new GroupBox
        {
            Text = "Log",
            Dock = DockStyle.Fill,
            Height = 150
        };
        
        txtLog = new TextBox
        {
            Dock = DockStyle.Fill,
            Multiline = true,
            ScrollBars = ScrollBars.Both,
            ReadOnly = true,
            BackColor = Color.Black,
            ForeColor = Color.LightGreen,
            Font = new Font("Consolas", 9F)
        };
        
        grpLog.Controls.Add(txtLog);
        
        // Status Bar
        var statusPanel = new Panel
        {
            Dock = DockStyle.Fill,
            Height = 30,
            BorderStyle = BorderStyle.FixedSingle
        };
        
        lblStatus = new Label
        {
            Text = "Ready",
            Dock = DockStyle.Fill,
            TextAlign = ContentAlignment.MiddleLeft,
            Padding = new Padding(5, 0, 0, 0),
            Font = new Font("Segoe UI", 9F)
        };
        
        progressBar = new ProgressBar
        {
            Dock = DockStyle.Right,
            Width = 200,
            Height = 20,
            Margin = new Padding(0, 5, 5, 5)
        };
        
        statusPanel.Controls.Add(lblStatus);
        statusPanel.Controls.Add(progressBar);
        
        layoutPanel.RowStyles.Add(new RowStyle(SizeType.Absolute, 150F));
        layoutPanel.RowStyles.Add(new RowStyle(SizeType.Percent, 60F));
        layoutPanel.RowStyles.Add(new RowStyle(SizeType.Percent, 40F));
        layoutPanel.RowStyles.Add(new RowStyle(SizeType.Absolute, 30F));
        
        layoutPanel.Controls.Add(grpQuery, 0, 0);
        layoutPanel.Controls.Add(grpResults, 0, 1);
        layoutPanel.Controls.Add(grpLog, 0, 2);
        layoutPanel.Controls.Add(statusPanel, 0, 3);
        
        panel.Controls.Add(layoutPanel);
        return panel;
    }

    #endregion
    
    private TextBox txtUsername;
    private TextBox txtPassword;
    private TextBox txtDatabase;
    private Button btnConnect;
    private Button btnManageServers;
    private Button btnImportServers;
    private Button btnTableComparison;
    private TextBox txtSearchServers;
    private CheckedListBox checkedListBoxServers;
    private Button btnSelectAll;
    private Button btnDeselectAll;
    private TextBox txtQuery;
    private Button btnExecuteQuery;
    private Button btnExportResults;
    private CheckBox chkDetailedLogging;
    private DataGridView dataGridViewResults;
    private TextBox txtLog;
    private Label lblStatus;
    private ProgressBar progressBar;
}
