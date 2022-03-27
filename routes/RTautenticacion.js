const {Router} = require("express");

const {login, logout, sesion} = require("../controller/autenticacion")

const router=Router();

router.post('/login',login);
router.delete('/logout', logout);
router.get('/sesion', sesion);
module.exports=router;