import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide name"],
        minLength: 3,
        maxLength: 20,
        trim: true
    },

    email: {
        type: String,
        required: [true, "Please provide email"],
        validate: {
            validator: validator.isEmail,
            message: "Please provide a valid email"
        },
        unique: true,

        // validation
        // match: [
        //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        //     "Please provide a valid email",
        // ],
    },

    password: {
        type: String,
        required: [true, "Please provide password"],
        minLength: 6,
    },

    lastName: {
        type: String,
        trim: true,
        minLength: 3,
        maxLength: 20,
        default: 'lastName'
    },

    location: {
        type: String,
        trim: true,
        maxLength: 20,
        default: 'my city'
    },

})

// Mongoose middleware
// doing something before saving on db
UserSchema.pre("save", async function () {
    const saltRounds = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, saltRounds)
})

export default mongoose.model('User', UserSchema)