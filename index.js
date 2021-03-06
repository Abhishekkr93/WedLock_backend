const express = require('express');
const mongoose = require('mongoose');
const User = require('./model/User')
const bodyParser = require('body-parser')
require('dotenv').config()

// mongodb setup
const dbURI = process.env.DB_URL;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => console.log('connected to db'))
  .catch(err => console.log(err));

// server and static file setup
const app= express();
const port = process.env.PORT || 5000
app.use(bodyParser.urlencoded({extended: true}));

app.get('/',(req,res)=>{
  res.send("hello boy")
})

app.post('/',(req,res)=>{
  console.log(req.body)
  const user = new User({
    name : req.body.name,
    coming : req.body.coming
  })
  user.save()
  .then(newuser =>{
    res.redirect('http://wedlock.netlify.app/thanks.html')
  })
  .catch(err => res.send(err))
})


app.listen(port, console.log(`app is running on port ${port}, go to http://localhost:${port}`))