const   express = require('express')
        app     = express(),
        fs      = require('fs'),
        mongoose = require('mongoose'),
        lineReader = require('line-reader'),
        sleep = require('./helpers/sleep'),
        tuple = require('./schema/tuple');

require('./helpers/dbconnect')
        
let start_timestamp, contineRead= new Boolean();

app.get('/read', (req, res)=>{
  let flag = 0, buffer=[], filename = 'task.csv';
  contineRead = true;  

  lineReader.eachLine('task.csv',async(line,last,cb)=>{
        if(flag==0){                            // first line of csv file
            cb() 
            flag = 1;
        }
        else if(line){                          // line == defined
            let timestamp = Date.now()
            if(flag==1){                        // first data to be inserted
                start_timestamp = timestamp; 
                flag = 2;
            }

            let temp = line.split(',')
            let data = {name: temp[0], surname: temp[1], age: temp[2], gender: temp[3], timestamp: timestamp}

            buffer.push(data)
            
            if(buffer.length%1000==0||last){
                tuple.insertMany(buffer)
                        .then((data)=>{
                            console.log(data.length)
                            buffer.splice(0,buffer.length)
                            if(last)
                              res.send({status: 'data insertion complete'})
                            cb();
                        })
                        .catch((err)=>{
                            console.log(err)
                            buffer.splice(0,buffer.length)
                            res.send({status: 'error'})
                            cb();
                        })
            }else{
                while(!contineRead){
                    await sleep(3000)
                }
                cb()
            }
        }
  })
})



app.get('/pause', (req, res)=>{

    contineRead = false;
    res.send({status: 'paused'})

})



app.get('/resume', (req, res)=>{

  contineRead = true;
  res.send({status: 'resumed'})

})

app.get('/terminate', (req, res)=>{

  contineRead = false;

  tuple.deleteMany({timestamp:{$gte: start_timestamp}})
      .then((data)=>{
        console.log(data)
        res.send({status: 'process terminated and inserted data deleted from db'})
      })
      .catch((err)=>{
        console.log(err)
        res.send({status: 'error while deleting inserted data'})
      })
  
})

app.listen(3000,()=>console.log("server started at port 3000"))