const express = require('express');
const sequelize = require('./utils/db')

const app = express();

app.use(express.json());

app.listen(3012, () => {
    console.log('Server is connected')
})