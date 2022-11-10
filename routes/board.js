const express = require('express');
const router = express.Router();
const db = require('../models/index');

router.get('/', (req, res, next) => {
    db.Detail.findAll().then(dtl => {
        var data = {
            title: 'Board/Index',
            content: dtl
        }
        res.render('board/add', data);
    });
});

router.get('/add', (req, res, next) => {
    var data = {
        title: 'Users/Add'
    }
    res.render('board/request', data);
});

router.post('/add', (req, res, next) => {
    db.sequelize.sync()
    .then(() => db.Detail.create({
        name: req.body.name,
        type: req.body.type,
        detail: req.body.detail
    }))
    .then(dtl => {
        res.redirect('/board');
    });
});

module.exports = router;