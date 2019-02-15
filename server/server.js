const express = require('express');
const bodyParser = require('body-parser');

const {userRouter} = require('./routes/userRouter');

const port = process.env.PORT || 3000;

var app = express();
app.use(bodyParser.json());


app.use('/user', userRouter);

app.listen(port, () =>{
    console.log(`Started on port ${port}`)
});
