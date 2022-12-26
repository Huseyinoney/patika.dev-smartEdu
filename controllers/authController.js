const User = require('../models/User');
const Categories = require('../models/Category');
const bcrypt = require('bcrypt');
const Category = require('../models/Category');
const Course = require('../models/Course');
exports.createUser = async (req,res) => {
    try {
    const user =  await User.create(req.body);
 
        res.status(201).redirect('/login');
        
    
}   catch (error) {
    res.status(400).json({
        status:'fail',
        error,
    });

    }
   
};

exports.loginUser = async (req,res) => {
    try {
        const {email,password} = req.body;
        
        const user=await User.findOne({email});

            if(user) {
                
                bcrypt.compare(password,user.password,(err,same) => {
                    
                    if(same) {
                         req.session.user = user._id;
                        
                        res.status(200).redirect('/users/dashboard');
                        
                    }
                    else {
                        res.status(400).redirect('/login');
                        console.log("kullanıcı adı ve şifre hatalı")
                    }
                })
            }
            else {
                res.send("böyle bir kullanıcı yok");
            }
        
    }
    catch (error) {
        res.status(400).json({
            status :'fail',
            error
        });
    }
    }
 
exports.logOutUser = (req,res) => {
        req.session.destroy(()=> {
            res.redirect('/');
        });
    }

exports.getDashboardPage = async (req,res) => {
    const user = await User.findById(req.session.user).populate('courses')
    const categories = await Category.find();
    const courses  = await Course.find({user:req.session.user});
    res.status(200).render('dashboard',{
        page_name : 'dashboard',
        user,
        categories,
        courses
    })
}     
