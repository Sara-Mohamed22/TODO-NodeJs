

module.exports.authenticate = async( req, res )=>{

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

        }
