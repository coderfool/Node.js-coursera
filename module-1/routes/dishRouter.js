const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')

.all((_req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})

.get((_req, res) => {
    res.end('Will send details of all dishes');
})

.post((req, res) => {
    res.end('Will add dish with name: ' + req.body.name + ' and description: ' + req.body.description);
})

.put((_req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})

.delete((_req, res) => {
    res.end('Will delete all dishes!');
});

dishRouter.route('/:dishId')

.all((_req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})

.get((req, res) => {
    res.end('Will send details of dish: ' + req.params.dishId);
})

.post((req, res) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/' + req.params.dishId);
})

.put((req, res) => {
    res.write('Will update dish: ' + req.params.dishId);
    res.end('  with name: ' + req.body.name + ' and description: ' + req.body.description);
})

.delete((req, res) => {
    res.end('Will delete dish: ' + req.params.dishId);
});

module.exports = dishRouter;