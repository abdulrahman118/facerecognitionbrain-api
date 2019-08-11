const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const bcrypt = require('bcrypt');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const saltRounds = 10;

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'sqluser2',
        database: 'smart-brain'
    }
});

app.use(bodyParser.json());
app.use(cors());

//simplified method signature
app.post('/signIn', signin.handleSignin(db, bcrypt));

app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt, saltRounds));

app.get('/profile/:id', (req, res) => profile.handleGetProfile(req, res, db));

app.put('/image', (req, res) => image.handleImage(req, res, db));

app.post('/imageUrl', (req, res) => image.handleAPICall(req,res));

app.listen(8080, () => console.log('listening to the port: 8080'));
