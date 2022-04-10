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

const subirfoto = async (req, res, manejarInformacion) => {
    await upload.single("foto")(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_UNEXPECTED_FILE") {
          res.status(400).json({message: "Cantidad incorrecta", error: err.message})
        }
      } else if (err) {
        res.status(500).json("Error: " + err.message);
      } 
      if(manejarInformacion) {
        manejarInformacion(req, res);
      } else {
        res.status(200).json({message: "foto subida con exito"});
      }
    });
  }

  const subirVarias = async (req, res, requerido, maximo, manejarInformacion) => {
    await upload.array("foto", maximo)(req, res, async function (err) {
        if (requerido) {
            if(req.files.length > 0) {
                if (err instanceof multer.MulterError) {
                    if (err.code === "LIMIT_UNEXPECTED_FILE") {
                        res.status(400).json({message: "Debe elegir como máximo "+ maximo +" imágenes", error: err.message})
                    }
                }else if (err) {
                    res.status(500).json("Error: " + err.message);
                } else {
                    manejarInformacion(req, res)
                }
            } else {
                res.status(400).json({message: "Debe seleccionar una foto al menos"})
            }
        } else {
            manejarInformacion(req, res)
        }
      });
  }

module.exports = { subirfoto, subirVarias };