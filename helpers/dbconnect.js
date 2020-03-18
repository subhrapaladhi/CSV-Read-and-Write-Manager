const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo:27017/task',{useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection
      .once('open', ()=>console.log('connected to db'))
      .on('error',(error)=>console.log('connection to database failed'))