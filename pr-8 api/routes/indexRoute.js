const express = require('express');

const routes = express.Router();

routes.use('/',require('./authRoute'))

routes.use('/user',require('./userRoute'))
routes.use('/blog',require('./postRoute'))
routes.use('/comment',require('./commentRoute'))


module.exports = routes;