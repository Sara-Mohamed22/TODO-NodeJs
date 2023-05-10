
const mongoose = require('mongoose');


const loginModel = mongoose.Schema({

     username : 
     {
       type : String , 
       required : true ,
       trim : true ,
       unique : true

     },

    
     password : 
      {
        type : String ,
        required : true ,
        true : true ,
        minLength: [6 , 'password at least 6 characters'] ,

      } ,

    // token : {}   
}, 


 
{
    timestamps : true ,
}

);


module.exports = mongoose.model('Users' , loginModel ) ;
