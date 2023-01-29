const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registerController = async (req, res) => {

    try {
        const { username, email, password } = req.body

        const isUserExists = await User.findOne({ email })

        if (isUserExists) return res.status(400).send({ msg: "EMAIL_ALREADY_EXISTS" })

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        await newUser.save()

        res.send({msg: "USER_REGISTER_SUCCEESS", newUser})

        
    } catch (error) {
        res.status(500).send({msg: "ERROR_REGISTER_USER"})
    }

}

const loginController = async (req, res) => {
    
    try {
        
        const { email, password } = req.body

        const isUserExists = await User.findOne({email})

        if(!isUserExists) return res.status(400).send({msg: "USER_NOT_FOUND"})

        const validPassword = await bcrypt.compare(password, isUserExists.password)

        if (!validPassword) return res.status(400).send({msg: "PASSWORD_INCORRECT"})

        const payload = {
            id: isUserExists._id,
            username: isUserExists.username
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1d'})

        return res.status(200).send({
            msg: "LOGIN_SUCCESS",
            token,
            isUserExists
        })


    } catch (error) {
        res.status(500).send({msg: "ERROR_LOGIN_USER"})
    }
}

module.exports = { registerController, loginController}