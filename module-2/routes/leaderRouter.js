const express = require('express');
const bodyParser = require('body-parser');
const leaders = require('../models/leaders');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')

.get((_req, res, next) => {
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

.post((req, res, next) => {
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

.put((_req, res, _next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
})

.delete((_req, res, next) => {
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

.get((req, res, next) => {
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

.post((req, res, _next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /leaders/' + req.params.leaderId);
})

.put((req, res, next) => {
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

.delete((req, res, next) => {
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