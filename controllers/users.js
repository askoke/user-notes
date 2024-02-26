const bcrypt = require('bcrypt')
const User = require('../models/user')

const register = async (req, res) => {
    console.log(req.body)
    const usernames = await User.findAll({ where: { username: req.body.username } })
    if (usernames.length > 0) {
        return res.status(500).json({ message: 'Username already exists!' })
    }

    const emails = await User.findAll({ where: { email: req.body.email } })
    if (emails.length > 0) {
        return res.status(500).json({ message: 'Email already registered!' })
    }
    
    if (req.body.password.length < 8) {
        return res.status(500).json({ message: 'Password must be 8 characters or longer!'})
    }   

    bcrypt.hash(req.body.password, 10, (error, cryptPassword) => {
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: cryptPassword
        })
        .then((registered) => {
            req.session.user = {
                username: registered.username,
                user_id: registered.id
            };
            console.log(req.session)
            res.json({
                message: 'New user is registered', 
                user: registered,
                user_session: req.session.user
            })
        })
    })
}   


module.exports = {register} 
