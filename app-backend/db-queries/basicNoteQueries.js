const pool = require('./../utils/dbConnect');
const utils = require('./../utils/functions');
// const dbUtils = require('./../../utils/db');

const createNote = (request, response) => {
    const name = request.body.name;
    const content = request.body.content;
    const tags = []; // not configured yet
    const dateTimeNow = utils.dateTimeNow();

    pool.query(
        'INSERT INTO note_entries ' +
        '(name, content, tags, created_at, updated_at) VALUES ' +
        '($1, $2, $3, $4, $5) RETURNING id',
        [
            name,
            content,
            tags,
            dateTimeNow,
            dateTimeNow
        ],
        (error, results) => {
            if (error) {
                // need to handle these in a logger
                console.log(error);
                response.status(401).send('Failed to create new note'); // vague front end error
            } else {
                response.status(201).send(`Note created with ID: ${JSON.stringify(results.rows[0].id)}`);
            }
        }
    )
};

const getNote = (request, response) => {

};

const updateNote = (request, response) => {
    
};

const deleteNote = (request, response) => {

};

module.exports = {
    createNote,
    getNote,
    updateNote,
    deleteNote
};