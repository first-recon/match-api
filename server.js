const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const MatchService = require('./lib/service');

const matchService = new MatchService();
const server = express();

server.use(bodyParser.urlencoded({ encoded: true }));
server.use(bodyParser.json());

server.get('/', (req, res) => {
    matchService.get(req.query)
        .then((results) => {
            res.send({ success: true, results });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send({
                success: false,
                message: 'an unknown error occurred'
            });
        });
});

server.post('/', (req, res) => {
    matchService.create(req.body)
        .then((results) => {
            res.send({ success: true, results });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send({
                name: 'DbAddOpError',
                message: 'An error occurred adding this match, please try again later.'
            });
        });
});

server.listen(config.port, () => {
    console.log(`Listening on port ${config.port}`);
});