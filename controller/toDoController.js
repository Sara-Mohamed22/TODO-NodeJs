
const TODO = require('.././models/toDoModel'); 
const User = require('.././models/loginModel');
const jwt = require('jsonwebtoken');

const SUBNOTE = require('../models/subNoteModel');


module.exports.createToDo  = 

async( req, res)=>{

    try
    {

        const authHeader =
              req.body.token ||
              req.query.token ||
              req.headers['x-access-token'] || 
              req.headers['authorization'] ;

        const token = `${authHeader}`.trim().split('Bearer ')[1];
       

        // console.log( 'tokkkkkkken ' + token ); 
    
        const  decode  = jwt.verify(
          token ,
          process.env.SECRET
    
           );
    

  
       if(token)
        {

             const user = await User.findById( decode.data._id )

             console.log('gggggg ' + user.username ); 

            const todo =  await TODO.create( {
               'title' : req.body.title ,
               'status' : req.body.status  ,
                'description' : req.body.description,
                'userID' : user._id ,
            } );
    
            res.status(201).json(
                {
                 'status' : 'create successfully' ,
                  'data' : todo 
                });
    
    
    
        }
        else
        {

          res.status(201).json(
            {
               status: 'fail ' ,
            });
         
    
        }
        

      
    }

    catch(e)
    {
        res.status(404).json(
            {
              'errorx' : e.message 
            });

    }
 
};



module.exports.getAllNotes = async(req,res)=>{
  
  try
  {

    const authHeader =
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'] || 
    req.headers['authorization'] ;

    const token = `${authHeader}`.trim().split('Bearer ')[1];

    if(token)
    {
      const allNotes = await TODO.find({});


      res.status(404).json({

       'status': 'success' ,
       'length' : allNotes.length ,
       'data': allNotes  

     });

    }
    else
    {
      res.status(401).json({
        'status': 'login required ' ,
      });
    }
    
     

  }

  catch(e)
  {
    res.status(404).json({
      'status': 'fail' ,
      'msg': e.message
    });
  }
};





module.exports.getNoteById = async(req,res)=>{

  try
  {



    const authHeader =
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'] || 
    req.headers['authorization'] ;

    const token = `${authHeader}`.trim().split('Bearer ')[1];

    const  decode  = jwt.verify(
      token ,
      process.env.SECRET

       );

    if(token)
    {

      const note = await TODO.find({'userID': decode.data._id });


      // console.log('kkkkk ' +note);

       res.status(200).json({
        'status': 'success' ,
        'length': note.length ,
        'data': note ,

       });

    }
    else
    {
      res.status(401).json(
        {
          'msg' : 'login required' ,
       });
    }

  }
  catch(e)
  {
    res.status(404).json(
      {
        'status' : 'fail' ,
        'msg': e.message
     });
  }
};





module.exports.addSubNotes = async(req , res)=>{

  try
  {

    const authHeader =
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'] || 
    req.headers['authorization'] ;

    const token = `${authHeader}`.trim().split('Bearer ')[1];

    if(token)
    {

      const subNotes = await SUBNOTE.create(  {
        
           'title' : req.body.title ,
           'status' : req.body.status  ,
           'description' : req.body.description ,
            'parentNoteID' : req.params.id ,

            
          } );

      res.status(201).json({
        'status': 'success' ,
        'data': subNotes  ,

      });


    }
    else
    {

      res.status(401).json({
        'msg': 'please login'
      });

    }

   
  }
  catch(e)
  {

    res.status(400).json({
      'status': 'fail' ,
      'msg': e.message
    });
  }
};





module.exports.getAllSubNotes = async(req,res)=>{
  
  try
  {

    const authHeader =
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'] || 
    req.headers['authorization'] ;

    const token = `${authHeader}`.trim().split('Bearer ')[1];

    if(token)
    {
      const allSubNotes = await SUBNOTE.find({});

      res.status(404).json({

       'status': 'success' ,
       'length' : allSubNotes.length ,
       'data': allSubNotes  

     });

    }
    else
    {
      res.status(401).json({
        'status': 'login required ' ,
      });
    }
    
     

  }

  catch(e)
  {
    res.status(404).json({
      'status': 'fail' ,
      'msg': e.message
    });
  }
};





module.exports.getSubNote = async(req,res)=>{

  try
  {

    const authHeader = 
    req.body.token || 
    req.query.token || 
    req.headers['x-access-token'] || 
    req.headers['authorization'] ;

    const token = `${authHeader}`.trim().split('Bearer ')[1]; 

    const  decode  = jwt.verify(
      token ,
      process.env.SECRET

       );

    if(token)
    {

     const paraNote = await TODO.findById( req.params.id ); 
     console.log('******** ' +paraNote.userID );
     console.log('********2 ' + decode.data._id );

      if( paraNote.userID == decode.data._id )
      {

        const subNote = await SUBNOTE.find({ 'parentNoteID' : req.params.id });
      // const subNote = await SUBNOTE.find({ 'parentNoteID' : req.query.id });

      res.status(200).json(
        {
          'status': 'success',
          'length': subNote.length , 
          'data': subNote
        }
      )


      }
      else
      {

        res.status(200).json(
          {
            'status': 'success',
            'data': 'Not Found SubNotes for user '
          }
        )

      }

      
     
    }
    else
    {

      res.status(401).json({
        'msg': 'login Required' 
      });

    }

  }
  catch(e)
  {
    res.status(404).json({
      'msg': e.message
    });
  }
};





