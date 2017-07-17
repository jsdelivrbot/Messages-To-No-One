var config = {
	user: 'ta', //env var: PGUSER 
	database: 'messages', //env var: PGDATABASE 
	password: 'password', //env var: PGPASSWORD 
	host: 'localhost', // Server hosting the postgres database 
	port: 5432
}; 

const { Pool } = require('pg');

const pool = new Pool(config);
90
function addSection(request, response) {
	
	var conversation = request.body.conversation;
	var title = request.body.title;
	console.log("added a section with the title " + title +conversation);
	if(conversation){
		pool.query('INSERT INTO section("conversation", "title") VALUES ($1, $2)', [conversation, title] );
	}
}

function getSection(request, response){
	var id = request.params.id;
	response.type("json");
	console.log("The id of section is " + id);
	if(id){
		pool.query('SELECT title FROM section WHERE section_id = $1', [id], (err, res) =>{
			if (err){
				throw err;
			}
			console.log(res.rows[0]);
			response.write(JSON.stringify(res.rows[0]));
			response.end();
		} )
	}
}

function sectionTitles(request, response){
	var conversation = request.params.conversation;
	response.type("json");
	console.log("The id of the of conversation is " + conversation);
	if(conversation){
		pool.query('SELECT title, section_id FROM section WHERE conversation = $1', [conversation], (err, res) =>{
			if (err){
				throw err;
			}
			console.log(res.rows[0]);
			response.write(JSON.stringify(res.rows));
			response.end();
		} )
	}

}

function deleteSection(request, response){
	var id = request.params.id;

	console.log("The id of the section is " + id);

	if(id){
		pool.query('DELETE FROM section WHERE section_id = $1', [id], (err, res) =>{
			if (err){
				throw err;
			}
		} )
	}

}




module.exports = {
	addSection: addSection,
	getSection: getSection,
	sectionTitles: sectionTitles,
	deleteSection: deleteSection
}; 