const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

router.get('/notes', (req, res) => {
	fs.readFile('./db/db.json', 'utf8', (err, data) => {
		if (err) {
			console.log(err);
		}
		else {res.json(JSON.parse(data))}
	})
}
);

router.post('/notes', (req, res) => {
	const { title, text } = req.body;
	if (title && text) {
		const newNote = {
			title,
			text,
			note_id: uuidv4
		};
		readAppend(newNote, './db/db.json');

		const response = {
			status: 'success',
			body: newNote,
		};

		res.json(response);
	} else {
		res.json('Error in posting feedback');
	}
});

module.exports = router;

// GET /api/notes should read the db.json file and return all saved notes as JSON.

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).