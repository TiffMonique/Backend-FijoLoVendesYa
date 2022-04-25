USE tienda;
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