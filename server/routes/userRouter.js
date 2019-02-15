const express = require('express');
const userRouter = express.Router();
const _ = require('lodash');
var {mongoose} = require('../db/mongoose');
var {authenticate} = require('../middleware/authenticate');

const {User} = require('../models/user');

userRouter.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3001");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Expose-Headers", "x-auth");
    //  res.header("Content-Type : text/plain");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Credentials', 'true');
    
    if ('OPTIONS' == req.method) {
        //res.send(200);
        res.header("Access-Control-Allow-Origin", "http://localhost:3001").sendStatus(200);
      }
      else {
        next();
      }
  });


userRouter.post('/', (req,res) => {
    const body = _.pick(req.body,['email','password']);
    
    var user = new User (body);

    user.save().then(()=>{
        return user.generateAuthToken();
    }).then((token)=>{
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });

});

userRouter.get('/me',authenticate,(req, res) => {
    res.send(req.user);
});

userRouter.post('/login',  async (req, res) =>{
    try{
        const body = _.pick(req.body, ['email', 'password']);
        const user = await User.findByCredentials(body.email, body.password);
        const token = await user.generateAuthToken();
        res.header('x-auth', token).send(user);
      } catch (e){
        res.status(400).send();
      }
      });

userRouter.delete('/logout/token', authenticate, async (req,res) => {
        try{
        console.log('logout toiken',req.token);
        await req.user.removeToken(req.token);
        res.status(200).send();
      } catch(e){
          res.status(400).send();
      }
      });


module.exports={userRouter};