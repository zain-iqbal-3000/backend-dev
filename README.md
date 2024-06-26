# User API
This project is a basic REST API built with Node.js, Express, and MongoDB using Mongoose. It handles CRUD operations for a "users" resource.

## Setup

1. Clone the repository:
    ```sh
    git clone <your-github-repo-url>
    cd user-api
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the server:
    ```sh
    npm start
    ```

The server will run on `http://localhost:3000`.


#MongoDB

## Setup Instructions

### Prerequisites

- Node.js and npm installed
- MongoDB Atlas account


## Testing

Use [Postman](https://www.postman.com/) to test the API endpoints.

- To get all users, make a GET request to `http://localhost:3000/users`.
- To create a new user, make a POST request to `http://localhost:3000/users` with a JSON body.
- To get a user by ID, make a GET request to `http://localhost:3000/users/:id`.
- To update a user by ID, make a PUT request to `http://localhost:3000/users/:id` with a JSON body.
- To delete a user by ID, make a DELETE request to `http://localhost:3000/users/:id`.
