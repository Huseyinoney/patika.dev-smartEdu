const Course = require('../models/Course');
const Category = require('../models/Category');
const User = require('../models/User');

exports.createCourse = async (req,res) => {
    try {
    const course =  await Course.create({
        name:req.body.name,
        description: req.body.description,
        category: req.body.category,
        user: req.session.user
    });
        

    
        res.status(201).redirect('/courses');
}   catch (error) {
    res.status(400).json({
        status:'fail',
        error
    });

    }
   
};


exports.getAllCourse = async (req,res) => {
    try {
    const categorySlug = req.query.categories;
    const category = await Category.findOne({slug:categorySlug});

    let filter = {};

    if(categorySlug) {
        filter = {category:category._id};
    }
    
    const courses =  await Course.find(filter).sort('-createdAt');
    const categories = await Category.find();

        res.status(200).render('courses', {
            courses,
            categories,
            page_name:'courses',

        });
    
}   catch (error) {
    res.status(400).json({
        status:'fail',
        error
    });

    }
   
};

 exports.getCourse = async (req, res) => {
    try {
        const course = await Course.findOne( {slug:req.params.slug}).populate('user');
        const user = await User.findById(req.session.user);
        res.status(200).render('course-single' ,{
            course,
            page_name: "courses",
            user
        });
        
    } catch (error) {

        res.status(400).json({
            status:'fail',
            error,

        });
    }
};


exports.enrollCourse = async (req,res) => {
    try {
        const user = await User.findById(req.session.user);
        await user.courses.push({_id:req.body.course_id});
        await user.save();
        res.status(200).redirect('/users/dashboard');
    
    }
    catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
          });
    }
}


exports.releaseCourse = async (req,res) => {
    try {    
        const user = await User.findById(req.session.user);
        console.log(user)
        await user.courses.pull({_id:req.body.course_id});
        await user.save();
    
        res.status(200).redirect('/users/dashboard');
      } catch (error) {
        res.status(400).json({
          status: 'fail',
          error,
        });
      }
}
