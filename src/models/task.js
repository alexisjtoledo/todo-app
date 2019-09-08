// Imports
const mongoose = require('mongoose');
const {Schema} = require('mongoose');

// Modeling 
const TaskSchema = new Schema({
    title: {type: String, required:true},
    description: {type: String, required:true},
});

// Exports
module.exports = mongoose.model('Task', TaskSchema);