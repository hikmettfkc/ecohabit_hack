# EcoHabit Hack

This repository contains multiple projects:

## 1. EcoHabit Web Application (React/TypeScript)
A web-based eco-habit tracking application built with React and TypeScript.

**Tech Stack:**
- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router

**Getting Started:**
```bash
npm install
npm run dev
```

## 2. SQL Server Manager (C# Windows Forms)
A comprehensive desktop application for managing SQL Server databases across 1000+ devices from a centralized location.

**Location:** `/SqlServerManager`

**Key Features:**
- Multi-server connection management
- Simultaneous query execution across servers
- Table comparison between center and remote servers
- Automated update script generation
- CSV export functionality
- Modern Windows Forms UI

**Tech Stack:**
- .NET 8.0
- Windows Forms
- System.Data.SqlClient

**Getting Started:**
```bash
cd SqlServerManager
dotnet build
dotnet run
```

For detailed information about SQL Server Manager, see [SqlServerManager/README.md](SqlServerManager/README.md).

## Project Structure
```
ecohabit_hack/
├── src/                    # React web app source
├── SqlServerManager/       # C# Windows Forms application
├── dist/                   # Web app build output
├── package.json           # Web app dependencies
└── README.md              # This file
```

## License
MIT
