const expressAsyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')
const User = require('../models/User')
const axios = require('axios')

const generateToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, { expiresIn: '1d' })
}


//registering new user
 const signUp = expressAsyncHandler( async (req, res) => {

        // saving the new user
        const { fname, department, email, password } = req.body

        // validation
        const userExist = await Admin.findOne({email})
        if(userExist) {
            res.status(400)
            throw new Error('Email already exists')
        }

        
        // create new user
        const user = await Admin.create({
            fname,
            department,
            email,
            password
        })
        
        // generate token
        const token = generateToken(user._id)

        // send http-only cookie
        res.cookie('token', token, {
            path: '/',
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400), //this is same as one day
            sameSite: 'none',
            secure: true
        })

        // saving new user to the mongodb
        const savedUser = await user.save()
        res.status(200).json(savedUser)
    
    
})


// login user
const signIn = expressAsyncHandler( async (req, res) => {
    
        const { email, password } = req.body

        // check if user exists
        const user = await Admin.findOne({email})

        if(!user) {
            res.status(404)
            throw new Error('No user founded, please signup')
        } 
        
        // check if password is correct
        const isPasswordCorrect = await user.validatePassword(password)
        if(!isPasswordCorrect) {
            res.status(404)
            throw new Error('Email or password is not correct')
        } 


         // generate token
         const token = generateToken(user._id)

         // send http-only cookie
         res.cookie('token', token, {
             path: '/',
             httpOnly: true,
             expires: new Date(Date.now() + 1000 * 86400), //this is same as one day
             sameSite: 'none',
             secure: true
         })

        if(user && isPasswordCorrect) {
            res.status(200).json({
                _id: user._id,
                fname: user.fname,
                email: user.email
            })
        } else {
            res.status(400)
            throw new Error('Invalid email or password')
        }
    
        
})

const logout = expressAsyncHandler(async (req, res) => {
    res.cookie('token', '', {
        path: '/',
        httpOnly: true,
        expires: new Date(Date.now()), //this will expire the cookie at that moment
        sameSite: 'none',
        secure: true
    })
    return res.status(200).json({
        message: 'Loggout succesfully'
    })
})

const getUser = expressAsyncHandler(async (req, res) => {
    const user = await Admin.findById(req.user._id)

    if(user){

        const { _id, fname, department, email } = user
    
        res.status(200).json({
            _id,
            fname,
            department,
            email
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

const getStudent = expressAsyncHandler(async (req, res) => {

    // const students = await User.find({$and: [{level},{course}]}).select('-password')
    const students = await User.find().select('-password')
    if (students) {
        res.status(200).json(students)
    } else {
        res.status(400)
        throw new Error('That user doesnot exists')
    }

})


const sendMessage = expressAsyncHandler(async (req,res) => {
    const { message, numbers, fname } = req.body
    
    if(!message || !numbers) {
        return res.status(400).json({
            message: 'message and numbers are required'
        })
    }

       numbers.map(number => {

           const data = JSON.stringify({
               "from": "N-SMS",
               "to": `${number}`,
               "text": `${message} : BY ${fname}`,
               "reference": "aswqetgcv"
             });
             
             const config = {
               method: 'post',
             maxBodyLength: Infinity,
               url: 'https://messaging-service.co.tz/api/sms/v1/text/single',
               headers: { 
                 'Authorization': process.env.SMS_AUTH, 
                 'Content-Type': 'application/json', 
                 'Accept': 'application/json'
               },
               data : data
             };
             
           
    
             axios(config)
             .then(function (response) {
               return res.status(200).json(response.data);
             })
             .catch(function (error) {
               console.log(error.message);
             })
       })
        
    

})

const deleteStudent = expressAsyncHandler( async (req,res) => {
    const { id } = req.body
    const deleteStudent = await User.findByIdAndDelete(id)
    res.status(200).json({
        message: 'Deleted succesfully'
    })
})


const addNewStudent = expressAsyncHandler(async (req,res) => {
     // saving the new user
     const { firstname, lastname, level, course, pnumber, email, password } = req.body

     if(!firstname || !lastname || !level || !course || !pnumber || !email || !password) {
        res.status(400)
        throw new Error('No data added')
    }

     const userExist = await User.findOne({pnumber})
        if(userExist) {
            res.status(400)
            throw new Error('User already exists')
        }

        
        // create new user
        const user = await User.create({
            firstname,
            lastname,
            level,
            course,
            pnumber,
            email,
            password
        })

        const savedUser = await user.save()
        res.status(200).json({
            message: 'User added succesfully'
        })

})

const getDeliveryReport = expressAsyncHandler(async (req,res) => {

    const data = '';

    const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://messaging-service.co.tz/api/sms/v1/logs',
    headers: { 
        'Authorization': process.env.SMS_AUTH, 
        'Accept': 'application/json'
    },
    data : data
    };

    axios(config)
    .then(function (response) {
      return res.status(200).json(response.data.results.length)
    })
    .catch(function (error) {
        return res.status(400).json(error.message)
    });
    })



module.exports = {
    signUp,
    signIn,
    logout,
    getUser,
    getStudent,
    sendMessage,
    deleteStudent,
    addNewStudent,
    getDeliveryReport
}