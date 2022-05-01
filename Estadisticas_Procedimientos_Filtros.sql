USE tienda;
-- // Para poder usar eventos //
SET GLOBAL event_scheduler = ON;
-- // Para desactivar eventos //
-- SET GLOBAL event_scheduler = OFF;

-- ************** TABLAS *************
-- ****************BUSQUEDAS**************************
CREATE TABLE Busquedas(
    idBusqueda BIGINT PRIMARY KEY AUTO_INCREMENT,
    categoria VARCHAR(50),
    depto VARCHAR(50),
    createdAT DATE,
    updatedAT DATE);

-- ****************TOTALES**************************
CREATE TABLE Estadisticas_Totales(
	idET BIGINT PRIMARY KEY AUTO_INCREMENT,
    ventas_T BIGINT,
    categoria_max_T BIGINT,
    nombre_categoria_max_T VARCHAR(50),
    categoria_busq_T BIGINT,
    nombre_categoria_busq_T VARCHAR(50),
    depto_busq_T BIGINT,
    nombre_depto_busq_T VARCHAR(50),
    createdAT DATE,
    updatedAT DATE);

-- ****************SEMANALES**************************
CREATE TABLE Estadisticas_Semanales(
	idES BIGINT PRIMARY KEY AUTO_INCREMENT,
    ventas_S BIGINT,
    categoria_max_S BIGINT,
    nombre_categoria_max_S VARCHAR(50),
    categoria_busq_S BIGINT,
    nombre_categoria_busq_S VARCHAR(50),
    depto_busq_S BIGINT,
    nombre_depto_busq_S VARCHAR(50),
    createdAT DATE,
    updatedAT DATE);

-- ****************MENSUALES**************************
CREATE TABLE Estadisticas_Mensuales(
	idEM BIGINT PRIMARY KEY AUTO_INCREMENT,
    ventas_M BIGINT,
    categoria_max_M BIGINT,
    nombre_categoria_max_M VARCHAR(50),
    categoria_busq_M BIGINT,
    nombre_categoria_busq_M VARCHAR(50),
    depto_busq_M BIGINT,
    nombre_depto_busq_M VARCHAR(50),
    createdAT DATE,
    updatedAT DATE);

-- ****************ANUALES**************************
CREATE TABLE Estadisticas_Anuales(
	idEA BIGINT PRIMARY KEY AUTO_INCREMENT,
    ventas_A BIGINT,
    categoria_max_A BIGINT,
    nombre_categoria_max_A VARCHAR(50),
    categoria_busq_A BIGINT,
    nombre_categoria_busq_A VARCHAR(50),
    depto_busq_A BIGINT,
    nombre_depto_busq_A VARCHAR(50),
    createdAT DATE,
    updatedAT DATE);
-- ***********************************

-- **** PROCEDIMIENTOS ALMACENADOS ***
-- 1. Tabla Totales ************
DELIMITER $$
CREATE PROCEDURE `Totales`()
BEGIN
	DECLARE n_cate, n_cate_busq, n_depto VARCHAR(50);
	DECLARE tot_ventas, tot_categoria, tot_cate_busq, tot_depto BIGINT;
    DECLARE VACIO INTEGER;
    
    SELECT count(*) INTO VACIO FROM Estadisticas_Totales;
    
    SELECT COUNT(idVenta) INTO tot_ventas FROM Venta;
    
    SELECT categoria, COUNT(categoria) AS maximo INTO n_cate, tot_categoria
    FROM Venta
    GROUP BY categoria ORDER BY maximo DESC LIMIT 1; 
    
    SELECT categoria, COUNT(categoria) AS max INTO n_cate_busq, tot_cate_busq
    FROM Busquedas
	GROUP BY categoria ORDER BY max DESC LIMIT 1;

	SELECT depto, COUNT(depto) AS max INTO n_depto, tot_depto
    FROM Busquedas
	GROUP BY depto ORDER BY max DESC LIMIT 1;
    
    INSERT INTO Estadisticas_Totales 
    (ventas_T, categoria_max_T, nombre_categoria_max_T,
	categoria_busq_T, nombre_categoria_busq_T, depto_busq_T, nombre_depto_busq_T, createdAT, 
    updatedAT) 
	VALUES (tot_ventas, tot_categoria, n_cate, tot_cate_busq, n_cate_busq,
    tot_depto, n_depto, CURDATE(), CURDATE());
END$$
DELIMITER ;

-- 2. Tabla Semanales ************
DELIMITER $$
CREATE PROCEDURE `Semanales`()
BEGIN
	DECLARE n_cate, n_cate_busq, n_depto VARCHAR(50);
	DECLARE tot_ventas, tot_categoria, tot_cate_busq, tot_depto BIGINT;
    
    SELECT COUNT(idVenta) INTO tot_ventas 
    FROM Venta WHERE yearweek(createdAT) = yearweek(CURDATE() 
    AND YEAR(createdAT) = YEAR(CURDATE()));
    
    SELECT categoria, COUNT(categoria) AS maximo INTO n_cate, tot_categoria
    FROM Venta WHERE yearweek(createdAT) = yearweek(CURDATE()) 
    AND YEAR(createdAT) = YEAR(CURDATE())
    GROUP BY categoria ORDER BY maximo DESC LIMIT 1; 
    
    SELECT categoria, COUNT(categoria) AS max INTO n_cate_busq, tot_cate_busq
    FROM Busquedas WHERE yearweek(createdAT) = yearweek(CURDATE())
    AND YEAR(createdAT) = YEAR(CURDATE())
	GROUP BY categoria ORDER BY max DESC LIMIT 1;

	SELECT depto, COUNT(depto) AS max INTO n_depto, tot_depto
    FROM Busquedas WHERE yearweek(createdAT) = yearweek(CURDATE())
    AND YEAR(createdAT) = YEAR(CURDATE())
	GROUP BY depto ORDER BY max DESC LIMIT 1;
    
    INSERT INTO Estadisticas_Semanales
    (ventas_S, categoria_max_S, nombre_categoria_max_S,
	categoria_busq_S, nombre_categoria_busq_S, depto_busq_S, nombre_depto_busq_S, createdAT,
    updatedAT) 
	VALUES (tot_ventas, tot_categoria, n_cate, tot_cate_busq, n_cate_busq,
    tot_depto, n_depto, CURDATE(), CURDATE());
