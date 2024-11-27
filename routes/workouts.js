let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let workoutModel = require('../models/workouts') // connect to database model 


router.get('/', async(req,res,next)=>{
    try{
        const BookList = await workoutModel.find();
        res.render('workout/workoutList',{
            title:'My Workouts',
            BookList:BookList   // pass data to view
        })
    }
    catch(err){
        console.error(err)
        res.render('workout/workoutList',{
            error:'Error on server'})
    }
})

// render Add New Workout Form 
router.get('/add',async(req,res,next)=>{
    try{
        res.render('workout/add',{
            title: 'Add New Workout'
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('workout/workoutList',{
            error:'Error on the server'
        })
    }
});
// route to process creating a new working 
router.post('/add',async(req,res,next)=>{
    try{
        let newWorkout = workoutModel({
            "workout":req.body.workout,
            "time":req.body.time,
            "repetitions":req.body.repetitions,
            "sets":req.body.sets,
            "intensity":req.body.intensity
        });
        workoutModel.create(newWorkout).then(()=>{
            res.redirect('/workouts');
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('/workouts',{
            error:'Error on the server'
        })
    }
});

// render Add New Workout Form
router.get('/edit/:id',async(req,res,next)=>{
    try{
        const id = req.params.id;   // get workout ID from URI 
        const workoutToEdit = await workoutModel.findById(id);  // find the instance of the object with it's ID 
        res.render('workout/edit',
            {
                title:'Edit Workout',
                workoutModel:workoutToEdit
            }
        )
    }
    catch(err)
    {
        console.error(err);
        next(err);
    }
});
router.post('/edit/:id',async(req,res,next)=>{
    try{
        let id = req.params.id;         // get workout ID from URI 
        let updatedWorkout = {
            "workout":req.body.workout,
            "time":req.body.time,
            "repetitions":req.body.repetitions,
            "sets":req.body.sets,
            "intensity":req.body.intensity
        };
        await workoutModel.findByIdAndUpdate(id, updatedWorkout).then(()=>{
            res.redirect('/workouts')                                           // after updating, redirects to table containing workout data 
        })
    }
    catch(err){
        console.error(err);
        res.render('/workouts',{
            error:'Error on the server'
        })
    }
});

router.get('/delete/:id',async(req,res,next)=>{
    try{
        let id= req.params.id;                          // get workout ID from URI 
        workoutModel.deleteOne({_id:id}).then(()=>{
            res.redirect('/workouts')                   // deletes selected workout, redirects to table containing workout data
        })
    }
    catch(err){
        console.error(err);
        res.render('error',{
            title:'Error',
            error:'Error on the server'
        })
    }
});

module.exports = router;