const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/loginsystem-cookie', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const database = mongoose.connection;

database.on('connected', () => {
    console.log('Database is connected');
});

database.on('error', (err) => {
    console.error('Database connection error:', err);
});

database.on('disconnected', () => {
    console.log('Database is disconnected');
});

module.exports = database;