END$$
DELIMITER ;

-- 3. Tabla Mensuales ************
DELIMITER $$
CREATE PROCEDURE `Mensuales`()
BEGIN
	DECLARE n_cate, n_cate_busq, n_depto VARCHAR(50);
	DECLARE tot_ventas, tot_categoria, tot_cate_busq, tot_depto BIGINT;
    
    SELECT COUNT(idVenta) INTO tot_ventas FROM Venta
    WHERE MONTH(createdAT) = MONTH(CURDATE()) AND YEAR(createdAT) = YEAR(CURDATE());
    
    SELECT categoria, COUNT(categoria) AS maximo INTO n_cate, tot_categoria
    FROM Venta WHERE MONTH(createdAT) = MONTH(CURDATE())
    AND YEAR(createdAT) = YEAR(CURDATE())
    GROUP BY categoria ORDER BY maximo DESC LIMIT 1; 
    
    SELECT categoria, COUNT(categoria) AS max INTO n_cate_busq, tot_cate_busq
    FROM Busquedas WHERE MONTH(createdAT) = MONTH(CURDATE())
    AND YEAR(createdAT) = YEAR(CURDATE())
	GROUP BY categoria ORDER BY max DESC LIMIT 1;

	SELECT depto, COUNT(depto) AS max INTO n_depto, tot_depto
    FROM Busquedas WHERE MONTH(createdAT) = MONTH(CURDATE())
    AND YEAR(createdAT) = YEAR(CURDATE())
	GROUP BY depto ORDER BY max DESC LIMIT 1;
    
    INSERT INTO Estadisticas_Mensuales 
    (ventas_M, categoria_max_M, nombre_categoria_max_M,
	categoria_busq_M, nombre_categoria_busq_M, depto_busq_M, nombre_depto_busq_M, createdAT,
    updatedAT) 
	VALUES (tot_ventas, tot_categoria, n_cate, tot_cate_busq, n_cate_busq,
    tot_depto, n_depto, CURDATE(), CURDATE());
END$$
DELIMITER ;

-- 4. Tabla Anuales ************
DELIMITER $$
CREATE PROCEDURE `Anuales`()
BEGIN
	DECLARE n_cate, n_cate_busq, n_depto VARCHAR(50);
	DECLARE tot_ventas, tot_categoria, tot_cate_busq, tot_depto BIGINT;
    
    SELECT COUNT(idVenta) INTO tot_ventas FROM Venta
    WHERE YEAR(createdAT) = YEAR(CURDATE());
    
    SELECT categoria, COUNT(categoria) AS maximo INTO n_cate, tot_categoria
    FROM Venta WHERE YEAR(createdAT) = YEAR(CURDATE())
    GROUP BY categoria ORDER BY maximo DESC LIMIT 1; 
    
	SELECT categoria, COUNT(categoria) AS max INTO n_cate_busq, tot_cate_busq
    FROM Busquedas WHERE YEAR(createdAT) = YEAR(CURDATE())
	GROUP BY categoria ORDER BY max DESC LIMIT 1;

	SELECT depto, COUNT(depto) AS max INTO n_depto, tot_depto
    FROM Busquedas WHERE YEAR(createdAT) = YEAR(CURDATE())
	GROUP BY depto ORDER BY max DESC LIMIT 1;
    
    INSERT INTO Estadisticas_Anuales 
    (ventas_A, categoria_max_A, nombre_categoria_max_A,
	categoria_busq_A, nombre_categoria_busq_A, depto_busq_A, nombre_depto_busq_A, createdAT,
    updatedAT) 
	VALUES (tot_ventas, tot_categoria, n_cate, tot_cate_busq, n_cate_busq,
    tot_depto, n_depto, CURDATE(), CURDATE());
END$$
DELIMITER ;

-- ***********************************
-- ******* EVENTOS / JOBS ************
-- 1. ACTUALIZAR TOTALES ************
DELIMITER $$
CREATE EVENT `Actualizar_Totales`
ON SCHEDULE EVERY 3 DAY STARTS current_timestamp()
ON COMPLETION PRESERVE
DO
BEGIN
	CALL `Totales`();
END$$
DELIMITER ;

-- 2. ACTUALIZAR SEMANALES ************
DELIMITER $$
CREATE EVENT `Actualizar_Semanales`
ON SCHEDULE EVERY 7 DAY STARTS current_timestamp()
ON COMPLETION PRESERVE
DO
BEGIN
	CALL `Semanales`();
END$$
DELIMITER ;

-- 3. ACTUALIZAR MENSUALES ************
DELIMITER $$
CREATE EVENT `Actualizar_Mensuales`
ON SCHEDULE EVERY 1 MONTH STARTS current_timestamp()
ON COMPLETION PRESERVE
DO
BEGIN
	CALL `Mensuales`();
END$$
DELIMITER ;

-- 4. ACTUALIZAR ANUALES ************
DELIMITER $$
CREATE EVENT `Actualizar_Anuales`
ON SCHEDULE EVERY 1 YEAR STARTS current_timestamp()
ON COMPLETION PRESERVE
DO
BEGIN
	CALL `Anuales`();
END$$
DELIMITER ;
-- ***********************************
