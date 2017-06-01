//requires

var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');
//globals
var port = 8080;
var config = {
  database:'pet_hotel',
  host: 'localhost',
  port: 5432,
  max: 30
}; // end config obj

var pool = new pg.Pool( config );

//uses
app.use(express.static( 'public' ) );
app.use(bodyParser.urlencoded( {extended: true} ) );

//spin up server
app.listen(port, function(){
  console.log('server is up on port:', port );
});
//base url
app.get('/', function(req,res){
  console.log('in base url');
  res.sendFile(path.resolve( 'views/index.html') );
});//end base url

app.get('/owner', function(req, res){
  console.log('drop down');
  pool.connect(function(err, connection, done){
    if(err){
      console.log('error');
      done();
      res.send(400);
    }else {
      console.log('connected to db');
      var allOwners = [];
      var resultSet = connection.query('SELECT * FROM pet_table');
      resultSet.on('row', function(row){
        allOwners.push(row);
      });//end resultSet
      resultSet.on('end', function(){
        done();
        res.send(allOwners);
      });//end end resultSet

    }
  });//done pool get
});//end get



app.post('/owner', function(req,res){
  console.log('I like pets:', req.body);
pool.connect(function(err, connection, done){
if(err){
  console.log('error');
  done();
  res.send(400);
}else {
  console.log('connected to database');
  connection.query("INSERT INTO pet_table(Owner) values ($1)", [req.body.name]);
  done();
  res.send(200);
}//end else
});//end pool connect
});// end post
