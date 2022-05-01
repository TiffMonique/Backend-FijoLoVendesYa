CREATE DATABASE tienda;
USE tienda;

-- *************ROLES**********************
create table Roles(
	idRol int primary key, 
    nombre varchar(50) not null,  
    permisos varchar(100),
    createdAT date,
    updatedAT date);

-- **************USUARIOS**********************    
create table Usuarios(
	idUsuarios int primary key auto_increment,
    nombre varchar(60) not null, 
    apellido varchar(60) not null, 
    correo varchar(120) not null unique, 
    telefono varchar(20) not null, 
    pass varchar(150) not null, 
    direccion varchar(250), 
    departamento varchar(50),
    idRol int not null, 
    token varchar(20),
    createdAT date,
    updatedAT date,
    foreign key(idRol) references Roles(idRol)
    MATCH SIMPLE ON DELETE CASCADE);
    
-- **************DENUNCIAS*********************
create table Denuncias(
	idDenuncia int primary key auto_increment,
	idUsuario int not null,
	motivo varchar(50) not null,
	contenido varchar(255) not null,
	denunciado int not null,
	createdAT DATE,
	updatedAT DATE,
	foreign key(idUsuario) references Usuarios(idUsuarios));
    MATCH SIMPLE ON DELETE CASCADE);
    
-- **************CATEGORIAS*********************
create table Categorias(
	nombre varchar(50) primary key,
	descripcion varchar(255),
	foto: varchar(100),
	createdAT DATE,
	updatedAT DATE);
    
-- ***************VENTA********************
create table Venta(
	idVenta bigint primary key auto_increment,
	idUsuario int not null,
	estado varchar(20),
	producto varchar(100) not null,
	cantidad int not null,
	descripcion varchar(1000),
	categoria varchar(50) not null,
	precio float not null,
	fechaPublicacion date not null,
	createdAT DATE,
	updatedAT DATE,
	foreign key(idUsuario) references Usuarios(idUsuarios)
    MATCH SIMPLE ON DELETE CASCADE,
	foreign key(categoria) references Categorias(nombre)
    MATCH SIMPLE ON DELETE CASCADE);
    
-- ***************FOTOSVENTA********************
create table fotosVentas(
	nombre varchar(100) primary key,
    idVenta bigint,
	indice int,
    createdAT DATE,
	updatedAT DATE,
    foreign key(idVenta) references Venta(idVenta)
    MATCH SIMPLE ON DELETE CASCADE);

-- **************CALIFICACIONES*********************
create table Calificaciones(	
	idCalificacion int primary key auto_increment,
	calificacion int,
	idVenta bigInt,
	idUsuario int,
	createdAT DATE,
	updatedAT DATE,
	foreign key(idVenta) references Venta(idVenta)
    MATCH SIMPLE ON DELETE CASCADE);
    
-- ************ANUNCIOS***********************
create table Anuncios(
	idAnuncio bigint primary key auto_increment,
	idVenta bigint not null,
	fechaInicio datetime not null,
	fechaFin datetime not null,
	descripcion varchar(1000),
    createdAT DATE,
	updatedAT DATE,
	foreign key(idVenta) references Venta(idVenta)
    MATCH SIMPLE ON DELETE CASCADE);
    
-- *************SUSCRIPCIONES**********************
create table Suscripciones(
	idSuscripcion bigint primary key auto_increment,
	idUsuario int not null,
	idCategoria varchar(50) not null,
	fecha datetime not null,
	createdAT DATE,
	updatedAT DATE,
	foreign key(idUsuario) references Usuarios(idUsuarios)
    MATCH SIMPLE ON DELETE CASCADE,
	foreign key(idCategoria) references Categorias(nombre)
    MATCH SIMPLE ON DELETE CASCADE);
    
-- ****************Favoritos**************************
create table Favoritos(
	idLista BIGINT PRIMARY KEY AUTO_INCREMENT,
    idUsuario INT,
    idVenta BIGINT,
    createdAT DATE,
    updatedAT DATE,
    FOREIGN KEY(idUsuario) REFERENCES Usuarios(idUsuarios) 
    MATCH SIMPLE ON DELETE CASCADE,
    FOREIGN KEY(idVenta) REFERENCES Venta(idVenta) 
    MATCH SIMPLE ON DELETE CASCADE);

-- ****************Sesiones**************************
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
)
    
-- ****************Chats**************************
CREATE TABLE `chats` (
  `idChat` bigint NOT NULL AUTO_INCREMENT,
  `idVendedor` int DEFAULT NULL,
  `idCliente` int DEFAULT NULL,
  `sinleer` tinyint DEFAULT NULL,
  `createdAT` date DEFAULT NULL,
  `updatedAT` date DEFAULT NULL,
  PRIMARY KEY (`idChat`),
  KEY `idVendedor` (`idVendedor`),
  KEY `idCliente` (`idCliente`),
  CONSTRAINT `chats_ibfk_1` FOREIGN KEY (`idVendedor`) REFERENCES `usuarios` (`idUsuarios`),
  CONSTRAINT `chats_ibfk_2` FOREIGN KEY (`idCliente`) REFERENCES `usuarios` (`idUsuarios`)
)

-- ****************Mensajes**************************
CREATE TABLE `mensajes` (
  `idMensaje` bigint NOT NULL AUTO_INCREMENT,
  `idUsuario` int DEFAULT NULL,
  `idChat` bigint DEFAULT NULL,
  `mensaje` varchar(1000) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `tipo` varchar(45) NOT NULL DEFAULT 'texto',
  `createdAT` date DEFAULT NULL,
  `updatedAT` date DEFAULT NULL,
  PRIMARY KEY (`idMensaje`),
  KEY `idUsuario` (`idUsuario`),
  KEY `mensajes_ibfk_2` (`idChat`),
  CONSTRAINT `mensajes_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuarios`),
  CONSTRAINT `mensajes_ibfk_2` FOREIGN KEY (`idChat`) REFERENCES `chats` (`idChat`) ON DELETE CASCADE
) 