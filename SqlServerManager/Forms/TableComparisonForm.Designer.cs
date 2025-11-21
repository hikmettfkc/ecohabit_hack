namespace SqlServerManager.Forms
{
    partial class TableComparisonForm
    {
        private System.ComponentModel.IContainer components = null;

        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        private void InitializeComponent()
        {
            this.Text = "Table Comparison - Center vs Remote Servers";
            this.Size = new System.Drawing.Size(1200, 800);
            this.StartPosition = FormStartPosition.CenterParent;
            this.BackColor = Color.FromArgb(240, 240, 245);
            
            var mainLayout = new TableLayoutPanel
            {
                Dock = DockStyle.Fill,
                RowCount = 4,
                ColumnCount = 1,
                Padding = new Padding(10)
            };
            
            // Input Panel
            var inputPanel = new Panel { Dock = DockStyle.Fill, Height = 120 };
            var inputLayout = new TableLayoutPanel
            {
                Dock = DockStyle.Fill,
                RowCount = 3,
                ColumnCount = 3,
                Padding = new Padding(5)
            };
            inputLayout.ColumnStyles.Add(new ColumnStyle(SizeType.Absolute, 120F));
            inputLayout.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 100F));
            inputLayout.ColumnStyles.Add(new ColumnStyle(SizeType.Absolute, 150F));
            
            txtCenterServer = new TextBox 
            { 
                Dock = DockStyle.Fill,
                Font = new Font("Segoe UI", 10F),
                PlaceholderText = "e.g., CENTRAL_SERVER"
            };
            
            txtTableName = new TextBox 
            { 
                Dock = DockStyle.Fill,
                Font = new Font("Segoe UI", 10F),
                PlaceholderText = "e.g., Products"
            };
            
            btnCompare = new Button 
            { 
                Text = "Compare Tables", 
                Dock = DockStyle.Fill,
                BackColor = Color.FromArgb(0, 120, 212),
                ForeColor = Color.White,
                FlatStyle = FlatStyle.Flat,
                Font = new Font("Segoe UI", 10F, FontStyle.Bold)
            };
            btnCompare.FlatAppearance.BorderSize = 0;
            btnCompare.Click += btnCompare_Click;
            
            var infoLabel = new Label
            {
                Text = "Note: Center server is READ-ONLY. Updates will only be generated for remote servers.",
                Dock = DockStyle.Fill,
                ForeColor = Color.FromArgb(255, 87, 34),
                Font = new Font("Segoe UI", 9F, FontStyle.Italic),
                TextAlign = ContentAlignment.MiddleLeft
            };
            
            inputLayout.Controls.Add(new Label { Text = "Center Server:", Dock = DockStyle.Fill, TextAlign = ContentAlignment.MiddleLeft, Font = new Font("Segoe UI", 9F) }, 0, 0);
            inputLayout.Controls.Add(txtCenterServer, 1, 0);
            inputLayout.Controls.Add(btnCompare, 2, 0);
            
            inputLayout.Controls.Add(new Label { Text = "Table Name:", Dock = DockStyle.Fill, TextAlign = ContentAlignment.MiddleLeft, Font = new Font("Segoe UI", 9F) }, 0, 1);
            inputLayout.Controls.Add(txtTableName, 1, 1);
            
            inputLayout.SetColumnSpan(infoLabel, 3);
            inputLayout.Controls.Add(infoLabel, 0, 2);
            
            inputPanel.Controls.Add(inputLayout);
            
            // Comparison Results Panel
            var resultsPanel = new Panel { Dock = DockStyle.Fill };
            var grpResults = new GroupBox
            {
                Text = "Comparison Results",
                Dock = DockStyle.Fill,
                Font = new Font("Segoe UI", 10F, FontStyle.Bold)
            };
            
            var resultsLayout = new TableLayoutPanel
            {
                Dock = DockStyle.Fill,
                RowCount = 2,
                ColumnCount = 1,
                Padding = new Padding(5)
            };
            resultsLayout.RowStyles.Add(new RowStyle(SizeType.Percent, 100F));
            resultsLayout.RowStyles.Add(new RowStyle(SizeType.Absolute, 40F));
            
            dataGridViewComparison = new DataGridView
            {
                Dock = DockStyle.Fill,
                ReadOnly = true,
                AllowUserToAddRows = false,
                AllowUserToDeleteRows = false,
                AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill,
                Font = new Font("Segoe UI", 9F),
                SelectionMode = DataGridViewSelectionMode.FullRowSelect
            };
            
            var buttonPanel = new FlowLayoutPanel
            {
                Dock = DockStyle.Fill,
                FlowDirection = FlowDirection.LeftToRight,
                Height = 40
            };
            
            btnGenerateUpdate = new Button 
            { 
                Text = "Generate Update Script", 
                Width = 180, 
                Height = 35,
                BackColor = Color.FromArgb(76, 175, 80),
                ForeColor = Color.White,
                FlatStyle = FlatStyle.Flat,
                Font = new Font("Segoe UI", 9F, FontStyle.Bold),
                Enabled = false
            };
            btnGenerateUpdate.FlatAppearance.BorderSize = 0;
            btnGenerateUpdate.Click += btnGenerateUpdate_Click;
            
            btnExportComparison = new Button 
            { 
                Text = "Export Results", 
                Width = 120, 
                Height = 35,
                BackColor = Color.FromArgb(255, 152, 0),
                ForeColor = Color.White,
                FlatStyle = FlatStyle.Flat,
                Font = new Font("Segoe UI", 9F)
            };
            btnExportComparison.FlatAppearance.BorderSize = 0;
            btnExportComparison.Click += btnExportComparison_Click;
            
            buttonPanel.Controls.Add(btnGenerateUpdate);
            buttonPanel.Controls.Add(btnExportComparison);
            
            resultsLayout.Controls.Add(dataGridViewComparison, 0, 0);
            resultsLayout.Controls.Add(buttonPanel, 0, 1);
            
            grpResults.Controls.Add(resultsLayout);
            resultsPanel.Controls.Add(grpResults);
            
            // Update Script Panel
            var scriptPanel = new Panel { Dock = DockStyle.Fill, Height = 200 };
            var grpScript = new GroupBox
            {
                Text = "Generated Update Script",
                Dock = DockStyle.Fill,
                Font = new Font("Segoe UI", 10F, FontStyle.Bold)
            };
            
            var scriptLayout = new TableLayoutPanel
            {
                Dock = DockStyle.Fill,
                RowCount = 2,
                ColumnCount = 1,
                Padding = new Padding(5)
            };
            scriptLayout.RowStyles.Add(new RowStyle(SizeType.Percent, 100F));
            scriptLayout.RowStyles.Add(new RowStyle(SizeType.Absolute, 35F));
            
            txtUpdateScript = new TextBox
            {
                Dock = DockStyle.Fill,
                Multiline = true,
                ScrollBars = ScrollBars.Both,
                ReadOnly = true,
                Font = new Font("Consolas", 9F),
                BackColor = Color.White
            };
            
            btnCopyScript = new Button 
            { 
                Text = "Copy to Clipboard", 
                Dock = DockStyle.Left,
                Width = 150,
                Height = 30,
                BackColor = Color.FromArgb(103, 58, 183),
                ForeColor = Color.White,
                FlatStyle = FlatStyle.Flat,
                Font = new Font("Segoe UI", 9F)
            };
            btnCopyScript.FlatAppearance.BorderSize = 0;
            btnCopyScript.Click += btnCopyScript_Click;
            
            scriptLayout.Controls.Add(txtUpdateScript, 0, 0);
            scriptLayout.Controls.Add(btnCopyScript, 0, 1);
            
            grpScript.Controls.Add(scriptLayout);
            scriptPanel.Controls.Add(grpScript);
            
            // Log Panel
            var logPanel = new Panel { Dock = DockStyle.Fill, Height = 100 };
            var grpLog = new GroupBox
            {
                Text = "Log",
                Dock = DockStyle.Fill,
                Font = new Font("Segoe UI", 9F, FontStyle.Bold)
            };
            
            txtLog = new TextBox
            {
                Dock = DockStyle.Fill,
                Multiline = true,
                ScrollBars = ScrollBars.Both,
                ReadOnly = true,
                BackColor = Color.Black,
                ForeColor = Color.LightGreen,
                Font = new Font("Consolas", 8F)
            };
            
            grpLog.Controls.Add(txtLog);
            logPanel.Controls.Add(grpLog);
            
            // Status Bar
            var statusPanel = new Panel
            {
                Dock = DockStyle.Fill,
                Height = 30,
                BorderStyle = BorderStyle.FixedSingle
            };
            
            lblStatus = new Label
            {
                Text = "Ready to compare tables",
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
            
            mainLayout.RowStyles.Add(new RowStyle(SizeType.Absolute, 120F));
            mainLayout.RowStyles.Add(new RowStyle(SizeType.Percent, 50F));
            mainLayout.RowStyles.Add(new RowStyle(SizeType.Percent, 30F));
            mainLayout.RowStyles.Add(new RowStyle(SizeType.Percent, 20F));
            
            mainLayout.Controls.Add(inputPanel, 0, 0);
            mainLayout.Controls.Add(resultsPanel, 0, 1);
            mainLayout.Controls.Add(scriptPanel, 0, 2);
            mainLayout.Controls.Add(logPanel, 0, 3);
            
            this.Controls.Add(mainLayout);
            this.Controls.Add(statusPanel);
            statusPanel.BringToFront();
        }

        private TextBox txtCenterServer;
        private TextBox txtTableName;
        private Button btnCompare;
        private DataGridView dataGridViewComparison;
        private Button btnGenerateUpdate;
        private Button btnExportComparison;
        private TextBox txtUpdateScript;
        private Button btnCopyScript;
        private TextBox txtLog;
        private Label lblStatus;
        private ProgressBar progressBar;
    }
}
