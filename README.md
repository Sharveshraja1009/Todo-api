# Todo API with Node.js, Express, and MongoDB

This is a simple Todo API built with Node.js, Express, and MongoDB. The API allows users to perform CRUD operations (Create, Read, Update, Delete) on tasks. Tasks consist of a title and a status (completed or not).

## Features

- **Create Task**: Create a new todo task with a title.
- **List Tasks**: Get a list of all tasks.
- **Get Task by ID**: Retrieve details of a specific task using its ID.
- **Update Task**: Update the title or status of a specific task.
- **Delete Task**: Remove a task from the list by its ID.
- **Patch Task**: Partially update a task by changing specific fields.

## Requirements

- Node.js
- MongoDB (Running locally or using MongoDB Atlas)

## Setup Instructions

1. Clone the Repository

   ```bash
   git clone https://github.com/your-username/todo-api.git
   cd todo-api
   ```

2. Install Dependencies

   Run the following command to install required packages:

   ```bash
   npm install
   ```

3. Set Up MongoDB

   Make sure MongoDB is running on your machine. If you want to use a cloud database, replace the connection string in the code with your MongoDB Atlas URI.

   In `server.js`:

   ```javascript
   mongoose.connect('mongodb://localhost:27017/todoDB', { useNewUrlParser: true, useUnifiedTopology: true });
   ```

   Replace `mongodb://localhost:27017/todoDB` with your MongoDB URI if you are using MongoDB Atlas or a remote MongoDB instance.

4. Seed the Database (Optional)

   To seed the database with some initial tasks, run the following command:

   ```bash
   node seed.js
   ```

   This will clear the database and insert some example tasks.

5. Run the Server

   Start the server using the following command:

   ```bash
   node server.js
   ```

   You should see:

   ```
   Server is running on port 3000
   ```

   The API will be available at `http://localhost:3000`.

## API Endpoints

### Create a Task

- **URL**: `POST /tasks`
- **Body**:
  ```json
  {
    "title": "Task Title",
    "status": false
  }
  ```
- **Response**: Returns the newly created task.

### Get All Tasks

- **URL**: `GET /tasks`
- **Response**: Returns a list of all tasks.

### Get a Task by ID

- **URL**: `GET /tasks/:id`
- **Response**: Returns the task with the specified ID.

### Update a Task

- **URL**: `PUT /tasks/:id`
- **Body**:
  ```json
  {
    "title": "Updated Task Title",
    "status": true
  }
  ```
- **Response**: Returns the updated task.

### Patch a Task (Partial Update)

- **URL**: `PATCH /tasks/:id`
- **Body**:
  ```json
  {
    "status": true
  }
  ```
- **Response**: Returns the updated task with the changes applied.

### Delete a Task

- **URL**: `DELETE /tasks/:id`
- **Response**: Returns the deleted task.

## Testing with Postman

1. Open **Postman**.
2. Use the provided endpoints to test the API by making requests such as `POST`, `GET`, `PUT`, `PATCH`, and `DELETE`.
3. Set the **Content-Type** to `application/json` in the Postman headers.
4. Example for creating a new task:
   - **URL**: `POST http://localhost:3000/tasks`
   - **Body (JSON)**:
     ```json
     {
       "title": "Complete project",
       "status": false
     }
     ```

