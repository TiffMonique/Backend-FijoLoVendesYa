//const express = require("express");
const express = require("express");
const { Router } = require("express");
const { authAdmin } = require("../controller/sesiones.js");
const {
  obtenerCategorias,
  unaCategoria,
  insertarCategoria,
  modificarCategoria,
  eliminarCategoria,
} = require("../controller/categoriasCT.js");

const router = Router();

//------ENRUTAMIENTO PARA CATEGORIAS------
//1. VER TODAS LAS CATEGORIAS
router.get("/todasCategorias", obtenerCategorias);
//2. VER UNA CATEGORIA
router.get("/unaCategoria/:nombre", unaCategoria);
//3. INSERTAR UNA NUEVA CATEGORIA
router.post("/crearCategoria", authAdmin, insertarCategoria);
//4. MODIFICAR UNA CATEGORIA YA REGISTRADA
router.put("/editarCategoria/:nombre", authAdmin, modificarCategoria);
//5. BORRAR UNA CATEGORIA
router.delete("/eliminarCategoria/:nombre", authAdmin, eliminarCategoria);

module.exports = router;
