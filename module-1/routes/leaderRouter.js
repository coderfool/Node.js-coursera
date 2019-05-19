const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')

.all((_req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})

.get((_req, res) => {
    res.end('Will send details of all leaders');
})

.post((req, res) => {
    res.end('Will add leader with name: ' + req.body.name + ' and description: ' + req.body.description);
})

.put((_req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
})

.delete((_req, res) => {
    res.end('Will delete all leaders!');
});

leaderRouter.route('/:leaderId')

.all((_req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})

.get((req, res) => {
    res.end('Will send details of leader: ' + req.params.leaderId);
})

.post((req, res) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /leaders/' + req.params.leaderId);
})

.put((req, res) => {
    res.write('Will update leader: ' + req.params.leaderId);
    res.end('  with name: ' + req.body.name + ' and description: ' + req.body.description);
})

.delete((req, res) => {
    res.end('Will delete leader: ' + req.params.leaderId);
});

module.exports = leaderRouter;