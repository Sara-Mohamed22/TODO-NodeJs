
const mongoose = require('mongoose');




const ToDoModel =  mongoose.Schema({

    userID :
     {
       type: mongoose.Schema.Types.ObjectId ,

      },


    title : 
    {
     type : String ,
     required : true ,
     trim : true ,
     minLength: [3 , 'too Short title']

    },
    

    status :
    {
        type : String ,
        required : true ,
        trim : true ,
        default: 'start'

    },


    description :
    {
        type:String ,
        required : true ,
        trim: true ,
        // minLength : [20 , 'Too short description' ]

    } ,

    startTime:
     {

      type: Date ,
      required : true ,
      default: new Date()

     },

    endTime : 
    {

      type: Date ,
      required : true ,
      default: new Date()

    }


    

},);



  module.exports =  mongoose.model('TODOs' , ToDoModel );