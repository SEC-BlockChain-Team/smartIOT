const router = require('express').Router();
const getData = require('./utils/sensor').getData;

router.get('/', (req, res, next) => {
    res.render('index', {
        name: "Abir Hasan Mubin",
    });
});

router.get('/sendData', (req, res, next) => {
    let data = getData();
    if (!data) {
        res.send({
            error: 'Error!! no data found!!',
        });
    }

    res.send({
        sensorData: data,
    });
});

router.get('/about', (req, res, next) => {
    res.render('about', {
        name: "Abir Hasan Mubin",
    });
});

module.exports = router;