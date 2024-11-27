let mongoose = require('mongoose');

// create a book model 
let workoutModel = mongoose.Schema({
    workout: String,
    time: String,
    repetitions: Number,
    sets: Number,
    intensity: String           // types from collection 
    },
    {
        collection: "workouts"  //collection name
    }

);

module.exports = mongoose.model('Book', workoutModel);

