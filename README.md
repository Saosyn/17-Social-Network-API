# Social Network API

## Description

This project is a Social Network API built with Node.js, Express, MongoDB, and Mongoose. The API allows you to manage users, thoughts, and friends. It provides endpoints to create, read, update, and delete users and thoughts, as well as to add and remove friends.

## Table of Contents

- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Saosyn/17-Social-Network-API
   ```

## API Endpoints

### `/api/users`

- **GET All Users:**  
  **Endpoint:** `GET /api/users`  
  _Description:_ Retrieves all users.

- **GET Single User:**  
  **Endpoint:** `GET /api/users/:userId`  
  _Description:_ Retrieves a user by its `_id` along with populated thought and friend data.

- **POST a New User:**  
  **Endpoint:** `POST /api/users`  
  **Sample JSON:**

  ```json
  {
    "username": "lernantino",
    "email": "lernantino@gmail.com"
  }
  ```

- **PUT to Update a User:**  
  **Endpoint:** `PUT /api/users/:userId`

```json
{
  "username": "updatedLernantino",
  "email": "updated.lernantino@gmail.com"
}
```

- **DELETE a User:**  
  **Endpoint:** `DELETE /api/users/:userId`

- **POST to Add a Friend:**  
  **Endpoint:** `POST /api/users/:userId/friends/:friendId`

- **GET all Thoughts:**  
  **Endpoint:** `GET /api/users/thoughts`

- **GET single Thought:**  
  **Endpoint:** `GET /api/users/thoughts/:thoughtId`

**POST to Create a New Thought:**  
 **Endpoint:** `POST /api/users/thoughts/`

**Sample JSON:**

```json
{
  "thoughtText": "Here's a cool thought...",
  "username": "lernantino",
  "userId": "5edff358a0fcb779aa7b118b"
}
```

- **PUT to Update a Thought:**  
  **Endpoint:** `PUT /api/users/thoughts/:thoughtId`

- **Delete a Thought:**  
  **Endpoint:** `DELETE /api/users/thoughts/:thoughtId`

  ## License

  -This project is licensed under the MIT License.
