const router = require('express').Router();
const fs = require('fs');
const path = require('path');

// router.get('/notes', (req, res) => {
// 	fs.readFile('./db/db.json', 'utf8', (err, data) => {
// 		if (err) {
// 			console.log(err);
// 		}
// 		else {res.json(JSON.parse(data))}
// 	})
// }
// );

router.get('/notes', (req, res) => {
	res.sendFile(path.join(__dirname, '../db/db.json'));
});

router.post('/notes', (req, res) => {
	let notes = fs.readFileSync('../db/db.json');
	notes = JSON.parse(notes);
	// res.json(notes);
	let Note = {
		title: req.body.title,
		text: req.body.text,
	};
	notes.push(Note);
	fs.writeFileSync('../db/db.json', JSON.stringify(notes));
	res.json(notes);

});

module.exports = router;