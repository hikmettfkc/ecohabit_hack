namespace SqlServerManager.Forms
{
    partial class ManageServersForm
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
            this.Text = "Manage Servers";
            this.Size = new System.Drawing.Size(500, 600);
            this.StartPosition = FormStartPosition.CenterParent;
            this.FormBorderStyle = FormBorderStyle.FixedDialog;
            this.MaximizeBox = false;
            this.MinimizeBox = false;
            
            var mainLayout = new TableLayoutPanel
            {
                Dock = DockStyle.Fill,
                RowCount = 4,
                ColumnCount = 1,
                Padding = new Padding(10)
            };
            
            // Add Server Panel
            var addPanel = new Panel { Dock = DockStyle.Fill, Height = 60 };
            var addLayout = new TableLayoutPanel
            {
                Dock = DockStyle.Fill,
                RowCount = 2,
                ColumnCount = 2
            };
            addLayout.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 100F));
            addLayout.ColumnStyles.Add(new ColumnStyle(SizeType.Absolute, 80F));
            
            txtServerName = new TextBox 
            { 
                Dock = DockStyle.Fill, 
                PlaceholderText = "Enter server name...",
                Font = new Font("Segoe UI", 10F)
            };
            
            btnAdd = new Button 
            { 
                Text = "Add", 
                Dock = DockStyle.Fill,
                BackColor = Color.FromArgb(76, 175, 80),
                ForeColor = Color.White,
                FlatStyle = FlatStyle.Flat,
                Font = new Font("Segoe UI", 10F, FontStyle.Bold)
            };
            btnAdd.FlatAppearance.BorderSize = 0;
            btnAdd.Click += btnAdd_Click;
            
            addLayout.Controls.Add(new Label { Text = "Server Name:", Dock = DockStyle.Fill, Font = new Font("Segoe UI", 9F) }, 0, 0);
            addLayout.Controls.Add(txtServerName, 0, 1);
            addLayout.Controls.Add(btnAdd, 1, 1);
            
            addPanel.Controls.Add(addLayout);
            
            // Server List
            var listPanel = new Panel { Dock = DockStyle.Fill };
            var grpServers = new GroupBox
            {
                Text = "Server List",
                Dock = DockStyle.Fill
            };
            
            listBoxServers = new ListBox
            {
                Dock = DockStyle.Fill,
                Font = new Font("Segoe UI", 10F)
            };
            
            grpServers.Controls.Add(listBoxServers);
            listPanel.Controls.Add(grpServers);
            
            // Buttons Panel
            var buttonPanel = new FlowLayoutPanel
            {
                Dock = DockStyle.Fill,
                FlowDirection = FlowDirection.LeftToRight,
                Height = 45,
                Padding = new Padding(5)
            };
            
            btnRemove = new Button 
            { 
                Text = "Remove Selected", 
                Width = 120, 
                Height = 35,
                BackColor = Color.FromArgb(244, 67, 54),
                ForeColor = Color.White,
                FlatStyle = FlatStyle.Flat,
                Font = new Font("Segoe UI", 9F)
            };
            btnRemove.FlatAppearance.BorderSize = 0;
            btnRemove.Click += btnRemove_Click;
            
            btnExport = new Button 
            { 
                Text = "Export List", 
                Width = 100, 
                Height = 35,
                BackColor = Color.FromArgb(255, 152, 0),
                ForeColor = Color.White,
                FlatStyle = FlatStyle.Flat,
                Font = new Font("Segoe UI", 9F)
            };
            btnExport.FlatAppearance.BorderSize = 0;
            btnExport.Click += btnExport_Click;
            
            buttonPanel.Controls.Add(btnRemove);
            buttonPanel.Controls.Add(btnExport);
            
            // Save/Cancel Panel
            var savePanel = new FlowLayoutPanel
            {
                Dock = DockStyle.Fill,
                FlowDirection = FlowDirection.RightToLeft,
                Height = 45,
                Padding = new Padding(5)
            };
            
            btnSave = new Button 
            { 
                Text = "Save && Close", 
                Width = 120, 
                Height = 35,
                BackColor = Color.FromArgb(0, 120, 212),
                ForeColor = Color.White,
                FlatStyle = FlatStyle.Flat,
                Font = new Font("Segoe UI", 10F, FontStyle.Bold)
            };
            btnSave.FlatAppearance.BorderSize = 0;
            btnSave.Click += btnSave_Click;
            
            btnCancel = new Button 
            { 
                Text = "Cancel", 
                Width = 100, 
                Height = 35,
                BackColor = Color.Gray,
                ForeColor = Color.White,
                FlatStyle = FlatStyle.Flat,
                Font = new Font("Segoe UI", 9F)
            };
            btnCancel.FlatAppearance.BorderSize = 0;
            btnCancel.Click += btnCancel_Click;
            
            savePanel.Controls.Add(btnSave);
            savePanel.Controls.Add(btnCancel);
            
            mainLayout.RowStyles.Add(new RowStyle(SizeType.Absolute, 60F));
            mainLayout.RowStyles.Add(new RowStyle(SizeType.Percent, 100F));
            mainLayout.RowStyles.Add(new RowStyle(SizeType.Absolute, 45F));
            mainLayout.RowStyles.Add(new RowStyle(SizeType.Absolute, 45F));
            
            mainLayout.Controls.Add(addPanel, 0, 0);
            mainLayout.Controls.Add(listPanel, 0, 1);
            mainLayout.Controls.Add(buttonPanel, 0, 2);
            mainLayout.Controls.Add(savePanel, 0, 3);
            
            this.Controls.Add(mainLayout);
        }

        private TextBox txtServerName;
        private Button btnAdd;
        private ListBox listBoxServers;
        private Button btnRemove;
        private Button btnExport;
        private Button btnSave;
        private Button btnCancel;
    }
}
