# React Chat Application

A full-stack real-time chat application inspired by modern messaging platforms. The project is built with React, Node.js, Express, MongoDB, and TypeScript.

---

# Link 

https://chat-bot-pudge.vercel.app/

---

## Features

### Authentication
- User registration
- User login with JWT authentication
- Password hashing using bcrypt
- Protected API routes

### Contacts
- View personal contact list
- Add contacts by phone number
- Prevent duplicate contacts
- Quickly start conversations from the contact list

### Chats
- View all existing chats
- Create a new chat by selecting a contact
- Create a group chat
- Edit name of a chat
- Automatically open an existing conversation if one already exists
- Quick filtering of conversations by name
- Responsive chat navigation
- Instant message delivery
- Formatted relative timestamps using date-fns

### Profile
- View profile information
- Edit user profile
- Logout functionality

### User Interface
- Responsive design
- Mobile-friendly layout
- Animated transitions between pages
- Sidebar navigation
- Search functionality

---

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Axios
- React Router
- date-fns
- Axios

---

## Installation

### Clone repository

```bash
git clone https://github.com/pudgynator/Chat-bot.git
```
---

### Install frontend dependencies

```bash
cd client
npm install
```

---

## Environment Variables

### Create a `.env` file inside the **client** directory with the following content:

```env
VITE_API_URL=https://chat-app-server-0y3c.onrender.com
```


## Running the Application

```bash
cd client
npm run dev
```