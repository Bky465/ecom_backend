const userModel = require('../models/users')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const SECRET_KEY = 'notesapi'
const signup = async (req, res) => {

    // existing user check
    //hashed password 
    //user creation
    //token generate

    const { userName, email, password } = req.body
    try {
        // existing user check
        const existingUser = await userModel.findOne({ email: email })
        if (existingUser) {
            return res.status(400).json({ message: "usere already exist" })
        }
        //hashed password 
        const hashedPassword = await bcrypt.hash(password, 10)

        //user creation
        const result = await userModel.create({
            userName: userName,
            email: email,
            password: hashedPassword
        })

        // generate token
        const token = jsonwebtoken.sign({ email: result.email, id: result._id }, SECRET_KEY)

        // sending response
        res.status(201).json({ user: result, token: token })


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong" })
    }
}


//signin 
const signin = async (req, res) => {
    const { email, password } = req.body

    try {
        const existingUser = await userModel.findOne({ email: email });
        if (!existingUser) {
            return res.status(404).json({ message: "user not found" })
        }
        const matchPassword = await bcrypt.compare(password, existingUser.password)
        if (!matchPassword) {
            return res.status(404).json({ message: "invalid credential" })
        }

        // generate token
        const token = jsonwebtoken.sign({ email: existingUser.email, id: existingUser._id }, SECRET_KEY)
        res.status(201).json({ user: existingUser, token: token })

    }

    catch (error) {
        console.log(error);
        res.json({ message: "something went wrong" })
    }
}
module.exports = { signup, signin }
