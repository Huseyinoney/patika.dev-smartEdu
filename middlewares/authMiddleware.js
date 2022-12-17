const User = require('../models/User');

exports.loginMiddleware = async (req,res,next) => {
    
    //console.log(req.session.user)
    const user = await User.findById(req.session.user);
    if( !user ) {
        return res.redirect('/login');
    }
    else{
        next();
    }   
        
};