# 📆 GraphQL Booking App (MERN Stack)

This is a simple event booking application built using the MERN stack (MongoDB, Express, React, Node.js) and GraphQL. The main goal of this project is to understand and implement GraphQL in a real-world app scenario.

Users can:

<ul>
    <li>Create events</li>
    <li>Book events</li>
</ul>

The highlight of this project is the use of GraphQL instead of REST for handling data communication between the frontend and backend.

## ⚙️ Tech Stack

### 🖥️ Frontend

- **React (Vite) [Docs](https://vite.dev/guide/)**: Fast development environment
- **Apollo Client [Docs](https://www.apollographql.com/docs/react)**: Handles GraphQL queries and mutations from the client side
- **Tailwind CSS [Docs](https://tailwindcss.com/docs/installation/using-vite)**: Utility-first CSS framework for styling
- **React Day Picker [Docs](https://www.npmjs.com/package/react-day-picker)**: For selecting dates in a user-friendly calendar interface

### 🗄️ Backend

- **Node.js + Express**: Server-side runtime and framework
- **MongoDB**: Database to store users, events, and bookings
- **GraphQL [Docs](https://www.graphql-js.org/docs/running-an-express-graphql-server/)**: For defining the schema and handling GraphQL queries/mutations
- **graphql-http [Docs](https://www.graphql-js.org/api-v16/graphql-http/)**: A modern, fully compliant GraphQL HTTP server with Express integration
- **JWT & Argon2**: Used for authentication and password hashing.

## 📂 Project Structure

```
graphql-react-event-booking/
│-- frontend/      # React (TypeScript) Frontend
│-- backend/       # Node.js + Express + MongoDB + GraphQL Backend
```

## 🛠️ Installation & Setup

### **Prerequisites**

Ensure you have the following installed:

- **[Node.js](https://nodejs.org/)** (v16+ recommended)
- **[MongoDB](https://www.mongodb.com/docs/manual/installation/)** (Ensure MongoDB is running locally or use MongoDB Atlas)
- **npm or yarn** (for package management)

### **Backend Setup**

1. Navigate to the backend directory:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the backend server:
   ```sh
   npm run start
   ```

### **Frontend Setup**

1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend app:
   ```sh
   npm run dev
   ```

## 🧪 Testing GraphQL Queries

I highly recommend using Postman for testing and debugging GraphQL queries and mutations.
Postman has a very user-friendly interface for GraphQL, making it easy to:

<ul>
    <li>Write queries</li>
    <li>Send mutations</li>
    <li>Inspect responses</li>
    <li>Debug with variables and headers</li>
</ul>

## 📚 Learnings & Goals

This project was built primarily to:

<ul>
<li>Learn the core concepts of GraphQL</li>
<li>Understand how to structure and integrate GraphQL in a MERN stack application</li>
<li>Gain hands-on experience with Apollo Client, schema building, resolvers, and GraphQL queries/mutations</li>
</ul>

## 📸 Screenshots

- **Events/ Home page**
  <img width="500" alt="Events/ Home page screenshot" src="https://github.com/user-attachments/assets/1c945db6-5f0c-49dd-8278-4d501759f1c1" />

- **Create Event Modal**:
  <img width="500" alt="Create Event Modal screenshot" src="https://github.com/user-attachments/assets/2249b069-2e37-4daa-9746-4f79ad93d115" />

- **Booking History Page**:
  <img width="500" alt="Booking History Page Screenshot" src="https://github.com/user-attachments/assets/69f58771-b50b-41d1-b9f2-c4a6bd1a6ee1" />

- **Event Detail Modal with ability to Cancel Bookings**:
  <img width="500" alt="Event Details Modal screenshot" src="https://github.com/user-attachments/assets/de40d23b-bd78-4a1b-8997-379fb7bdf513" />

- **Collapsible Navbar for Responsive View**:
  <img width="250" alt="Collapsible Navbar Screenshot" src="https://github.com/user-attachments/assets/92566779-b73c-46f1-86f9-2d7a894e428c" />
