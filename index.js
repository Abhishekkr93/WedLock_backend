const express = require('express');
const mongoose = require('mongoose');
const User = require('./model/User')
require('dotenv').config()

// mongodb setup
const dbURI = process.env.DB_URL;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => console.log('connected to db'))
  .catch(err => console.log(err));

// server and static file setup
const app= express();
const port = process.env.PORT || 5000
app.use(express.json())

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
    res.send(newuser)
  })
  .catch(err => res.send(err))
})


app.listen(port, console.log(`app is running on port ${port}, go to http://localhost:${port}`))