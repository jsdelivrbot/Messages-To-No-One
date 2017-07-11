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

function addConversation(request, response) {
	
	var name = request.body.name;
	var user = request.body.user;
	console.log("added a conversation with the name " + name);
	if(name){
		pool.query('INSERT INTO conversation("name", "users") VALUES ($1, $2)', [name, user] );
	}
}

module.exports = {
	addConversation: addConversation
};