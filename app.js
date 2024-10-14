const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize Express
const app = express();
app.use(bodyParser.json());

// Connect to MongoDB (local or cloud MongoDB URI)
mongoose.connect('mongodb://localhost:27017/todoDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Could not connect to MongoDB", err));

// Define the Task schema
const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    status: { type: Boolean, default: false },
});

// Create the Task model
const Task = mongoose.model('Task', taskSchema);

// Routes

// Create a new task (POST request)
app.post('/tasks', async (req, res) => {
    const { title, status } = req.body;
    
    // Title is required, validate input
    if (!title) return res.status(400).send('Title is required');
    
    try {
        const task = new Task({ title, status: status || false });
        await task.save(); // Save the new task
        res.status(201).send(task); // Respond with the created task
    } catch (error) {
        res.status(500).send('Failed to create task'); // Handle errors
    }
});

// List all tasks (GET request)
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find(); // Find all tasks
        res.status(200).json(tasks); // Return list of tasks as JSON
    } catch (error) {
        res.status(500).send('Server error'); // Handle errors
    }
});

// Get a task by ID (GET request)
app.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id); // Find task by ID
        if (!task) return res.status(404).send('Task not found'); // Handle case where task doesn't exist
        res.status(200).json(task); // Return the task
    } catch (error) {
        res.status(500).send('Server error'); // Handle errors
    }
});

// Update an existing task (PUT request)
app.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { title, status } = req.body;

    try {
        const task = await Task.findById(id); // Find task by ID
        if (!task) return res.status(404).send('Task not found'); // Handle case where task doesn't exist

        // Update task fields
        task.title = title || task.title;
        task.status = status !== undefined ? status : task.status;

        await task.save(); // Save the updated task
        res.send(task); // Respond with the updated task
    } catch (error) {
        res.status(500).send('Failed to update task'); // Handle errors
    }
});

// Delete a task (DELETE request)
app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findByIdAndDelete(id); // Find and delete task by ID
        if (!task) return res.status(404).send('Task not found'); // Handle case where task doesn't exist
        res.send(task); // Respond with the deleted task
    } catch (error) {
        res.status(500).send('Failed to delete task'); // Handle errors
    }
});

// Partially update a task (PATCH request)
app.patch('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { title, status } = req.body;

    try {
        // Find the task by ID
        const task = await Task.findById(id);
        if (!task) return res.status(404).send('Task not found');

        // Only update fields that are present in the request body
        if (title !== undefined) task.title = title;
        if (status !== undefined) task.status = status;

        await task.save(); // Save the partially updated task
        res.send(task); // Respond with the updated task
    } catch (error) {
        res.status(500).send('Failed to update task'); // Handle errors
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
