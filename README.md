### Info
This one of those "Why don't you just use Evernote/Trello" sort of things.
Another thing is grouping/collecting all open Chrome tabs/pruning and then saving for future use eg. Chrome extension.
Which again some exist but "mine" eg. code I wrote...
Always that feeling "is it worth it", what is to gain. This is almost an Evernote clone in terms of layout. I feel like nothing I do matters unless it makes money.
My drawing below I forgot a title field of the opened note.

![crude-drawing-of-basic-app](./images/rjs-pg-note-taking-app.JPG)

### Functionality
I would like static storage encryption. Another url-based note taking webapp I made eg. [qnote.me](https://qnote.me) uses that with MySQL/PHPDefuse. But this is just a no-auth write thing with a basic interface and faster than url-based.

* CRUD
* search
* tagging

### Deployment
So you would need a way to serve the static stuff once built. And then have a PostgresDB running with Node/Express to handle the API calls. Again this has no auth and very basic validation eg. not empty.

I'm also using Systemd to persist the node backend and this is going on a Raspberry Pi.

### DB Schema - MySQL version... trying mysql2 over mysql due to prepared statements
**Rambling start**
I'm not sayig mysql can't do prepared statements, I was trying and it kept failing... Googling didn't lead to much always parse error 1064

oh my god... the seething frustration... my conspiratorial ill-informed mind... ahhhhhhhhhh why why why why is it so hard
I will figure out how to get postgres to work though, I feel more comfortable using that than this mysql(without PDO equivalent). I don't konw, I'm just ill-informed I guess, this is also just for local personal use at home network.
The manual said you'd have to have `NO_BACKSLASH_ESCAPES` disabled which I checked is the case.
Oh my god... I guess it was the array parameter, 10,000 tabs later I find a prepared query to use. Postgres didn't mind the array that was not a string... odd.
**Rambling end**

The main reason I did this is because when I tried to deploy this app on a RaspberryPi I couldn't get the connection to work.
I kept getting a generic "connection terminated unexpectedly" wehn using systemd but running it in command line eg. `$node index.js` worked just fine.
It's possible I'll run into the same issue with MySQL but I have a LAMP stack running on the Pi already.

I'm using Windows to develop on so I installed MySQL by an installer. Using CLI though(don't have PHPMyAdmin running for example).

I'm using the MySQL Command Line Client to run these commands after having logged in.

I imagine this is my own fault but I've spent at least a solid day trying to get postgres to work, I will try again on a "real server" eg. a vps running Debian/Ubuntu. But I just want to get this thing to work, sucks having to rework the datastore to use MySQL over Postgres but thankfully it's pretty close hopefully.

`CREATED DATABASE notes;`

`CREATE TABLE note_entries (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255), content TEXT, tags VARCHAR(255), created_at TIMESTAMP, updated_at TIMESTAMP, PRIMARY KEY (id));`

`CREATE TABLE note_tags (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255), note_entry_id SMALLINT, created_at TIMESTAMP, updated_at TIMESTAMP, PRIMARY KEY (id));`

If I had "an ORM" or "MVC" the data store switch should be straight forward... or is it sequelize... I don't know... in quotes means I don't know what I'm talking about.

### DB Schema
I'm just using default/super user `postgres`

db name: notes

`CREATE DATABASE "notes" WITH OWNER "postgres" ENCODING 'UTF8' LC_COLLATE = 'English_United States' LC_CTYPE = 'English_United States' TEMPLATE = 'template0';`

table: note_entries

**id, name, content, tags, created_at, updated_at**

`CREATE TABLE note_entries (
ID SERIAL PRIMARY KEY,
name VARCHAR(255),
content TEXT,
tags VARCHAR(255),
created_at TIMESTAMP,
updated_at TIMESTAMP
);`

table: note_tags

~~**id, name, created_at, updated_at**
`CREATE TABLE note_tags (
ID SERIAL PRIMARY KEY,
name VARCHAR(255),
created_at TIMESTAMP,
updated_at TIMESTAMP
);`~~

**id, name, note_id, created_at, updated_at**

`CREATE TABLE note_tags (
ID SERIAL PRIMARY KEY,
name VARCHAR(255),
note_entry_id SMALLINT,
created_at TIMESTAMP,
updated_at TIMESTAMP
);`

The tag is a number-to-name deal but the tags in notes would be an array of integers. Well on second thought this concept of GIN-index is new to me, the array of integers would have been for node which doesn't make sense SQL is fastest. I will use the multiple rows method which is slower according to this [link](https://stackoverflow.com/questions/41311191/in-postgres-how-to-match-multiple-tags-for-best-performance).