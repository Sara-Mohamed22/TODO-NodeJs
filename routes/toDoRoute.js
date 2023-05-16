
const express = require('express'); 

const route  = express.Router() ;
const TODO = require('.././controller/toDoController');

// const Utility = require('../utility');



route.post('/create' , TODO.createToDo );
route.get('/allNotes' , TODO.getAllNotes );
route.get('/note' , TODO.getNoteById );
route.post('/note/:id/subNotes' , TODO.addSubNotes );
route.get('/allSubNotes' , TODO.getAllSubNotes );
route.get('/subNote/:id' , TODO.getSubNote );
// route.get('/subNote' , TODO.getSubNote );

route.put('/editNote/:id' , TODO.editToDo );
route.delete('/removeNote/:id' , TODO.removeToDo );




module.exports = route ; 


