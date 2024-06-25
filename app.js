const express = require('express');
const cors = require('cors');
const app = express();
const userController = require('./controllrs/userController');
const productsController = require('./controllrs/productsController');
const categoiesController = require('./controllrs/CategoryController');
app.use(express.json())
app.use(cors())
app.use('/', userController)
app.use('/', productsController)
app.use('/', categoiesController)

app.listen(4002, () => {
    console.log('listen to port 4002');
})




