const express=require('express');
const router=express.Router();
const { getAnalyticsData } = require('../controllers/analytics');

router.get('/analytics-data', getAnalyticsData);

module.exports = router;