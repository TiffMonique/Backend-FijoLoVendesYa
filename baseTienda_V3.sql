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
    foreign key(idRol) references Roles(idRol));
    
-- **************DENUNCIAS*********************
create table Denuncias(
	idDenuncia int primary key auto_increment,
	idUsuario int not null,
	contenido varchar(255) not null,
	denunciado int not null,
	estado bool not null,
	createdAT DATE,
	updatedAT DATE,
	foreign key(idUsuario) references Usuarios(idUsuarios));
    
-- **************CATEGORIAS*********************
create table Categorias(
	nombre varchar(50) primary key,
	descripcion varchar(255),
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
	foreign key(idUsuario) references Usuarios(idUsuarios),
	foreign key(categoria) references Categorias(nombre));
    
-- ***************FOTOSVENTA********************
create table fotosVentas(
	nombre varchar(100) primary key,
    idVenta bigint,
    createdAT DATE,
	updatedAT DATE,
    foreign key(idVenta) references Venta(idVenta)
    MATCH SIMPLE ON DELETE CASCADE);

-- **************CALIFICACIONES*********************
create table Calificaciones(	
	idCalificacion int primary key auto_increment,
	calificacion int,
	idVenta bigInt,
	createdAT DATE,
	updatedAT DATE,
	foreign key(idVenta) references Venta(idVenta));
    
-- ************ANUNCIOS***********************
create table Anuncios(
	idAnuncio bigint primary key auto_increment,
	idVenta bigint not null,
	fechaInicio datetime not null,
	fechaFin datetime not null,
	descripcion varchar(1000),
    createdAT DATE,
	updatedAT DATE,
	foreign key(idVenta) references Venta(idVenta));
    
-- *************SUSCRIPCIONES**********************
create table Suscripciones(
	idSuscripcion bigint primary key auto_increment,
	idUsuario int not null,
	idCategoria varchar(50) not null,
	fecha datetime not null,
	createdAT DATE,
	updatedAT DATE,
	foreign key(idUsuario) references Usuarios(idUsuarios),
	foreign key(idCategoria) references Categorias(nombre));
    
