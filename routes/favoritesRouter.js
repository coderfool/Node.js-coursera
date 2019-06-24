const express = require('express');
const bodyParser = require('body-parser');
const Favorites = require('../models/favorite');
var authenticate = require('../authenticate');

const favoritesRouter = express.Router();

favoritesRouter.use(bodyParser.json());

favoritesRouter.route('/')

.get(authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({user: req.user._id})
    .populate('user')
    .populate('dishes')
    .then((favorite) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorite);
    })
    .catch(err => next(err));
})

.post(authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({user: req.user._id})
    .then((favorite) => {
        if (favorite === null) {
            dishIds = [];
            for (let i = 0; i < req.body.length; i++) {
                dishIds.push(req.body[i]._id);
            }
            Favorites.create({
                user: req.user._id,
                dishes: dishIds
            })
            .then((fav) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(fav);
            })
            .catch(err => next(err));
        }
        else {
            for (let i = 0; i < req.body.length; i++) {
                if (favorite.dishes.indexOf(req.body[i]._id) === -1) {
                    favorite.dishes.push(req.body[i]._id);
                }
            }
            favorite.save()
            .then((fav) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(fav);
            })
            .catch(err => next(err));
        }
    })
    .catch(err => next(err));
})

.delete(authenticate.verifyUser, (req, res, next) => {
    Favorites.deleteOne({user: req.user._id})
    .then((status) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(status);
    })
    .catch(err => next(err));
});

favoritesRouter.route('/:dishId')

.post(authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({user: req.user._id})
    .then((favorite) => {
        if (favorite === null) {
            Favorites.create({
                user: req.user._id,
                dishes: [req.params.dishId]
            })
            .then((fav) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(fav);
            })
            .catch(err => next(err));
        }
        else if (favorite.dishes.indexOf(req.params.dishId) === -1) {
            favorite.dishes.push(req.params.dishId);
            favorite.save()
            .then((fav) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(fav);
            })
            .catch(err => next(err));
        }
    })
    .catch(err => next(err));
})

.delete(authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({user: req.user._id})
    .then((favorite) => {
        if (favorite !== null) {
            favorite.dishes = favorite.dishes.filter(dishId => dishId != req.params.dishId);
            
            if (favorite.dishes.length === 0) {
                Favorites.deleteOne({user: req.user._id})
                .then((status) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(status);
                })
                .catch(err => next(err));
            }
            else {
                favorite.save()
                .then((fav) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(fav);
                })
                .catch(err => next(err));
            } 
        }
        else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('No favorites found');
        }
    })
    .catch(err => next(err)); 
});

module.exports = favoritesRouter;