const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')

.all((_req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})

.get((_req, res) => {
    res.end('Will send details of all promotions');
})

.post((req, res) => {
    res.end('Will add promotion with name: ' + req.body.name + ' and description: ' + req.body.description);
})

.put((_req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})

.delete((_req, res) => {
    res.end('Will delete all promotions!');
});

promoRouter.route('/:promoId')

.all((_req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})

.get((req, res) => {
    res.end('Will send details of promotion: ' + req.params.promoId);
})

.post((req, res) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /promotions/' + req.params.promoId);
})

.put((req, res) => {
    res.write('Will update promotion: ' + req.params.promoId);
    res.end('  with name: ' + req.body.name + ' and description: ' + req.body.description);
})

.delete((req, res) => {
    res.end('Will delete promotion: ' + req.params.promoId);
});

module.exports = promoRouter;