const express=require('express');
const router=express.Router();
const { getData } = require('../controllers/restaurants');

router.get('/restaurants-data', getData);

module.exports = router;