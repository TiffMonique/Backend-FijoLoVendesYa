USE tienda;
-- ******* VISUALIZAR *******
SELECT * FROM Busquedas;
SELECT * FROM Estadisticas_Totales;
SELECT * FROM Estadisticas_Semanales;
SELECT * FROM Estadisticas_Mensuales;
SELECT * FROM Estadisticas_Anuales;
-- VER EVENTOS CREADOS
SHOW EVENTS;

-- ******* UTIILZAR *******
CALL `Totales`();
CALL `Semanales`();
CALL `Mensuales`();
CALL `Anuales`();

-- ******* ELIMINAR *******
DROP TABLE Busquedas;
DROP TABLE Estadisticas_Totales;
DROP TABLE Estadisticas_Semanales;
DROP TABLE Estadisticas_Mensuales;
DROP TABLE Estadisticas_Anuales;
DROP EVENT `Actualizar_Totales`;
DROP EVENT `Actualizar_Semanales`;
DROP EVENT `Actualizar_Mensuales`;
DROP EVENT `Actualizar_Anuales`;
DROP PROCEDURE `Totales`;
DROP PROCEDURE `Semanales`;
DROP PROCEDURE `Mensuales`;
DROP PROCEDURE `Anuales`;

-- ******* CARGAR *******
DESC Busquedas; 
-- CATEGORIAS
INSERT INTO Busquedas(categoria, createdAT, updatedAT)
VALUES ('Hogar', CURDATE(), CURDATE());
INSERT INTO Busquedas(categoria, createdAT, updatedAT)
VALUES ('Hogar', CURDATE(), CURDATE());
INSERT INTO Busquedas(categoria, createdAT, updatedAT)
VALUES ('Hogar', CURDATE(), CURDATE());
INSERT INTO Busquedas(categoria, createdAT, updatedAT)
VALUES ('Mascotas', CURDATE(), CURDATE());
INSERT INTO Busquedas(categoria, createdAT, updatedAT)
VALUES ('Mascotas', CURDATE(), CURDATE());
INSERT INTO Busquedas(categoria, createdAT, updatedAT)
VALUES ('Electrónica', CURDATE(), CURDATE());
SELECT * FROM Busquedas;

-- DEPARTAMENTOS
INSERT INTO Busquedas(depto, createdAT, updatedAT)
VALUES('Fco Morazán', CURDATE(), CURDATE());
INSERT INTO Busquedas(depto, createdAT, updatedAT)
VALUES('Fco Morazán', CURDATE(), CURDATE());
INSERT INTO Busquedas(depto, createdAT, updatedAT)
VALUES('Fco Morazán', CURDATE(), CURDATE());
INSERT INTO Busquedas(depto, createdAT, updatedAT)
VALUES('Fco Morazán', CURDATE(), CURDATE());
INSERT INTO Busquedas(depto, createdAT, updatedAT)
VALUES('La Paz', CURDATE(), CURDATE());
INSERT INTO Busquedas(depto, createdAT, updatedAT)
VALUES('La Paz', CURDATE(), CURDATE());
INSERT INTO Busquedas(depto, createdAT, updatedAT)
VALUES('La Paz', CURDATE(), CURDATE());
INSERT INTO Busquedas(depto, createdAT, updatedAT)
VALUES('Choluteca', CURDATE(), CURDATE());
INSERT INTO Busquedas(depto, createdAT, updatedAT)
VALUES('Choluteca', CURDATE(), CURDATE());
SELECT * FROM Busquedas;




