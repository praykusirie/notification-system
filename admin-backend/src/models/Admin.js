// import { Schema, model } from 'mongoose'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const adminSchema = new Schema({
    fname: {
        type: String,
        required: {true: 'please add ur full name'},
        min: 1
    },
    department: {
        type: String,
        required: {true: 'please add your department'}
    },
    email: {
        type: String,
        required: {true: 'please add your email'},
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: [6, 'Password should contain atleast 8 characters']
        
    }
}, {
    timestamps: true
})



//  this will be fired when we register,save,change or modify the password
adminSchema.pre('save', async function (next) {

    if(!this.isModified('password')) {
        return next()
    }

    const salt = bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, parseInt(salt))
    this.password = hashedPassword
    next()
})

// verify password
adminSchema.methods.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}


module.exports = mongoose.model('Admin', adminSchema)