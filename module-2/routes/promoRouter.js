const express = require('express');
const bodyParser = require('body-parser');
const Promotions = require('../models/promotions');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')

.get((_req, res, next) => {
    Promotions.find({})

    .then((promotions) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotions);
    })
    
    .catch((err) => {
        next(err);
    });
})

.post((req, res, next) => {
    Promotions.create(req.body)

    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    })

    .catch((err) => {
        next(err);
    });
})

.put((_req, res, _next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})

.delete((_req, res, next) => {
    Promotions.deleteMany({})

    .then((response) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })

    .catch((err) => {
        next(err);
    });
});

promoRouter.route('/:promoId')

.get((req, res, next) => {
    Promotions.findById(req.params.promoId)

    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    })
    
    .catch((err) => {
        next(err);
    });
})

.post((req, res, _next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /promotions/' + req.params.promoId);
})

.put((req, res, next) => {
    Promotions.findByIdAndUpdate(req.params.promoId, {
        $set: req.body
    }, {new: true})

    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    })

    .catch((err) => {
        next(err);
    });
})

.delete((req, res, next) => {
    Promotions.findByIdAndRemove(req.params.promoId)

    .then((response) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })

    .catch((err) => {
        next(err);
    });
});

module.exports = promoRouter;