const { pool, mysql } = require('./../utils/dbConnect');
const utils = require('./../utils/functions');
// const dbUtils = require('./../../utils/db');

const createNote = (request, response) => {
    const name = request.body.noteName;
    const content = request.body.noteContent;
    const tags = '[]'; // not configured yet
    const dateTimeNow = utils.dateTimeNow();

    pool.query(
        // 'INSERT INTO note_entries SET (`name`, `content`, `tags`, `created_at`, `updated_at`) VALUES ',
        'INSERT INTO note_entries SET name=?,content=?,tags=?,created_at=?,updated_at=?',
        [name, content, tags, dateTimeNow, dateTimeNow],
        (err, results, fields) => {
            console.log(err);
            console.log(results);
            console.log(fields);
        }
    );

    // const prepSql = "INSERT INTO note_entries (`name`, `content`, `tags`, `created_at`, `updated_at`) VALUES (?, ?, ?, ?, ?)";
    // const sqlInserts = [name, content, tags, dateTimeNow, dateTimeNow];
    // const sql = mysql.format(prepSql, sqlInserts);
    // pool.execute(sql, (err, results) => {
    //     console.log(err);
    //     console.log(results);
    // });

    // works
    // pool.query(
    //     'SELECT * FROM note_entries',
    //     (err, results, fields) => {
    //         console.log(err);
    //         console.log(results);
    //         console.log(fields);
    //     } 
    // );

    // pool.query(
    //     "INSERT INTO note_entries SET " +
    //     "`name` = ?, `content` = ?, `tags` = ?, `created_at` = ?, `updated_at` = ?",
    //     [
    //         name,
    //         content,
    //         tags,
    //         dateTimeNow,
    //         dateTimeNow
    //     ],
    //     // 'INSERT INTO note_entries SET ' +
    //     // '(name, content, tags, created_at, updated_at) VALUES ?' +
    //     // '(?, ?, ?, ?, ?) VALUES ' +
    //     // '(?, ?, ?, ?, ?) RETURNING id',
    //     // 'name = :name, content = :content, tags = :tags, created_at = :created_at, updated_at = :updated_at',
    //     // {
    //     //     name,
    //     //     content,
    //     //     tags,
    //     //     created_at: dateTimeNow,
    //     //     updated_at: dateTimeNow
    //     // },
    //     'INSERT INTO note_entries (name, content, tags, created_at, updated_at) VALUES',
    //     '?, ?, ?, ?, ?',
    //     [name, content, tags, dateTimeNow, dateTimeNow],
    //     (err, results) => {
    //         console.log(err);
    //         console.log(results);
    //         // if (error) {
    //         //     // need to handle these in a logger
    //         //     console.log(error);
    //         //     response.status(401).send('Failed to create new note'); // vague front end error
    //         // } else {
    //         //     response.status(201).send(`Note created with ID: ${JSON.stringify(results.rows[0].id)}`);
    //         // }
    //     }
    // )
};

const getNote = (request, response) => {
    const noteId = request.body.noteId;

    pool.query(
        'SELECT name, content FROM note_entries WHERE id = $1 ',
        [
            noteId
        ],
        (error, results) => {
            if (error) {
                // need to handle these in a logger
                response.status(401).send('Failed to find note'); // vague front end error
            } else {
                response.status(200).send(results.rows[0]);
            }
        }
    )
};

const updateNote = (request, response) => {
    const noteId = request.body.noteId;
    const noteName = request.body.noteName;
    const noteContent = request.body.noteContent;
    const modified = utils.dateTimeNow();

    pool.query(
        'UPDATE note_entries SET name = $1, content = $2, updated_at = $3 WHERE id = $4 ',
        [
            noteName,
            noteContent,
            modified,
            noteId
        ],
        (error, results) => {
            if (error) {
                // need to handle these in a logger
                response.status(401).send('Failed to update note ' + noteId); // vague front end error
            } else {
                response.status(200).send(`Note updated`);
            }
        }
    )
};

const deleteNote = (request, response) => {
    const noteId = request.body.noteId;

    pool.query(
        'DELETE FROM note_entries WHERE id = $1',
        [
            noteId
        ],
        (error, results) => {
            if (error) {
                // need to handle these in a logger
                response.status(401).send('Failed to delete new note'); // vague front end error
            } else {
                response.status(200).send(`Note deleted`);
            }
        }
    )
};

// using case-insensitive search with index from here:
// https://stackoverflow.com/questions/7005302/postgresql-how-to-make-case-insensitive-query
// CREATE INDEX command ran on table in notes db
const searchNotes = (request, response) => {
    const partialQuery = '%' + request.body.searchTerm + '%';

    pool.query(
        'SELECT id, name FROM note_entries WHERE LOWER(name) LIKE LOWER($1) ',
        [
            partialQuery
        ],
        (error, results) => {
            if (error) {
                // need to handle these in a logger
                response.status(401).send('Failed to search for notes'); // vague front end error
            } else {
                response.status(200).send(results.rows);
            }
        }
    )
};

module.exports = {
    createNote,
    getNote,
    updateNote,
    deleteNote,
    searchNotes
};