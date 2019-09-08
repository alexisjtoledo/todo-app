// Imports
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const routes = require('./routes/task.routes');
const {mongoose} = require('./database');

// Creating the server
const app = express();

// Settings
app.set('port', process.env.PORT || 3000); // Server port

// Middlewares
app.use(morgan('dev'));  // To check my requests
app.use(express.json()); // To check if the data is JSON and convert it

// Routes
app.use('/api/tasks', routes);

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});