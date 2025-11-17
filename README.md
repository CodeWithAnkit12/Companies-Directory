Companies Directory – Frontlines Media

A modern, responsive Companies Directory built with React + TypeScript + Vite + Material UI.
Users can search, filter, and sort companies, and log in using Google Authentication (Firebase).

Live demo:
👉 https://frontlinesmedia1.netlify.app/

🚀 Features

🔍 Search companies by name

🎯 Filter by location & industry

⇅ Sort by name or number of employees

👤 Google login via Firebase

📱 Fully responsive Material UI design

⚡ Powered by Vite for ultra-fast development

☁️ Automatically deployed to Netlify

🏗️ Tech Stack
Category	Tools
Framework	React + TypeScript
UI Library	Material UI (MUI v7)
Build Tool	Vite
Auth	Firebase Auth
Deployment	Netlify
State Mgmt	React Hooks
📂 Project Structure
frontlines-companies/
│
├── public/
│   └── companies.json      # Company dataset served publicly
│
├── src/
│   ├── api/
│   │   └── companies.ts    # Fetch companies from JSON
│   ├── components/
│   │   ├── CompanyCard.tsx
│   │   ├── CompanyTable.tsx
│   │   ├── SearchBar.tsx
│   │   ├── Filters.tsx
│   │   └── SortSelect.tsx
│   ├── pages/
│   │   └── Home.tsx
│   ├── firebase/
│   │   └── config.ts        # Firebase initialization
│   ├── App.tsx
│   └── main.tsx
│
├── package.json
├── tsconfig.json
└── vite.config.ts

📦 Installation

Make sure you have Node.js 18+ installed.

git clone https://github.com/YOUR-USERNAME/frontlines-companies.git
cd frontlines-companies
npm install

🧪 Run in Development
npm run dev


App will run at:

http://localhost:5173/

🔧 Build for Production
npm run build


Output is generated in:

dist/


To preview the local build:

npm run preview

🌐 Deploy to Netlify

This project is already optimized for Netlify.

If deploying manually:

Go to https://app.netlify.com/

Create a new site from GitHub

Set the build command:

npm run build


Set the publish directory:

dist


Deploy 🚀

Handling JSON Data on Netlify

Make sure the data file is inside:

public/companies.json


Fetch using:

fetch("/companies.json")


Do NOT import JSON inside TypeScript.

🔐 Firebase Setup

Create a Firebase project:

Go to https://console.firebase.google.com/

Enable Google authentication

Add a web app and get the config

Replace your config inside:

src/firebase/config.ts

🤝 Contributing

Contributions are welcome!
Feel free to open issues or submit pull requests.

📜 License

MIT License © 2024 Frontlines Media
