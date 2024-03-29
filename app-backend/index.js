const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const port = 5001;

const { createNote, getNote, updateNote, deleteNote, searchNotes } = require('./db-queries/basicNoteQueries');

app.use(cors());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

// CORs
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

app.post('/api/create-note', createNote);
app.post('/api/get-note', getNote);
app.post('/api/update-note', updateNote);
app.post('/api/delete-note', deleteNote);
app.post('/api/search-notes', searchNotes);

app.listen(port, () => {
    console.log(`App runing on port ${port}.`);
});