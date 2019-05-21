const express = require('express');
const bodyParser = require('body-parser');
const dishes = require('../models/dishes');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')

.get((_req, res, next) => {
    dishes.find({})

    .then((dishes) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dishes);
    })
    
    .catch((err) => {
        next(err);
    });
})

.post((req, res, next) => {
    dishes.create(req.body)

    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    })

    .catch((err) => {
        next(err);
    });
})

.put((_req, res, _next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})

.delete((_req, res, next) => {
    dishes.deleteMany({})

    .then((response) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })

    .catch((err) => {
        next(err);
    });
});

dishRouter.route('/:dishId')

.get((req, res, next) => {
    dishes.findById(req.params.dishId)

    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    })
    
    .catch((err) => {
        next(err);
    });
})

.post((req, res, _next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/' + req.params.dishId);
})

.put((req, res, next) => {
    dishes.findByIdAndUpdate(req.params.dishId, {
        $set: req.body
    }, {new: true})

    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    })

    .catch((err) => {
        next(err);
    });
})

.delete((req, res, next) => {
    dishes.findByIdAndRemove(req.params.dishId)

    .then((response) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })

    .catch((err) => {
        next(err);
    });
});

dishRouter.route('/:dishId/comments')

.get((req, res, next) => {
    dishes.findById(req.params.dishId)

    .then((dish) => {
        if (dish == null) {
            const err = new Error('Dish ' + req.params.dishId + ' not found!');
            err.status = 404;
            next(err);
            return;
        }
        else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish.comments);
        }
    })

    .catch((err) => {
        next(err);
    });
})

.post((req, res, next) => {
    dishes.findById(req.params.dishId)

    .then((dish) => {
        if (dish == null) {
            const err = new Error('Dish ' + req.params.dishId + ' not found!');
            err.status = 404;
            next(err);
            return;
        }
        else {
            dish.comments.push(req.body);

            dish.save()

            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            })

            .catch((err) => {
                next(err);
            });  
        }
    })

    .catch((err) => {
        next(err);
    });
})

.put((req, res, _next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes/' +
    req.params.dishId + '/comments');
})

.delete((req, res, next) => {
    dishes.findById(req.params.dishId)

    .then((dish) => {
        if (dish == null) {
            const err = new Error('Dish ' + req.params.dishId + ' not found!');
            err.status = 404;
            next(err);
            return;
        }
        else {
            dish.comments = [];

            dish.save()

            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            })

            .catch((err) => {
                next(err);
            });  
        }
    })

    .catch((err) => {
        next(err);
    });
});

dishRouter.route('/:dishId/comments/:commentId')

.get((req, res, next) => {
    dishes.findById(req.params.dishId)

    .then((dish) => {
        if (dish == null) {
            const err = new Error('Dish ' + req.params.dishId + ' not found!');
            err.status = 404;
            next(err);
            return;
        }
        else if (dish.comments.id(req.params.commentId) == null) {
            const err = new Error('Comment ' + req.params.commentId + ' not found!');
            err.status = 404;
            next(err);
            return;
        }
        else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish.comments.id(req.params.commentId)); 
        }
    })

    .catch((err) => {
        next(err);
    });
})

.post((req, res, _next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes' + req.params.dishId +
    '/comments/' + req.params.commentId);
})

.put((req, res, next) => {
    dishes.findById(req.params.dishId)

    .then((dish) => {
        if (dish == null) {
            const err = new Error('Dish ' + req.params.dishId + ' not found!');
            err.status = 404;
            next(err);
            return;
        }
        else if (dish.comments.id(req.params.commentId) == null) {
            const err = new Error('Comment ' + req.params.commentId + ' not found!');
            err.status = 404;
            next(err);
            return;
        }
        else {
            if (req.body.rating) {
                dish.comments.id(req.params.commentId).rating = req.body.rating;
            }
            if (req.body.comment) {
                dish.comments.id(req.params.commentId).comment = req.body.comment;
            }

            dish.save()

            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            })

            .catch((err) => {
                next(err);
            });
        }
    })

    .catch((err) => {
        next(err);
    });
})

.delete((req, res, next) => {
    dishes.findById(req.params.dishId)

    .then((dish) => {
        if (dish == null) {
            const err = new Error('Dish ' + req.params.dishId + ' not found!');
            err.status = 404;
            next(err);
            return;
        }
        else if (dish.comments.id(req.params.commentId) == null) {
            const err = new Error('Comment ' + req.params.commentId + ' not found!');
            err.status = 404;
            next(err);
            return;
        }
        else {
            dish.comments.id(req.params.commentId).remove();

            dish.save()

            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            })

            .catch((err) => {
                next(err);
            });
        }
    })

    .catch((err) => {
        next(err);
    });
});

module.exports = dishRouter;