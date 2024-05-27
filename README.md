# TODO Application

This is a simple TODO list application built using NodeJS for the backend and React for the frontend. The application allows users to signup, login, create, edit, delete TODO items, and filter them based on status and due dates.

## Features

- User Authentication (Signup, Login, Logout)
- Create, Read, Update, Delete (CRUD) TODO items
- Filter TODO items by status and due dates
- Mark TODO items as done or undo them
- Responsive design using Tailwind CSS

## Technologies

- Backend: NodeJS, Express, MongoDB
- Frontend: React, Tailwind CSS
- Authentication: JWT, bcryptjs

## Setup

### Prerequisites

- NodeJS and npm installed
- MongoDB installed and running

### Installation

1. Clone the repository
    ```bash
    git clone <repository-url>
    cd todo-app
    ```

2. Install backend dependencies
    ```bash
    cd server
    npm install
    ```

3. Install frontend dependencies
    ```bash
    cd ../client
    npm install
    ```

### Running the Application

#### Backend

1. Create a `.env` file in the `server` directory and add the following environment variables:
    ```
    PORT=5000
    MONGO_URI=<your-mongodb-uri>
    JWT_SECRET=<your-secret-key>
    ```

2. Start the backend server
    ```bash
    cd server
    npm run dev
    ```

#### Frontend

1. Start the frontend development server
    ```bash
    cd client
    npm start
    ```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
