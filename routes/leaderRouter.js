const express = require('express');
const bodyParser = require('body-parser');
const leaders = require('../models/leaders');
var authenticate = require('../authenticate');
const cors = require('./cors');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')

.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))

.get(cors.cors, (_req, res, next) => {
    leaders.find({})

    .then((leaders) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leaders);
    })
    
    .catch((err) => {
        next(err);
    });
})

.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    leaders.create(req.body)

    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    })

    .catch((err) => {
        next(err);
    });
})

.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (_req, res, _next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
})

.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (_req, res, next) => {
    leaders.deleteMany({})

    .then((response) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })

    .catch((err) => {
        next(err);
    });
});

leaderRouter.route('/:leaderId')

.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))

.get(cors.cors, (req, res, next) => {
    leaders.findById(req.params.leaderId)

    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    })
    
    .catch((err) => {
        next(err);
    });
})

.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, _next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /leaders/' + req.params.leaderId);
})

.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    leaders.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body
    }, {new: true})

    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    })

    .catch((err) => {
        next(err);
    });
})

.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    leaders.findByIdAndRemove(req.params.leaderId)

    .then((response) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })

    .catch((err) => {
        next(err);
    });
});

module.exports = leaderRouter;