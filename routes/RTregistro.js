const {Router} = require("express");

const {crear} = require("../controller/registro")

const router=Router();

router.post('/crear',crear);

module.exports=router;