# GR-Form Application

## Overview

This is a full-stack **Next.js 15** application with a **MySQL** database, designed for managing Goods Receipt (GR) forms and inspection reports. It allows multiple users to create, submit, and review inspection data dynamically.

## Features

- **Next.js 15 Full-Stack App**: API routes for backend logic.
- **MySQL Database**: Stores GR form details and inspection reports.
- **Dynamic Routing**: Redirects users based on report IDs.
- **State Persistence**: Uses `localStorage` to maintain form states.
- **Tailwind CSS**: For modern and responsive UI design.

## Project Structure

```
├── .next/                   # Next.js build output
├── app/
│   ├── api/                 # API routes
│   │   ├── getItems/        # Fetch items from database
│   │   ├── saveDynamic/     # Save dynamic data
│   │   └── saveForm/        # Save form data
│   ├── GR-Form/             # GR form main page
│   ├── inspection/          # Dynamic inspection pages
│   │   └── [reportId]/      # Dynamic report routing
│   ├── globals.css          # Global styles
│   ├── layout.jsx           # Main layout component
│   └── page.jsx             # Home page
├── components/
│   ├── component/           # Custom form components
│   │   ├── Accessories.jsx  # Accessories input table
│   │   ├── ItemTable.jsx    # Item details table
│   │   └── Remarks.jsx      # Remarks input
│   └── ui/
│       └── button.jsx       # Custom button component
├── lib/
│   └── utils.js             # Utility functions
├── server/
│   ├── config.js            # Server configuration
│   ├── db/
│   │   └── dbConnection.js  # Database connection setup
│   └── models/
│       └── inspectionReportModel.js  # Database model
├── public/                  # Static assets
├── styles/                  # Additional styles
├── .gitignore               # Git ignore file
├── .vscode/                 # VS Code settings
│   └── extensions.json
├── jsconfig.json            # JS config for Next.js
├── next.config.mjs          # Next.js configuration
├── package.json             # Project dependencies
├── postcss.config.mjs       # PostCSS config for Tailwind
├── README.md                # Project documentation
├── tailwind.config.mjs      # Tailwind CSS configuration
└── LICENSE                  # License file
```

## Installation

### Prerequisites

- Node.js (Latest LTS version)
- MySQL Database
- Git

### Setup

1. **Clone the repository**
   ```sh
   git clone https://github.com/your-username/gr-latest.git
   cd gr-latest
   ```
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Configure environment variables**
   - Create a `.env.local` file in the root directory.
   - Add database credentials:
     ```sh
     Database username and password
     ```
4. **Set up the database**
   ```sh
   In Command Prompt
   ```
5. **Run the development server**
   ```sh
   npm run dev
   ```
   Visit `http://localhost:3000` in your browser.

## Usage

- Navigate to `http://localhost:3000/GR-Form` to create a new GR form.
- Fill in the required fields and submit.
- Click **Next** to proceed to inspection.
- Data is dynamically saved and retrieved based on the **report ID**.

## Deployment

1. Build the project:
   ```sh
   npm run build
   ```
2. Start the production server:
   ```sh
   npm start
   ```

## Contributing

1. Fork the repository.
2. Create a new branch (`git checko``ut -b feature-name`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a Pull Request.

## Future Updates

- Implement authentication & role-based access.
- Add export functionality for reports.
- Improve error handling & validation.

---

Feel free to contribute or suggest improvements! 🚀

