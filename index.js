const express = require('express');
const sequelize = require('./utils/db')
const sessions = require('express-session')

const User = require('./models/user')
User.sync()

const app = express();

app.use(sessions({
    secret: "thisismysecretkey",
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 24 hours
    resave: false
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const usersRoutes = require('./routes/users')

app.use('/users', usersRoutes)

app.listen(3012, () => {
    console.log('Server is connected')
})