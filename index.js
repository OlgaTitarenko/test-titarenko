const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

let users = [];
readUsers();

function readUsers() {
    fs.readFile('./users.json', 'utf8', function(err, data) {
        if (err) {
            return;
        }

        users = JSON.parse(data)
    });
}

function writeUsers() {
    fs.writeFile('./users.json', JSON.stringify(users), function (err) {
        if (err) {
            return;
        }
        console.log('Saved!');
    });
}
app.use(bodyParser.text());

app.get('/', (req, res) => res.send(`Hello from Github`));
app.get('/users', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.json(users)
});

app.post('/users', (req, res) => {
    const newUser = JSON.parse(req.body);
    users.push(newUser);
    writeUsers();

    res.set('Access-Control-Allow-Origin', '*');
    res.json(users)
});

app.post('/users2', (req, res) => {
    fs.readFile('./users.json', 'utf8', function(err, data) {
        if (err) {
            return;
        }

        users = JSON.parse(data);
        const newUser = JSON.parse(req.body);
        users.push(newUser);

        fs.writeFile('./users.json', JSON.stringify(users), function (err) {
            if (err) {
                return;
            }

            res.set('Access-Control-Allow-Origin', '*');
            res.json(users)
        });
    });
});

app.listen(port, () => console.log(
    `Example app listening on http://127.0.0.1:${port}!`,
));