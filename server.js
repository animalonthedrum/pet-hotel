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

app.post('/owner', function(req,res){
  console.log('I like pets:', req.body);
  res.sendStatus(200);
} );// end post
