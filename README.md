# 📍 TrackMe

**Smart Geofencing & Location-Based Reminder App — Real-Time Tracking, Notifications, and Context-Aware Alerts**

TrackMe is a React Native mobile application built using Expo that helps users create geofences, monitor live locations, receive background notifications, and manage location-based reminders using smart checklist integration.

The application combines geofencing, GPS tracking, notifications, SQLite storage, and real-time location monitoring into a scalable mobile system.

---

# 📑 Table of Contents

1. [Features](#-features)
2. [Screenshots](#-screenshots)
3. [Architecture](#-architecture)
4. [Tech Stack](#-tech-stack)
5. [Project Structure](#-project-structure)
6. [Setup & Installation](#-setup--installation)
7. [Core Functionalities](#-core-functionalities)
8. [Future Improvements](#-future-improvements)
9. [Author](#-author)
10. [License](#-license)

---

# ✨ Features

- 📍 Real-time GPS location tracking
- 🛰️ Smart geofencing with entry & exit detection
- 🔔 Background notifications using Expo Task Manager
- 🗺️ Interactive map integration using OpenStreetMap
- 📌 Add and manage custom tracked locations
- 📋 Location-based checklist & reminder support
- ⚡ Live current location monitoring
- 💾 SQLite-based offline data persistence
- ⚙️ Configurable geofence radius and SOS settings
- 📱 Native mobile permissions & background services

---

# 📸 Screenshots

## 🏠 Home Screen

![Home Screen](./screenshots/home.png)

## 📍 Add Location Screen

![Add Location](./screenshots/add-location.png)

## 🗺️ Current Location Tracking

![Current Location](./screenshots/current-location.png)

## ⚙️ Settings Screen

![Settings](./screenshots/settings.png)

---

# 🏗️ Architecture

```text
User Location
      ↓
Expo Location API
      ↓
Location Watch Service
      ↓
Geofence Detection Logic
      ↓
Expo Task Manager
      ↓
Background Notification Trigger
      ↓
SQLite Storage & Checklist System
```

### Architecture Overview

- Expo Location handles GPS tracking and geofencing
- Expo Task Manager manages background geofence tasks
- React Native Maps renders interactive maps
- SQLite stores locations and checklist data locally
- Notifications alert users on geofence entry/exit events
- Modular service architecture improves scalability

---

# 🛠️ Tech Stack

| Layer | Technologies & Tools |
| :-- | :-- |
| **Frontend** | React Native, Expo, Expo Router, TypeScript |
| **Maps & GPS** | React Native Maps, Expo Location, OpenStreetMap |
| **Notifications** | Expo Notifications, Expo Task Manager |
| **Storage** | Expo SQLite, AsyncStorage |
| **Utilities** | UUID, Haversine Distance Calculations |
| **Mobile Features** | Background Tasks, Geofencing, Real-Time Tracking |

---

# 📂 Project Structure

```bash
TrackMe/
│
├── app/
│   ├── (tabs)/
│   │   ├── home.tsx
│   │   ├── add-location.tsx
│   │   ├── CurrentLocation.tsx
│   │   ├── settings.tsx
│   │   └── _layout.tsx
│   │
│   ├── modal.tsx
│   ├── index.tsx
│   └── _layout.tsx
│
├── src/
│   ├── db/
│   │   ├── database.ts
│   │   ├── models.ts
│   │   └── queries.ts
│   │
│   ├── services/
│   │   ├── api.ts
│   │   └── location.ts
│   │
│   ├── utils/
│   │   └── haversine.ts
│   │
│   └── constants.ts
│
├── tasks/
│   └── geofence.ts
│
├── assets/
├── screenshots/
└── README.md
```

---

# ⚙️ Setup & Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/TrackMe.git
cd TrackMe
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Start Expo Development Server

```bash
npx expo start
```

---

# 📦 Main Dependencies

```bash
npm install expo-location
npm install expo-notifications
npm install expo-task-manager
npm install react-native-maps
npm install expo-sqlite
npm install react-native-uuid
npm install @react-native-async-storage/async-storage
```

---

# 🧠 Core Functionalities

## 📍 Geofencing

TrackMe allows users to:
- Create geofences with custom radius
- Detect entry and exit events
- Trigger background notifications automatically

---

## 🛰️ Real-Time Tracking

The application continuously monitors:
- Current user position
- Distance from saved locations
- Nearby tracked places

using:

```ts
watchPositionAsync()
```

and Haversine distance calculations.

---

## 🔔 Background Notifications

Expo Task Manager and Expo Notifications are used to:
- Run geofence tasks in background
- Trigger instant alerts
- Notify users when entering/exiting locations

Example:

```text
Entered geofence: Supermarket
```

---

## 💾 Offline SQLite Storage

SQLite database stores:
- Saved locations
- Geofence information
- Checklist reminders
- User data locally for offline support

---

## 📋 Smart Reminder Foundation

TrackMe supports:
- Location-linked checklist items
- Context-aware reminders
- Smart notification workflows

Example idea:

```text
Remind me to buy groceries when I reach D-Mart.
```

---

# 🚧 Future Improvements

- 📍 Live route tracking
- 📊 Travel history analytics
- ☁️ Firebase/Supabase backend integration
- 🧠 AI-powered smart reminders
- 🗣️ Text-to-Speech alerts
- 🚨 Emergency SOS live sharing
- 🌙 Enhanced dark mode support
- 📱 Push notification improvements

---

# 👨‍💻 Author

### M Purushothama Reddy

React Native Developer • Full Stack Enthusiast • Mobile Systems Developer

<p align="left">

<a href="mailto:machupalli.purushoth2023@vitstudent.ac.in" target="blank">
<img align="center" src="https://cdn-icons-png.flaticon.com/512/732/732200.png" alt="email" height="40" width="40" />
</a>

<a href="https://github.com/PurushothamaReddyM" target="blank">
<img align="center" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="github" height="40" width="40" />
</a>

</p>

---
