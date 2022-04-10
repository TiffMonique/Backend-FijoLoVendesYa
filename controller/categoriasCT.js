//IMPORTAMOS EL MODELO
const db = require("../database/db.js");
const modeloCategorias = require("../models/CategoriasMD.js");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { json } = require("body-parser");

//Configuración multer
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase());
  },
});

const limits = {
  fileSize: 5000000,
};

const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const mimetype = fileTypes.test(file.mimetype);
  const extname = fileTypes.test(path.extname(file.originalname));
  if (mimetype && extname) {
    return cb(null, true);
  }
  cb("Error: Archivo debe ser una imagen válida");
};

//instancia multer con su configuración
const upload = multer({
  storage: storage,
  limits: limits,
  fileFilter: fileFilter,
});
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
  await upload.single("foto")(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        res.status(400).json({message: "Debe elegir como máximo 10 imágenes", error: err.message})
      }
    } else if (err) {
      res.status(500).json("Error: " + err.message);
    } else if (req.file) {
      
      try {
        const categoria = { nombre: req.body.nombre, descripcion: req.body.descripcion, foto: req.file.filename}
        await modeloCategorias.create(categoria);
        res.status(200).json({ message: "Categoria registrada correctamente" });
      } catch (error) {
        res.status(400).json({ message: "Ha ocurrido un error", error: error.message });
      }
    } else if(!req.file) {
      try {
        await modeloCategorias.create(req.body);
        res.status(200).json({ message: "Categoria registrada correctamente" });
      } catch (error) {
        res.status(400).json({ message: "Ha ocurrido un error", error: error.message });
      }
    } else {
      res.status(500).json({ message: "No hay imagenes" });
    }
  });
};

//4. ACTUALIZAR UNA CATEGORIA
const modificarCategoria = async (req, res) => {
  console.log("MENSAJE" + req.body);
  await upload.single("foto")(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        res.status(400).json({message: "Debe elegir como máximo 10 imágenes", error: err.message})
      }
    } else if (err) {
      res.status(500).json("Error: " + err.message);
    } else if (req.file) {
      try {
        const categoria = { nombre: req.body.nombre, descripcion: req.body.descripcion, foto: req.file.filename}
        await modeloCategorias.update(categoria, {
          where: { nombre: req.params.nombre },
        });
        res.json({ message: "Categoría actualizada correctamente" });
      } catch (error) {
        res.json({ message: "Ha ocurrido un error", error: error.message });
      }
    } else if (!req.file) {
      try {
        await modeloCategorias.update(req.body, {
          where: { nombre: req.params.nombre },
        });
        res.json({ message: "Categoría actualizada correctamente" });
      } catch (error) {
        res.json({ message: "Ha ocurrido un error", error: error.message });
      }
    } else {
      res.status(500).json({ message: "No hay imagenes" });
    }
  });
  
};

//5. ELIMINAR UNA CATEGORIA
const eliminarCategoria = async (req, res) => {
  try {
    await modeloCategorias.destroy({
      where: { nombre: req.params.nombre },
    });
    res.json({ message: "Categoria eliminada correctamente" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Ha ocurrido un error", error: error.message });
  }
};

module.exports = {
  obtenerCategorias,
  unaCategoria,
  insertarCategoria,
  modificarCategoria,
  eliminarCategoria,
};
