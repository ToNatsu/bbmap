const express = require('express');
const router = express.Router();
const db = require('../models/index');

router.get('/', (req, res, next) => {
    db.Detail.findAll().then(dtl => {
        var data = {
            title: 'Board/Index',
            content: dtl
        }
        res.render('gmap3', data);
    });
});

 module.exports = router;