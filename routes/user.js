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
        type: req.body.type,
        name: req.body.name,
        lonlat: req.body.lonlat,
        url: req.body.url
    }))
    .then(dtl => {
        res.redirect('/users');
    });
});

module.exports = router;