const { Schema, model } = require("mongoose");



const userSchema = new Schema({
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true }
},
    {
        timestamps: true
    }
)

module.exports = model('User', userSchema)