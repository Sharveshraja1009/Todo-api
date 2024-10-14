const mongoose = require('mongoose');
const readline = require('readline');

// Setup readline to take user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/todoDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to MongoDB");
    getUserInput(); // Start taking user input
})
.catch((err) => console.error("Could not connect to MongoDB", err));

// Define the Task schema
const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    status: { type: Boolean, default: false },
});

// Create the Task model
const Task = mongoose.model('Task', taskSchema);

// Function to get user input
const getUserInput = () => {
    rl.question('Enter task title: ', (title) => {
        rl.question('Is the task completed? (yes/no): ', async (statusInput) => {
            const status = statusInput.toLowerCase() === 'yes'; // Convert user input to boolean
            await addTask({ title, status });
            rl.question('Do you want to add another task? (yes/no): ', (answer) => {
                if (answer.toLowerCase() === 'yes') {
                    getUserInput(); // Recursively ask for more tasks
                } else {
                    rl.close(); // Close the readline interface
                    mongoose.connection.close(); // Close the MongoDB connection
                    console.log("Database connection closed.");
                }
            });
        });
    });
};

// Function to add the task to the database
const addTask = async (taskData) => {
    try {
        const task = new Task(taskData);
        await task.save();
        console.log(`Task "${task.title}" added to the database with status: ${task.status ? 'Completed' : 'Not Completed'}`);
    } catch (error) {
        console.error("Error adding the task:", error);
    }
};
