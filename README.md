# Dermatouch - Full Stack (Backend + React Native Mobile)

This project contains:

- **Backend (Node.js + Express + Sequelize + SQLite/Postgres)**  
- **Mobile App (React Native + Expo + TypeScript)**  

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd Dermatouch
⚙️ Backend Setup
Navigate to backend folder:
bash
Copy code
cd ./backend
Install dependencies:
bash
Copy code
npm install
Seed the database with demo user & products:
bash
Copy code
node seed.js
Start the backend server:
bash
Copy code
node server.js
✅ Backend will run at:

arduino
Copy code
http://localhost:3000
Static Images
All images stored in the backend/images/ folder will be served at:

bash
Copy code
http://localhost:3000/images/<filename>
Example:

bash
Copy code
http://localhost:3000/images/dermacream.png
📱 Mobile App Setup (React Native + Expo)
Navigate to mobile folder:
bash
Copy code
cd ../mobile
Install dependencies:
bash
Copy code
npm install
Start the Expo development server:
bash
Copy code
npx expo start
This will open the Expo Developer Tools in your browser.

📲 Running the App
You have two options to run the app:

Option 1: Android Emulator (Recommended)
Install Android Studio

Setup Android Virtual Device (AVD)

Run the emulator

In Expo DevTools, click Run on Android Emulator

Option 2: Physical Device
Make sure your mobile and PC are connected to the same WiFi network

Install Expo Go app from Play Store / App Store

Scan the QR code shown in Expo DevTools

The app will open in your device 🚀

🔑 Default Credentials
You can log in using the seeded demo account:

Email: test@demo.com

Password: password123

📦 Tech Stack
Backend: Node.js, Express, Sequelize, SQLite/Postgres, JWT, Bcrypt

Frontend (Mobile): React Native, Expo, TypeScript, Context API

Auth: Dummy login (JWT based)

Features:

Login / Registration

Product List (with categories & search)

Add to Cart & Checkout

Display Past Orders

Static image serving from backend
