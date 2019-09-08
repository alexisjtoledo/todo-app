// Imports
const mongoose = require('mongoose');

// Settings
const URI = 'mongodb://localhost/todo-app' // DB route

// Connecting to de mongoDB
mongoose.connect(URI, { useNewUrlParser: true })
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

module.exports = mongoose;