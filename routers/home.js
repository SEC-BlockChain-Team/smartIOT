const router = require('express').Router();

router.get('/', (req, res, next) => {
    res.render('index');
});

router.get('/about', (req, res, next) => {
    res.render('index');
});

module.exports = router;