# Notes

A web application that allows users to perform CRUD operations on notes with secure JWT authentication. The application is built using ASP.NET Core for the backend and Angular for the frontend, following a monolithic architecture.

## Features

- **Backend:** ASP.NET Core
- **Architecture:** Monolithic
- **User Authentication:** Secure user login and registration using JWT (JSON Web Tokens).
- **CRUD Operations:** Users can create, read, update, and delete their notes.
- **User-Specific Notes:** Each user can manage their own notes, ensuring privacy and personalized experience.
- **Real-Time Updates:** Notes are updated in real-time on the dashboard.
- **Customizable Notes:** Users can modify the background and font color of each note card.
- **Search Functionality:** Users can search for notes using labels to quickly find what they need.
- **Responsive UI:** Intuitive and responsive design for a seamless user experience across devices.
- **Date Information:** Creation and modification dates are displayed on each note for better context.

# Tech Stack

- **Backend:** ASP.NET Core
- **Frontend:** Angular
- **Database:** SQL Server or any compatible database
- **Authentication:** JWT (JSON Web Tokens)
- **Architecture:** Monolithic

# Getting Started
## Prerequisites
- .NET SDK (version 6.0 or later)
- SQL Server or any compatible database
- Node.js and Angular CLI for the frontend
# Installation
## Frontend Setup
1. Clone the frontend repository (Assuming you have it separately):

```bash
git clone https://github.com/thedineshjoshi/Notes_Frontend.git
cd Notes_Frontend
```
2. Install Angular dependencies:
```
npm install
```
3. Run the Angular development server:
```
ng serve
```
4.Navigate to http://localhost:4200 to access the frontend.

# Usage
## User Registration
- **Endpoint:** POST /api/auth/register
- **Body:**
```
{
  "username": "string",
  "password": "string"
}
```
## User Login
- **Endpoint:** POST /api/auth/login
- **Body:**
```
{
  "username": "string",
  "password": "string"
}
```
- **Returns:** JWT token for authenticated requests
# CRUD Operations on Notes
## Create Note
- **Endpoint:** POST /api/notes
- **Body:**
```
{
  "title": "string",
  "content": "string"
}
```
## Get All Notes
- **Endpoint:** GET /api/notes
## Update Note
- **Endpoint:** PUT /api/notes/{id}
## Body:
```
{
  "title": "string",
  "content": "string"
}
```
## Delete Note
- **Endpoint:** DELETE /api/notes/{id}
# Configuration
- **JWT Secret:** Set the JWT secret key in appsettings.json under JwtSettings.
# Contributing
Contributions are welcome! Please open an issue or submit a pull request for any changes. Make sure to follow the existing code style and include tests if applicable.

# Acknowledgments
- ASP.NET Core for the backend framework
- Entity Framework Core for data access
- JWT for authentication
- Angular for the frontend framework

