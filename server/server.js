const express = require('express')

const app = express()
var cors = require('cors')

app.use(express.urlencoded({extended:true}))
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cors())


const customerRouter = require('./routes/customer')


app.use('/customer', customerRouter)


app.listen(3001)