const {Router} = require("express");
const {auth} = require("../controller/sesiones");

const {crearChat, misChats} = require("../controller/chatCT");
const router=Router();
router.post('/crearChat', auth, crearChat);
router.get('/misChats', auth, misChats);
module.exports=router;