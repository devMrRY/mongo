const express=require('express');
const router=express.Router();

router.use('/', require("./analytics"));
// router.use('/test', require("./analytics"));

module.exports = router;
