//IMPORTAMOS EL MODELO
const db = require("../database/db.js");
const modeloCategorias = require("../models/CategoriasMD.js");

//------------METODOS PARA EL CRUD-----------
//1. OBTENER TODOS LAS CATEGORIAS
const obtenerCategorias = async (req, res) => {
  try {
    const categories = await modeloCategorias.findAll();
    res.json(categories);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//2. OBTENER UNA CATEGORIA
const unaCategoria = async (req, res) => {
  try {
    const categories = await modeloCategorias.findAll({
      where: { nombre: req.params.nombre },
    });
    res.json(categories[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//3. INSERTAR UNA CATEGORIA
const insertarCategoria = async (req, res) => {
  try {
    await modeloCategorias.create(req.body);
    res.json({ message: "Categoria registrada correctamente" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//4. ACTUALIZAR UNA CATEGORIA
const modificarCategoria = async (req, res) => {
  console.log("MENSAJE" + req.body);
  try {
    modeloCategorias.update(req.body, {
      where: { nombre: req.params.nombre },
    });
    res.json({ message: "Categoría actualizada correctamente" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//5. ELIMINAR UNA CATEGORIA
const eliminarCategoria = async (req, res) => {
  try {
    await modeloCategorias.destroy({
      where: { nombre: req.params.nombre },
    });
    res.json({ message: "Categoria eliminada correctamente" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = {
  obtenerCategorias,
  unaCategoria,
  insertarCategoria,
  modificarCategoria,
  eliminarCategoria,
};
