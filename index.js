let pg = require('pg');
if (process.env.DATABASE_URL) {
  pg.defaults.ssl = true;
}

let connString = process.env.DATABASE_URL || 'postgresql://ta:password@localhost:5432/messages';
const { Pool } = require('pg');

// console.log(connString);
const pool = new Pool({
  connectionString : connString
});


var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(){
	console.log("slashhhhh");

});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

//conversation.addConversation
app.post('/addConversation', function addConversation(request, response) {
	
	var name = request.body.name;
	var user = request.body.user;
	console.log("added a conversation with the name " + name);
	if(name){
		pool.query('INSERT INTO conversation("name", "users") VALUES ($1, $2)', [name, user] );
	}
} );

