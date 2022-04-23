var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var http = require('http').Server(app);

var fs = require('fs');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))


// read from file to user
app.get('/inmsg', async (req, res) => {
  // fs.readFile('log.json', (err, data) => {
  //   console.log(JSON.parse(data));
  //     if(err) { console.log(err);
  //     }else{
  //         res.json(JSON.parse(data));
  //     }
  // })
  const data = await readMsg();
  res.json(JSON.parse(data));
})

//from user, write data to file
app.post('/outmsg', async (req, res) => {
      // console.log(req.body);
      // readMsg().then(updateMsg).then(writeMsg).then((msg) => {
      //   console.log(msg);
      //   res.json(JSON.parse(msg));
      // })

  //  })
    const data = await readMsg();
    const data_new = await updateMsg(req.body,data);
    await writeMsg(data_new);
    res.json(JSON.parse(data_new));
})

const readMsg = () => {
  return new Promise((resolve,reject) => {
      fs.readFile('log.json', (err, data) => {
        console.log(JSON.parse(data));
          if(err) {
              reject(err);
          }else{
              resolve(data);
          }
      })
  })
} 

const updateMsg = (new_msg, data1) => {
  return new Promise((resolve,reject) => { 
      data1 = JSON.parse(data1);
      data1.dataMsg.push(new_msg);
      console.log(data1);
      resolve(JSON.stringify(data1));
  });
}

const writeMsg = (data) => {
  return new Promise((resolve,reject) => {
    fs.writeFile("log.json",data,(err,res) => 
      {
        if(err) reject(err);
        else resolve(data);
      });
})};

var server = http.listen(3001, () => {
  console.log('server is running on port http://localhost:'+ server.address().port);
});