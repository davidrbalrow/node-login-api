const express = require('express');
const userRouter = express.Router();
const _ = require('lodash');
var {mongoose} = require('../db/mongoose');
var {authenticate} = require('../middleware/authenticate');

const {User} = require('../models/user');

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