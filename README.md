# PlaceTrack - Full-Stack Place & Location Record Management System

[![Spring Boot 3](https://img.shields.io/badge/Spring_Boot-3.2.5-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://react.dev/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0+-orange.svg)](https://www.mysql.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4-purple.svg)](https://vitejs.dev/)

---

## 📋 Student & Examination Details

- **Student Name:** [Your Name Here]
- **Roll Number / Student ID:** [Your Roll Number Here] (e.g. `MCA-35` or `CS-2026-042`)
- **Course / Degree:** Master of Computer Applications (MCA) / B.Tech / B.Sc Computer Science
- **Subject:** Full-Stack Web Development Practical Examination
- **Case Study Name:** PlaceTrack - Place & Location Record Management System
- **Time Allocated:** 60-Minute Practical Examination

---

## 📌 1. Project Overview

**PlaceTrack** is an enterprise-grade full-stack CRUD web application designed to track and manage places, public infrastructure, corporate campuses, health facilities, and tourist landmarks. It provides an intuitive real-time dashboard with dynamic metric cards, search and multi-criteria filters, full CRUD capabilities, and status lifecycle management (`Pending`, `In Progress`, `Completed`).

### Core Record Schema
Each place record persists the following attributes in MySQL:
1. **ID:** Long, primary key, auto-incremented
2. **Place Name:** Facility or location name (required)
3. **Location / Address:** Full geographical address (required)
4. **Category:** Classification (e.g., Technology, Healthcare, Education, Heritage & Tourism, Logistics)
5. **Description:** Details/notes (optional, max 500 characters)
6. **Contact Person:** Name of administrator or liaison (required)
7. **Contact Number:** Exactly 10 digits (required, validated)
8. **Status:** `Pending` | `In Progress` | `Completed` (required)
9. **Created Date (`created_at`):** Auto-generated creation timestamp

---

## 💻 2. Technology Stack

### Frontend
- **Framework:** React.js 18 (Vite build tool)
- **Styling:** Vanilla CSS3 with custom design system variables, glassmorphism, responsive grid & flexbox
- **Icons:** Lucide React icons
- **HTTP Client:** Axios with centralized service layer
- **Architecture:** Component-based modular architecture

### Backend
- **Platform:** Java 17
- **Framework:** Spring Boot 3.2.5
- **Modules:** Spring Web, Spring Data JPA, Jakarta Bean Validation
- **Build Tool:** Apache Maven
- **Architecture:** Controller-Service-Repository multi-tier enterprise architecture

### Database
- **Engine:** MySQL 8.0+
- **Persistence:** Hibernate / JPA ORM
- **Database Script:** `database/placetrack.sql` (MySQL Workbench compatible)

---

## ✨ 3. Features Implemented

### 📊 Dashboard
- **4 Metric Summary Cards:**
  - Total Places
  - Pending Places
  - In Progress Places
  - Completed Places
- Real-time status distribution progress visualization.
- **Recent Places Section:** Live table showing the 5 most recently created places with one-click status changer and view details modal.
- Automatic synchronization with MySQL via REST APIs.

### 🏢 All Places Management
- Responsive table with desktop and mobile layouts.
- **Search Bar:** Real-time search by Place Name, Location, Category, and Contact Person.
- **Filters:** Filter simultaneously by Status (`All`, `Pending`, `In Progress`, `Completed`) and Category.
- Active filters indicator and record counter.
- **Clear Filters Button:** Instant filter reset.
- **Color-Coded Status Badges:**
  - `Pending`: Amber / Yellow badge
  - `In Progress`: Blue / Indigo badge
  - `Completed`: Emerald / Green badge

### 🔄 Status Lifecycle Updates
- Inline status dropdown on tables to change status instantly.
- Saves changes to MySQL via `PATCH /api/places/{id}/status`.
- Automatically recalculates dashboard summary cards upon change.

### 📝 Add Place Form
- Client-side and server-side validation for all fields.
- 10-digit regex validation for phone numbers (`^[0-9]{10}$`).
- Character counter for description (up to 500 characters).
- Field error indicators with descriptive error messages.
- Success and error toast notifications.
- Automatic form reset on success.

### ✏️ Edit & Delete Records
- **Edit Modal:** Prepopulated form allowing in-place editing of record details.
- **Delete Confirmation Modal:** Safety dialog preventing accidental deletions before calling `DELETE /api/places/{id}`.

---

## ⚙️ 4. Software Prerequisites

Ensure you have the following installed on your machine:
- **Java Development Kit (JDK):** Version 17 or higher (`java -version`)
- **Apache Maven:** Version 3.8+ (`mvn -version`)
- **Node.js & npm:** Node 18+ and npm 9+ (`node -v` and `npm -v`)
- **MySQL Server:** Version 8.0 or higher
- **MySQL Workbench** or MySQL CLI

---

## 🗄️ 5. Database Setup (MySQL)

### Step 1: Open MySQL Workbench or MySQL Terminal
Log in to your local MySQL server:
```bash
mysql -u root -p
```

### Step 2: Run the SQL Seed Script
Execute the provided script [database/placetrack.sql](file:///c:/Users/dhira/Desktop/PlaceTrack/database/placetrack.sql):

```sql
source c:/Users/dhira/Desktop/PlaceTrack/database/placetrack.sql;
```
*Or open `database/placetrack.sql` in MySQL Workbench and click the Execute (Lightning bolt) icon.*

This script automatically:
1. Creates the database `placetrack_db`.
2. Creates the `places` table with proper data constraints.
3. Seeds 6 diverse, realistic sample records across multiple categories and all three statuses.

### Step 3: Configure Database Credentials
Open [backend/src/main/resources/application.properties](file:///c:/Users/dhira/Desktop/PlaceTrack/backend/src/main/resources/application.properties) and ensure your MySQL password matches:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/placetrack_db?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
spring.datasource.username=${DB_USERNAME:root}
spring.datasource.password=${DB_PASSWORD:root}
```

> **Tip:** If your MySQL root password is `admin123` or something else, either edit the `DB_PASSWORD:your_password` in `application.properties` or set an environment variable before launching the backend:
> ```powershell
> $env:DB_PASSWORD="your_actual_password"
> ```

---

## 🚀 6. Setup & Execution Commands

> ⚠️ **IMPORTANT:** The Spring Boot backend and React frontend must run in **two separate terminal windows**.

### Terminal 1: Run the Backend (Spring Boot)

```bash
# Navigate to the backend directory
cd backend

# Compile and start the Spring Boot application
mvn spring-boot:run
```

- **Backend API URL:** `http://localhost:8080`
- **Default Endpoint:** `http://localhost:8080/api/places`
- **Stats Endpoint:** `http://localhost:8080/api/places/stats`

---

### Terminal 2: Run the Frontend (React + Vite)

```bash
# Navigate to the frontend directory
cd frontend

# Install Node dependencies (first time only)
npm install

# Start the Vite development server
npm run dev
```

- **Frontend Application URL:** `http://localhost:5173`

Open your web browser and navigate to `http://localhost:5173`.

---

## 📡 7. REST API Documentation

| HTTP Method | Endpoint | Description | Request Body | Response Code |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/api/places` | Retrieve all records (supports `?search=`, `?status=`, `?category=`) | None | `200 OK` |
| **GET** | `/api/places/stats` | Dashboard statistics summary | None | `200 OK` |
| **GET** | `/api/places/recent` | Top 5 most recently created places | None | `200 OK` |
| **GET** | `/api/places/categories` | List of all distinct categories | None | `200 OK` |
| **GET** | `/api/places/{id}` | Get a single place record by ID | None | `200 OK` / `404 Not Found` |
| **POST** | `/api/places` | Create a new place record | JSON `PlaceDto` | `201 Created` / `400 Bad Request` |
| **PUT** | `/api/places/{id}` | Update an existing place record | JSON `PlaceDto` | `200 OK` / `404 Not Found` |
| **PATCH** | `/api/places/{id}/status` | Update only status (`Pending`, `In Progress`, `Completed`) | `{"status": "Completed"}` | `200 OK` / `400 Bad Request` |
| **DELETE** | `/api/places/{id}` | Permanently delete a record | None | `200 OK` / `404 Not Found` |

### Sample Statistics Response (`GET /api/places/stats`)
```json
{
  "totalPlaces": 6,
  "pendingPlaces": 2,
  "inProgressPlaces": 2,
  "completedPlaces": 2
}
```

---

## 📁 8. Project Structure

```text
PlaceTrack/
│
├── frontend/                         # React.js + Vite Client Application
│   ├── public/
│   │   └── favicon.svg               # SVG Pin Icon
│   ├── src/
│   │   ├── components/               # Reusable UI Components
│   │   │   ├── ConfirmModal.jsx      # Delete Confirmation Modal
│   │   │   ├── Navbar.jsx            # Top Navigation Header
│   │   │   ├── NotificationToast.jsx # Floating Toast Alerts
│   │   │   ├── PlaceModal.jsx        # Detailed View & Edit Modal
│   │   │   ├── Sidebar.jsx           # Desktop/Mobile Sidebar
│   │   │   ├── StatCard.jsx          # Metric Cards
│   │   │   └── StatusBadge.jsx       # Color-Coded Status Tags
│   │   ├── pages/
│   │   │   ├── AddPlace.jsx          # Add Place Form with Validation
│   │   │   ├── AllPlaces.jsx         # Places Table, Search & Filter
│   │   │   └── Dashboard.jsx         # Summary Cards & Overview
│   │   ├── services/
│   │   │   └── placeService.js       # Axios Backend API Integration
│   │   ├── App.jsx                   # Root Application Component
│   │   ├── index.css                 # CSS3 Design System
│   │   └── main.jsx                  # React DOM Entry Point
│   ├── index.html                    # HTML5 Template with SEO & Fonts
│   ├── package.json                  # NPM Dependencies & Scripts
│   └── vite.config.js                # Vite Server & Proxy Config
│
├── backend/                          # Spring Boot 3 REST API Server
│   ├── src/main/
│   │   ├── java/com/placetrack/
│   │   │   ├── PlaceTrackApplication.java
│   │   │   ├── config/
│   │   │   │   └── CorsConfig.java               # Cross-Origin Resource Sharing
│   │   │   ├── controller/
│   │   │   │   └── PlaceController.java          # REST Controllers
│   │   │   ├── dto/
│   │   │   │   ├── PlaceDto.java                 # Request Payload DTO
│   │   │   │   ├── StatsResponseDto.java         # Metric Response DTO
│   │   │   │   └── StatusUpdateDto.java          # Patch Status DTO
│   │   │   ├── entity/
│   │   │   │   └── Place.java                    # JPA Entity (places table)
│   │   │   ├── exception/
│   │   │   │   ├── GlobalExceptionHandler.java   # Central Exception Handling
│   │   │   │   └── ResourceNotFoundException.java# 404 Exception
│   │   │   ├── repository/
│   │   │   │   └── PlaceRepository.java          # Spring Data JPA Repository
│   │   │   └── service/
│   │   │       └── PlaceService.java             # Business Logic Layer
│   │   └── resources/
│   │       └── application.properties            # MySQL & Hibernate Configuration
│   └── pom.xml                                   # Maven Dependencies
│
├── database/
│   └── placetrack.sql                            # Schema & 6 Seed Records
│
├── screenshots/
│   └── README.md                                 # Guide to capture & store screenshots
│
├── .gitignore                                    # Excludes node_modules, target, etc.
└── README.md                                     # Examination Submission Guide
```

---

## 📷 9. Screenshots Submission

Save application screenshots directly into the [screenshots/](file:///c:/Users/dhira/Desktop/PlaceTrack/screenshots/) directory:
1. **`01_dashboard.png`**: Dashboard with summary cards and recent records.
2. **`02_all_places_records.png`**: All Places page with active search, filter, and table.
3. **`03_add_place_form.png`**: Add New Place form with inputs and validation states.

---

## 🔧 10. Troubleshooting & FAQs

### 1. `Communications link failure` or `Access denied for user 'root'@'localhost'`
- Check if your MySQL server is running in Windows Services (`services.msc` -> MySQL80).
- Verify the MySQL password in [backend/src/main/resources/application.properties](file:///c:/Users/dhira/Desktop/PlaceTrack/backend/src/main/resources/application.properties).

### 2. Frontend shows `Failed to fetch places from MySQL`
- Verify that your Spring Boot backend is actively running on port 8080 (`http://localhost:8080/api/places/stats`).
- If port 8080 is occupied by another application, change `server.port=8081` in `application.properties` and update `target: 'http://localhost:8081'` in [frontend/vite.config.js](file:///c:/Users/dhira/Desktop/PlaceTrack/frontend/vite.config.js).

### 3. Port 5173 already in use
- Vite will automatically use the next available port (e.g. `5174`). You can access the application at that URL.

---

## 📦 11. GitHub Repository Submission

When pushing to GitHub for your practical exam submission, follow your roll number format:

```bash
git init
git add .
git commit -m "Complete PlaceTrack full-stack application submission"
git branch -M main
git remote add origin https://github.com/your-username/RollNo_PlaceTrack.git
git push -u origin main
```
*Note: Make sure `.gitignore` prevents `target/` and `node_modules/` from being pushed.*
