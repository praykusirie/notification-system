// import { Schema, model } from 'mongoose'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const userSchema = new Schema({
    firstname: {
        type: String,
        required: {true: 'please add ur first name'},
        min: 1
    },
    lastname: {
        type: String,
        required: {true: 'please add ur first name'},
        min: 1
    },
    pnumber: {
        type: Number,
        required: {true: 'please add ur email'},
        minLength: [10, 'Number should contain only 10 characters'],
        maxLength: [10, 'Number should contain only 10 characters'],
        unique: true,
        default: '+255'
    },
    level: {
        type: String,
        required: {true: 'please add level of study'}
    },
    course: {
        type: String,
        required: {true: 'please add your course'}
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
userSchema.pre('save', async function (next) {

    if(!this.isModified('password')) {
        return next()
    }

    const salt = bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, parseInt(salt))
    this.password = hashedPassword
    next()
})

// verify password
userSchema.methods.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}


module.exports = mongoose.model('User', userSchema)