const {Router} = require("express");

const {restablecerpassemail,actualizarpass} = require("../controller/restaurarpass")

const router=Router();

router.post('/restablecerpassemail',restablecerpassemail);
router.post('/actualizarpass', actualizarpass);

module.exports=router;