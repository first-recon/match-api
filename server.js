const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const MatchService = require('./lib/service');

const matchService = new MatchService();
const server = express();

server.use(bodyParser.json());

server.get('/', (req, res) => {
    matchService.getAll()
        .then((results) => {
            res.send(results);
        })
        .catch((error) => {
            res.status(500).send({
                success: false,
                message: 'an unknown error occurred',
                error
            });
        });
});

server.post('/', (req, res) => {
    matchService.create(req.body)
        .then((result) => {
            res.send(result);
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