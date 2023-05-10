
const { request } = require('express');
const Users = require('./../models/loginModel');
const jwt = require('jsonwebtoken');
const dotenv  =  require('dotenv').config({path : 'config.env'});
const emailValidator = require('validator');


module.exports.signUp = async(req, res )=> {

try
{
  
  if( emailValidator.isEmail( req.body.username  ) )

  {

    const userLogin = await Users.findOne({
      username :req.body.username ,
       password : req.body.password });


    if( userLogin  )
    {
 
     res.status(404).json(
       {
          status: "User found , SignUp with new User .." ,
       });
 
 
    }
 
    else
    {

     const user = await Users.create( req.body );
 
     /// create token 
     const token = jwt.sign( 
         {
           'data' : user 
         } ,
   
          process.env.SECRET ,
 
          {
            expiresIn : '3h' 
          } 
          );

          // var user = await Users.findOneAndUpdate( req.body , {'token' : token } );

   
      console.log(token + token ); 
   

      res.status(201).json(
       {
          status: 'user create successfully' ,
          data : user  , 
           token: token  
         
       });
 
 
    }
  }

  else
  {

    res.status(404).json(
      {
         status: "Enter valid email address " ,
      });
  }


  //  const userLogin = await Users.findOne({
  //    username :req.body.username ,
  //     password : req.body.password });

  
}

catch(e)
{

    res.status(402).json(
        {

          status : e.message ,
          data : "error in login , try again "  

        });

}

};





module.exports.signIn = async(req, res )=> {

  try
  {
    if( emailValidator.isEmail( req.body.username  ) )

     {
  
    /// check if user is logged in successfully

    let { username , password } = req.body ;
    var user = await Users.findOne({ username : username }).lean();


    if (!user) {
       res.status(404).send(
        {
          msg: " User not Found"
        })
    } 
    else 
    {
  
      // var validatePassword = await bcrypt.compare(  user.password , password  )
      if( user.password == password )
      {

        
    const token = jwt.sign( 
      {
        'data' : user 
      } ,

       process.env.SECRET ,

       {
         expiresIn : '3h' 
       } 
       );

      //  var user = await Users.findOneAndUpdate( req.body , {'token' : token } );



        res.status(201).send({
          msg: "login successfully" ,
          data :  user  ,
          token : token 

      });


      //  req.headers('Authorization', 'Bearer ' + token);

      
      } 
      else
      {
        res.status(400).send({
          msg: "Invalid Password , please try again"
     });

      } 

   
    }


}


else
{
    res.status(404).json(
      {
         status: "Enter valid email address " ,
      });
  
}


}
  
  /* 
   /// verify with token  
   const authHeader = req.headers.authorization ;
    const token = `${authHeader}`.trim().split('Bearer ')[1];

    const  decode  = jwt.verify(
      token ,
      process.env.SECRET

       );

     console.log( 'decodddddde ' + decode ); 

    if(token)
    {

   res.status(201).json(
   {
      status: 'login successful' ,
      data : decode ,  
       token: token ,
   });

    }
    else
    {
      res.status(201).json(
        {
           status: 'fail ' ,
            data: decode
        });
     

    }
    */

  
  catch(e)
   {
      res.status(402).json(
          {
  
            status : e.message ,
            data : "error in login ,please try again "  
  
          });
   }
  
  };




  module.exports.logOut = async(req, res )=> {

    try
    {
      if( emailValidator.isEmail( req.body.username  ) )
  
       {
    
      /// check if user is logged in successfully
  
      let { username , password } = req.body ;
      var user = await Users.findOne({ username : username }).lean();
  
  
      if (!user) {
         res.status(404).send(
          {
            msg: " User not Found"
          })
      } 
      else 
      {
    
        // var validatePassword = await bcrypt.compare(  user.password , password  )
        if( user.password == password )
        {
  

          const authHeader = 
          req.body.token || 
          req.query.token || 
          req.headers['x-access-token'] || 
          req.headers['authorization'] ;

          const token = `${authHeader}`.trim().split('Bearer ')[1]; 
          

          if(token)
          {

         
            //  console.log('777777 '+ ff );

            res.status(200).json(
              {
                'status': 'success',
                'data': 'logOut successfully...'
              }
            );

          }
          
          else
          {

            res.status(401).json({
              'msg': 'login Required' 
            });

          }
  
  
  
      
        
        } 
        else
        {
          res.status(400).send({
            msg: "Invalid Password , please try again"
       });
  
        } 
  
     
      }
  
  
  }
  
  
  else
  {
      res.status(404).json(
        {
           status: "Enter valid email address " ,
        });
    
  }
  
  
  }
    
    
  
    
    catch(e)
     {
        res.status(402).json(
            {
    
              status : e.message ,
              data : "error in login ,please try again "  
    
            });
     }
    
    };
 

 




  

  
