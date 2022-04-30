const calificacionesMD = require("../models/CalificacionesMD.js");
const ventasMD = require("../models/VentasMD");

//Agregar calificación
const calificar = async (req, res) => {
  const { idVenta, calificacion } = req.body;
  const idUsuario = req.session.user;
  const calificacionInsert = { idVenta, idUsuario, calificacion };
  try {
    const venta = await ventasMD.findOne({ where: { idVenta } });
    if (!venta) {
      res.status(404).json({ message: "No se pudo encontrar la venta" });
    } else if (venta.idUsuario == idUsuario) {
      res
        .status(401)
        .json({ message: "No puedes calificar tus propias ventas" });
    } else {
      const calificacion = await calificacionesMD.findOne({
        where: { idVenta, idUsuario },
      });
      if (!calificacion) {
        await calificacionesMD.create(calificacionInsert);
        res.status(200).json({ message: "Calificación Guardada" });
      } else {
        await calificacionesMD.update(calificacionInsert, {
          where: {idCalificacion:calificacion.dataValues.idCalificacion}
        })
        res.status(200).json({ message: "Calificación Guardada" });
      }
    }
  } catch (error) {
    res.status(200).json({ message: error.message });
  }
};

const unacalificacion = async (req, res) => {
  try {
    const calificacion = await calificacionesMD.findAll({
      where: { idCalificacion: req.params.idCalificacion },
    });
    res.json(calificacion[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = { unacalificacion, calificar };
