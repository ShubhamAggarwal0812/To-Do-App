# TODO Application

This is a full-stack TODO list application built using the MERN (MongoDB, Express, React, Node.js) stack. The application allows users to sign up, log in, create, edit, delete TODO items, and filter them based on status and due dates. The design is responsive, ensuring a seamless experience across various devices.

## Features

- **User Authentication**: Sign up, log in, and log out functionalities.
- **TODO Management**: Create, read, update, and delete TODO items.
- **Filtering**: Filter TODO items by status (e.g., All, Overdue, To Do, Done) and due dates.
- **Status Updates**: Mark TODO items as done or undo them.
- **Responsive Design**: Ensures usability on mobile, tablet, and desktop screens using Tailwind CSS.

## Technologies

### Backend

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing TODO items and user information.
- **Mongoose**: ODM for MongoDB, providing schema-based solutions.
- **JWT (jsonwebtoken)**: For securing endpoints with token-based authentication.
- **bcryptjs**: For hashing passwords.

### Frontend

- **React**: JavaScript library for building user interfaces.
- **React Router**: For handling client-side routing.
- **Axios**: For making HTTP requests.
- **React Hook Form**: For handling form state and validation.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **React Icons**: For using popular icons.
- **Framer Motion**: For animations.
- **Moment.js**: For date formatting and manipulation.

## Setup

### Prerequisites

- **Node.js and npm**: Ensure you have Node.js and npm installed.
- **MongoDB**: MongoDB should be installed and running on your machine.

### Installation

1. **Clone the repository**
    ```bash
    git clone <repository-url>
    cd todo-app
    ```

2. **Install backend dependencies**
    ```bash
    cd server
    npm install
    ```

3. **Install frontend dependencies**
    ```bash
    cd ../client
    npm install
    ```

### Running the Application

#### Backend

1. **Environment Variables**: Create a `.env` file in the `server` directory and add the following environment variables:
    ```
    PORT=5000
    MONGO_URI=<your-mongodb-uri>
    JWT_SECRET=<your-secret-key>
    ```

2. **Start the Backend Server**: Run the following command to start the server in development mode:
    ```bash
    cd server
    npm run dev
    ```

#### Frontend

1. **Start the Frontend Development Server**: Run the following command to start the frontend:
    ```bash
    cd client
    npm start
    ```

## Project Structure

### Backend

- `server/config/db.js`: Database connection setup.
- `server/controllers`: Contains controller files for handling requests.
  - `todo-controller.js`: Handles TODO-related requests.
  - `user-controller.js`: Handles user-related requests.
- `server/errors`: Custom error classes.
- `server/middleware`: Middleware functions.
  - `account-auth-middleware.js`: Middleware for authenticating user requests.
- `server/models`: Mongoose models for MongoDB collections.
  - `todo-db.js`: TODO schema and model.
  - `user-db.js`: User schema and model.
- `server/routes`: Defines routes for the application.
  - `todo-routes.js`: Routes for TODO-related endpoints.
  - `user-routes.js`: Routes for user-related endpoints.
- `server/utils`: Utility functions.
  - `account-util.js`: Utility functions for hashing passwords.
  - `error-handler.js`: Global error handler.
- `server/server.js`: Entry point for the backend server.

### Frontend

- `client/src/components`: Reusable React components.
  - `Filter.js`: Component for filtering TODO items.
  - `Footer.js`: Footer component.
  - `Header.js`: Header component with navigation.
  - `TodoForm.js`: Form for adding and editing TODO items.
  - `TodoItem.js`: Component representing a single TODO item.
  - `TodoList.js`: Component for listing TODO items.
  - `TodoModal.js`: Modal component for TODO forms.
- `client/src/hooks`: Custom React hooks.
  - `useTodos.js`: Hook for managing TODO state and operations.
- `client/src/pages`: React components representing different pages.
  - `HomeScreen.js`: Home page.
  - `LoginScreen.js`: Login page.
  - `RegisterScreen.js`: Registration page.
  - `TodoScreen.js`: Main TODO management page.
- `client/src/utils`: Utility functions.
  - `api.js`: Functions for making API requests.
  - `filterTodos.js`: Function for filtering TODO items.
  - `getToken.js`: Utility function for retrieving the authentication token.
- `client/src/App.js`: Main application component.
- `client/src/index.js`: Entry point for the React application.
- `client/src/index.css`: Global styles using Tailwind CSS.

## Contributing

Contributions are welcome! If you have any suggestions, enhancements, or bug fixes, feel free to open an issue or create a pull request.

## Contact

If you have any questions or want to connect, you can reach me on [LinkedIn](https://www.linkedin.com/in/shubhamaggarwal0812/).