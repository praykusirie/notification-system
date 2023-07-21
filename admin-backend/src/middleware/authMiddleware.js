const expressAsyncHandler = require('express-async-handler')
const Admin = require('../models/Admin') 
const jwt = require('jsonwebtoken')



const protect = expressAsyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies.token
        if(!token) {
            res.status(401)
            throw new Error('Not authorized please login')
        }

        // verify token
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        //get the user id from the token
       const user = await Admin.findById(verified.id).select('-password')

        if(!user) {
            res.status(401)
            throw new Error('Admin not found')
        }

        req.user = user
        next()
    } catch (error) {
        res.status(401)
        throw new Error('Not authorized please login')
    }
})


module.exports = protect