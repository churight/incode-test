# Kanban ToDo

This project is a full-stack web application consisting of a backend API and a frontend client.

### Tech Stack:

    -Backend:
        -Node.js
        -Express.js
    
    -Frontend:
        -React
        -Tailwindcss
        -react-beautiful-dnd
        -react-router-dom
        -Redux

    -DB:
        -MongoDB (connection string: mongodb://localhost:27017/kanban)

### **Prerequisites:** 

    Node.js, npm

### Ports (right now set up for docker):

    - Backend runs on 4000, /frontend/.env has URLs for localhost and docker
    - Frontend runs on localhost:5173/ when strating with npm run dev, with docker on port 3000
    - MongoDB runs on connection string: mongodb://localhost:27017/kanba or mongodb://mongo:27017/kanban for docker (URLs in /backend/.env)

### **Steps to run the solution locally:**

1. Clone repository
2. From project root run **"npm i"**
3. From project root run **"npm run install"** in order to install all necessary dependencies in both folders
4. From project root run **"npm run dev"** in order to run backend and frontend app
