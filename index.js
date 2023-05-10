
const express = require('express');
const app = express();
var cors = require('cors')
 const dotenv  =  require('dotenv').config({path : 'config.env'});
 const mongoose = require('mongoose');
 const loginRoute = require('./routes/loginRoute');
 var bodyParser = require('body-parser');
 var hbs = require('express-hbs'); 
 var cookieParser = require('cookie-parser');
 const ToDoRoute = require('./routes/toDoRoute');




// Midelware 
app.use(cors());
 app.use(bodyParser.urlencoded({ extended: false }));
 app.use(bodyParser.json());
 app.use(cookieParser());
 

 
 // use engine 
 app.set('view engine', 'hbs');
 


 app.use('/api/v1' , loginRoute );
 app.use('/api/v1' , ToDoRoute  )


 




app.listen( process.env.PORT || 8080  , async ()=>{

    console.log('listen to port 3000...') ;

   await mongoose.connect(process.env.DB_URL )
    .then((data) => 

    console.log(`connect to DB ${data.connection.host}`)
    );


});





