# REST API with Node.js, Express, MongoDB, JWT Authentication, and Role-Based Access Control (RBAC)

## Table of Contents

- [Introduction](#introduction)
- [Setup](#setup)
- [Dependencies](#dependencies)
- [Environment Variables](#environment-variables)
- [Starting the Server](#starting-the-server)
- [API Endpoints](#api-endpoints)
  - [Register](#register)
  - [Login](#login)
  - [Get All Users (Admin Only)](#get-all-users-admin-only)
  - [Get User by ID](#get-user-by-id)
  - [Update User](#update-user)
  - [Delete User](#delete-user)
- [Testing with Postman](#testing-with-postman)
- [Conclusion](#conclusion)

## Introduction

This project is a REST API built with Node.js, Express, and MongoDB. It includes JWT-based authentication and role-based access control (RBAC) to manage different user permissions.

## Setup

1. **Clone the repository:**

    ```sh
    git clone https://github.com/yourusername/your-repo-name.git
    cd your-repo-name
    ```

2. **Install dependencies:**

    ```sh
    npm install
    ```

3. **Set up MongoDB:**

    - Create a MongoDB Atlas account and set up a cluster.
    - Get your connection string.

4. **Install Swagger:**

    ```sh
    npm install swagger-jsdoc swagger-ui-express
    ```

5. **Configure environment variables:**

    Create a `.env` file in the root of the project and add your MongoDB connection string and JWT secret:

    ```env
    MONGO_URI='yourMongoDBConnectionString'
    JWT_SECRET='yourJWTSecret'
    ```

## Dependencies

- express
- mongoose
- jsonwebtoken
- bcryptjs
- dotenv
- swagger
- nodemon (for development)

## Environment Variables

- `MONGO_URI`: Your MongoDB connection string
- `JWT_SECRET`: Secret key for JWT

## Starting the Server

Start the server using:

```sh
npm start

```

The server will run on `http://localhost:3000` 

## API Endpoints

### Register

- **URL:** `/register`
- **Method:** `POST`
- **Body:**
    ```json
    {
      "name": "string",
      "email": "string",
      "password": "string",
      "role": "string"
    }
    ```
- **Description:** Register a new user. The `role` field can be either `user` or `admin`.

### Login

- **URL:** `/login`
- **Method:** `POST`
- **Body:**
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
- **Description:** Authenticate a user and return a JWT token.

### Get All Users (Admin Only)

- **URL:** `/admin/users`
- **Method:** `GET`
- **Headers:** `auth-token: yourJWTToken`
- **Description:** Retrieve all users. Only accessible to users with the `admin` role.

### Get User by ID

- **URL:** `/users/:id`
- **Method:** `GET`
- **Headers:** `auth-token: yourJWTToken`
- **Description:** Retrieve a user by their ID. Accessible to authenticated users.

### Update User

- **URL:** `/users/:id`
- **Method:** `PUT`
- **Headers:** `auth-token: yourJWTToken`
- **Body:**
    ```json
    {
      "name": "string",
      "email": "string",
      "password": "string"
    }
    ```
- **Description:** Update user details by their ID. Accessible to authenticated users.

### Delete User

- **URL:** `/users/:id`
- **Method:** `DELETE`
- **Headers:** `auth-token: yourJWTToken`
- **Description:** Delete a user by their ID. Accessible to authenticated users.

## Testing with Postman

1. **Register a New Admin User:**
   - **Method:** POST
   - **URL:** `http://localhost:3000/register`
   - **Body:**
     ```json
     {
       "name": "Admin User",
       "email": "admin@example.com",
       "password": "adminpassword",
       "role": "admin"
     }
     ```

2. **Login as Admin User:**
   - **Method:** POST
   - **URL:** `http://localhost:3000/login`
   - **Body:**
     ```json
     {
       "email": "admin@example.com",
       "password": "adminpassword"
     }
     ```

   - Copy the token from the response.

3. **Access Admin Route:**
   - **Method:** GET
   - **URL:** `http://localhost:3000/admin/users`
   - **Headers:**
     - Key: `auth-token`
     - Value: `yourTokenFromLoginResponse`

4. **Register a New Regular User:**
   - **Method:** POST
   - **URL:** `http://localhost:3000/register`
   - **Body:**
     ```json
     {
       "name": "Regular User",
       "email": "user@example.com",
       "password": "userpassword",
       "role": "user"
     }
     ```

5. **Login as Regular User:**
   - **Method:** POST
   - **URL:** `http://localhost:3000/login`
   - **Body:**
     ```json
     {
       "email": "user@example.com",
       "password": "userpassword"
     }
     ```

   - Copy the token from the response.

6. **Try to Access Admin Route:**
   - **Method:** GET
   - **URL:** `http://localhost:3000/admin/users`
   - **Headers:**
     - Key: `auth-token`
     - Value: `yourTokenFromLoginResponse`

   - Expect to receive an "Access Denied" response.

## Conclusion

This project demonstrates how to build a REST API with Node.js, Express, and MongoDB, including JWT authentication and role-based access control. It provides a secure way to manage user permissions and protect routes based on user roles.

Feel free to contribute to this project by submitting issues or pull requests on the GitHub repository.
