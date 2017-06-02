//requires

var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');
//globals
var port = 8080;
var config = {
  database: 'pet_hotel',
  host: 'localhost',
  port: 5432,
  max: 30
}; // end config obj

var pool = new pg.Pool(config);

//uses
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

//spin up server
app.listen(port, function() {
  console.log('server is up on port:', port);
});
//base url
app.get('/', function(req, res) {
  console.log('in base url');
  res.sendFile(path.resolve('views/index.html'));
}); //end base url

app.get('/owner', function(req, res) {
  console.log('drop down');
  pool.connect(function(err, connection, done) {
    if (err) {
      console.log('error');
      done();
      res.send(400);
    } else {
      console.log('connected to db');
      var allOwners = [];
      var resultSet = connection.query('SELECT * FROM pet_table');
      resultSet.on('row', function(row) {
        allOwners.push(row);
      }); //end resultSet
      resultSet.on('end', function() {
        done();
        res.send(allOwners);
      }); //end end resultSet

    }
  }); //done pool get
}); //end get



app.post('/owner', function(req, res) {
  console.log('I like pets:', req.body);
  pool.connect(function(err, connection, done) {
    if (err) {
      console.log('error');
      done();
      res.send(400);
    } else {
      console.log('connected to database');
      connection.query("INSERT INTO pet_table(Owner) values ($1)", [req.body.name]);
      done();
      res.send(200);
    } //end else
  }); //end pool connect
}); // end post
app.post('/pet', function(req, res) {
  console.log('I like pets2:', req.body);
  pool.connect(function(err, connection, done) {
    if (err) {
      console.log('error');
      done();
      res.send(400);
    } else {
      console.log('connected');
      connection.query("UPDATE pet_table SET pet = $1, color = $2, breed = $3 WHERE owner= $4", [req.body.name, req.body.color, req.body.breed, req.body.owner]);
      done();
      res.send(200);
    } //end else
  }); //end pool connect

}); //end post


app.put('/pet/:id', function(req, res) {
  console.log(req.body);
  res.send('poop');
}); //end put

app.delete('/pet', function(req, res) {
  console.log('pet delete');
  pool.connect(function(err, connection, done) {
    if (err) {
      console.log('error');
      done();
      res.send(400);
    } else {
      console.log('connected to database', req.body);
      connection.query('DELETE FROM pet_table WHERE +id=' + req.body.id);
      done();
      res.send(200);
    } //end else
  }); //end pool connect

});
