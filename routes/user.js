const express = require('express');
const router = express.Router();
const db = require('../models/index');

router.get('/', (req, res, next) => {
    db.Detail.findAll().then(dtl => {
        var data = {
            title: 'Board/Index',
            content: dtl
        }
        res.render('users/index', data);
    });
});

router.get('/add', (req, res, next) => {
    var data = {
        title: 'Users/Add'
    }
    res.render('users/add', data);
});

router.post('/add', (req, res, next) => {
    db.sequelize.sync()
    .then(() => db.Detail.create({
        name: req.body.name,
        type: req.body.type,
        detail: req.body.detail
    }))
    .then(dtl => {
        res.redirect('/users');
    });
});

module.exports = router;