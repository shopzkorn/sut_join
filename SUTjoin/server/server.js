var express = require('express');
var app = express();

var mysql = require('mysql');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
var con = mysql.createConnection({
 
    host:'localhost',
    user:'root',
    password:'', //empty for window
    database: 'sut_join'

});

var server = app.listen(1348, function(){
  var host = server.address().address
  var port = server.address().port
  console.log("start");

});

con.connect(function(error){
  if(error) console.log(error);
  else console.log("connected");
});

app.get('/user', function(req, res){
  con.query('select * from user', function(error, rows, fields){
        if(error) console.log(error);
        else{
            console.log(rows);
            res.send(rows);

        }

  });
});

app.get('/activity', function(req, res){
  con.query('select * from activity', function(error, rows, fields){
        if(error) console.log(error);
        else{
            console.log(rows);
            res.send(rows);

        }

  });
});

app.post('/addActivity', function(req, res){
  console.log(req.body); 
  let sql = "Insert into activity(id_host,date_start,date_end,title,description,number_people,min_age,max_age,location_name,type,gender) values (1,'"+req.body.datetimes+"','"+req.body.datetimes+"','"+req.body.title+"','"+req.body.description+"','"+req.body.number_people+"','"+req.body.minage+"','"+req.body.maxage+"','"+req.body.location+"','"+req.body.tag+"','"+req.body.gender+"')"
  con.query(sql, function(error, rows, fields){
    if(error) console.log(error);
    else{
        console.log(rows);
        res.send(rows);

    }

});
});