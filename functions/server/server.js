'use strict';

const functions = require('firebase-functions');
const express = require('express'),
  bodyParser = require('body-parser'),
  http = require('http'),
  path = require('path'),
  api = require('./api'),
  cors = require('cors');

const app = express();

app.set('port', process.env.PORT || 9000);
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

// JSON API
app.get('/', api.listAll);
app.get('/reset', api.reset);
app.get('/random', api.getRandom);
app.get('/:id', api.get);
app.get('/name/:name', api.filterByName);
app.get('/skill/:skill', api.filterBySkill);
app.post('/', api.create);
app.put('/:id', api.update);
app.delete('/:id', api.delete);

module.exports.people = functions.https.onRequest(app);

app.listen(app.get('port'), '0.0.0.0', function() {
  console.log(
    '✔ Express server listening on http://0.0.0.0:%d/',
    app.get('port')
  );
});
