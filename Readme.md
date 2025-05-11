# LingoVerse - Language Learning Social Platform

**Live Demo:** [https://lingoverse.onrender.com](https://lingoverse.onrender.com)  
**Created by:** Harshit Rajput

## Overview

LingoVerse is a modern social platform designed to connect language learners worldwide. It facilitates language exchange through real-time chat, video calls, and a friend-matching system based on language preferences.

## Features

- 🌐 Connect with native speakers worldwide
- 💬 Real-time chat using Stream Chat API
- 🎥 Video calling capabilities using Stream Video SDK
- 🤝 Smart friend recommendations based on language preferences
- 🎨 30+ customizable themes using DaisyUI
- 🔐 Secure authentication system
- 📱 Responsive design for all devices

## Technologies Used

### Frontend
- **React** - UI library
- **Vite** - Build tool for faster development
- **TanStack Query** - Data synchronization and caching
- **Stream Chat & Video SDK** - Real-time communication
- **Zustand** - State management
- **DaisyUI & TailwindCSS** - Styling and theming
- **React Router** - Navigation
- **Axios** - HTTP client
- **React Hot Toast** - Notifications

### Backend
- **Node.js & Express** - Server framework
- **MongoDB & Mongoose** - Database and ODM
- **JWT** - Authentication
- **Stream API** - Chat and video services
- **bcrypt** - Password hashing
- **Cookie Parser** - Session management

## API Documentation

### Authentication Routes

#### 1. Sign Up
```http
POST /api/auth/signup
```
**Request Body:**
```json
{
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "password123"
}
```
**Response:**
```json
{
    "success": true,
    "user": {
        "_id": "user_id",
        "fullName": "John Doe",
        "email": "john@example.com",
        "profilePic": "https://avatar.iran.liara.run/public/42.png",
        "isOnboarded": false
    }
}
```

#### 2. Login
```http
POST /api/auth/login
```
**Request Body:**
```json
{
    "email": "john@example.com",
    "password": "password123"
}
```
**Response:**
```json
{
    "success": true,
    "user": {
        "_id": "user_id",
        "fullName": "John Doe",
        "email": "john@example.com",
        "profilePic": "avatar_url"
    }
}
```

#### 3. Complete Onboarding
```http
POST /api/auth/onboarding
```
**Request Body:**
```json
{
    "fullName": "John Doe",
    "bio": "Language enthusiast",
    "nativeLanguage": "english",
    "learningLanguage": "spanish",
    "location": "New York, USA"
}
```
**Response:**
```json
{
    "success": true,
    "user": {
        "_id": "user_id",
        "fullName": "John Doe",
        "bio": "Language enthusiast",
        "nativeLanguage": "english",
        "learningLanguage": "spanish",
        "location": "New York, USA",
        "isOnboarded": true
    }
}
```

### User Routes

#### 1. Get Recommended Users
```http
GET /api/users
```
**Response:**
```json
[
    {
        "_id": "user_id",
        "fullName": "User Name",
        "profilePic": "avatar_url",
        "nativeLanguage": "french",
        "learningLanguage": "english",
        "bio": "User bio"
    }
]
```

#### 2. Send Friend Request
```http
POST /api/users/friend-request/:userId
```
**Response:**
```json
{
    "_id": "request_id",
    "sender": "sender_id",
    "recipient": "recipient_id",
    "status": "pending"
}
```

#### 3. Accept Friend Request
```http
PUT /api/users/friend-request/:requestId/accept
```
**Response:**
```json
{
    "message": "Friend request accepted"
}
```

## Key Features & USPs

### 1. Real-time Communication
- Seamless chat integration using Stream Chat
- High-quality video calls using Stream Video SDK
- Real-time notifications for friend requests and messages

### 2. Language Learning Focus
- Matches users based on language learning goals
- Supports 14 major world languages
- Easy language partner discovery system

### 3. User Experience
- Modern, responsive design
- 30+ customizable themes
- Intuitive onboarding process
- Fast performance with React Query caching

### 4. Security
- JWT-based authentication
- Secure password hashing
- Protected routes and API endpoints
- HTTP-only cookies for session management

## Installation & Setup

1. Clone the repository
```bash
git clone https://github.com/harshitxrajput/LingoVerse.git
```

2. Install dependencies
```bash
cd LingoVerse
npm install
cd frontend
npm install
cd ../backend
npm install
```

3. Environment Variables
Create `.env` files in both frontend and backend directories:

**Backend (.env)**
```env
PORT=5001
MONGO_URI=your_mongodb_uri
JWT_SECRET_KEY=your_jwt_secret
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
```

**Frontend (.env)**
```env
VITE_STREAM_API_KEY=your_stream_api_key
```

4. Start the application
```bash
# Start backend
cd backend
npm run dev

# Start frontend
cd frontend
npm run dev
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License.
