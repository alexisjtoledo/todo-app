// Imports
const express = require('express');
const Task = require('../models/task');

// Defining the routes
const router = express.Router();

/* Rest API */

// READ
router.get('/', async (req, res) => {
    const tasks = await Task.find(); // Searching for all the documents of the DB.
    res.json(tasks); // Response.
});
router.get('/:id', async (req, res) => {
    const task = await Task.findById(req.params.id); // Searching for only one document from the DB (by ID).
    res.json(task); // Response.
});

// CREATE
router.post('/', async (req, res) => {
    const {title, description} = req.body; // Getting the data from the client.
    const task = new Task({title, description}); // Putting that data into the mongoose model.
    await task.save(); // Saving that object into the DB.
    res.json({status: 'Saved'}); // Response.
});

// UPDATE
router.put('/:id', async (req, res) => {
    const {title, description} = req.body; // Getting the data from the client.
    const newTask = {title, description}; // Creatign a new Task using the title and description that i've got from the client.
    await Task.findByIdAndUpdate(req.params.id, newTask); // I receive the Id from the parameters and the data from the form.
    res.json({status: 'Updated'}); // Response.
});

// DELETE
router.delete('/:id', async (req, res) => {
    await Task.findByIdAndRemove(req.params.id); // Deleting the document from its ID.
    res.json({status: 'Deleted'}); // Response.
});

// Export
module.exports = router;