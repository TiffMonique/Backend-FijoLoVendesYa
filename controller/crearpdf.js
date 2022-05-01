const { Sequelize, where } = require("sequelize");
const pool = require("../database/database");
const modeloFotosVentas = require("../models/fotosVentas");
const modeloUsuarios = require("../models/UsuariosMD.js");
const modeloRoles = require("../models/RolesMD.js");
const PDF = require("pdfkit");
const fs = require("fs");
var nodemailer = require("nodemailer");
const { fillColor } = require("pdfkit");
var CronJob = require("cron").CronJob;
var http = require("http");
const { type } = require("os");

<<<<<<< Updated upstream
//funcion que crea el pdf cada minuto y lo envía
var enviar = new CronJob(
  "5 8 * * 6",
  async function () {
    try {
      var ussers = await modeloUsuarios.findAll({
        include: modeloRoles,
      });
=======

//funcion que crea el pdf cada minuto y lo envía 
var enviar= new CronJob('5 8 * * 6', async function() {

  try{

      var  ussers= await pool.query('SELECT * FROM usuarios WHERE EXISTS (SELECT * FROM suscripciones WHERE usuarios.idUsuarios = suscripciones.idUsuario)');
>>>>>>> Stashed changes

      for (let index = 0; index < ussers.length; index++) {
        const user = ussers[index];

        const doc = new PDF({
          bufferPages: true,
          compress: false,
          margins: { top: 20, left: 10, right: 10, bottom: 20 },
        });

        const filename = `Reporte de ventas-${Date.now()}.pdf`;

        const records = await pool.query(
          "select venta.idVenta,venta.producto, venta.estado,venta.cantidad,venta.descripcion, venta.categoria,venta.precio from suscripciones inner join usuarios on suscripciones.idUsuario=usuarios.idUsuarios inner join categorias on suscripciones.idCategoria=categorias.nombre inner join venta on categorias.nombre=venta.categoria where week(venta.createdAT) = week(CURDATE()) and usuarios.idUsuarios=?",
          [user.idUsuarios]
        );
        var email = await pool.query(
          "SELECT correo FROM Usuarios WHERE idUsuarios=?",
          [user.idUsuarios]
        );
        email = email[0].correo;
        var datospersonales = await pool.query(
          "SELECT nombre,apellido FROM Usuarios WHERE idUsuarios=?",
          [user.idUsuarios]
        );

        const distanceMargin = 15;
        doc
          .fillAndStroke("#fc2626")
          .lineWidth(20)
          .lineJoin("square")
          .rect(
            distanceMargin,
            distanceMargin,
            doc.page.width - distanceMargin * 2,
            doc.page.height - distanceMargin * 2
          )
          .stroke();

        doc
          .font("Times-BoldItalic")
          .fontSize(20)
          .fillColor("red")
          .text("-----FIJOLOVENDESYA-----", 198, 42, {
            lineGap: 25,
          });

        doc.fontSize(15);
        doc.fillColor("blue");
        doc.text(
          "Hola " +
            datospersonales[0].nombre +
            " " +
            datospersonales[0].apellido +
            " estas son las sugerencias de artículos para su compra:",
          80,
          80,
          {
            lineGap: 40,
          }
        ),
          (count = 1);
        recordsfotos = [];
        for (let index = 0; index < records.length; index++) {
          const record = records[index];
          doc.fontSize(20);
          doc.fillColor("black");
          doc.text("Producto : " + record.producto, 100, 120, {
            lineGap: 25,
            underline: true,
          });
          doc.fontSize(15);
          doc.text("- Estado : " + record.estado, {
            lineGap: 20,
          }),
            doc.text("- Cantidad disponible : " + record.cantidad, {
              lineGap: 20,
            }),
            doc.text("- Descripción : " + record.descripcion, {
              lineGap: 20,
            }),
            doc.text("- Categoría : " + record.categoria, {
              lineGap: 20,
            }),
            doc.text("- Precio del producto = " + record.precio, {
              lineGap: 20,
            });

          var foto = await modeloFotosVentas.findOne({
            where: { idVenta: record.idVenta },
            order: [["indice", "ASC"]],
          });
          doc.image("./public/uploads/" + foto.dataValues.nombre, 150, 360, {
            fit: [300, 200],
            align: "center",
            valign: "center",
          });
          doc.fillColor("black");
          doc.fontSize(18);
          doc.text(
            "Para comprar este producto ingrese al siguiente enlace: ",
            100,
            580
          );
          doc
            .fontSize(17)
            .fillColor("blue")
            .text("LINK DE COMPRA", 100, 610, {
              link: "http://localhost:3000/product/" + record.idVenta,
              underline: true,
            });

          doc
            .fillAndStroke("#fc2626")
            .lineWidth(20)
            .lineJoin("square")
            .rect(
              distanceMargin,
              distanceMargin,
              doc.page.width - distanceMargin * 2,
              doc.page.height - distanceMargin * 2
            )
            .stroke();
          if (index < records.length - 1) {
            doc.addPage();
          }
        }

        const writestream = fs.createWriteStream(`C:/pdfNode/${filename}`);
        doc.pipe(writestream);

        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "fijolovendesya@gmail.com",
            pass: "fijoloVENDESYA10",
          },
        });

        const mailOptions = {
          from: "Remitente",
          to: email,
          subject: "Ventas",
          attachments: [
            {
              filename: `${filename}`,
              path: `C:/pdfNode/${filename}`,
            },
          ],
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("Error al enviar pdf");
          } else {
            console.log("Email Enviado");
          }
        });
        doc.end();
      }
    } catch (error) {
      console.log({ Error: error });
    }
  },
  null,
  true
);

enviar.start(); //inicio de la funcion anterior

module.exports = {
  enviar,
};
