/*drop database tienda;*/
create database tienda;
use tienda;

create table Roles(
	idRol int primary key, 
    nombre varchar(50) not null,  
    permisos varchar(100),
    createdAT DATE,
    updatedAT DATE);
INSERT INTO Roles 
VALUES(1, 'Adminisitrador', 'Editar aplicacion', NULL, NULL);
INSERT INTO Roles 
VALUES(2, 'Vendedor', 'publicar ventas en la apliacion', NULL, NULL);
SELECT * FROM Roles;


create table Usuarios(
	idUsuarios int primary key auto_increment, 
    nombre varchar(60) not null, 
    apellido varchar(60) not null, 
    correo varchar(120) not null unique, 
    telefono varchar(20) not null, 
    pass varchar(150) not null, 
    direccion varchar(250), 
    departamento varchar(50),
    imagen bit,
    idRol int not null, 
    createdAT DATE,
    updatedAT DATE,
    foreign key(idRol) references Roles(idRol));
INSERT INTO Usuarios (
nombre, apellido, correo, telefono, pass, direccion, departamento, imagen, idRol, createdAT, updatedAT)
VALUES ('Wilmer','Garcia','WilmerGarcia10@gmail.com','32456789','12345WG','Comayagua','Comayagua',0,2,NULL,NULL);
INSERT INTO Usuarios (
nombre, apellido, correo, telefono, pass, direccion, departamento, imagen, idRol, createdAT, updatedAT)
VALUES ('Gerson','Castillo','GersonCastillo10@gmail.com','88652109','54321GC','Distrito Central','Fco Morazan',0,2,NULL,NULL);
INSERT INTO Usuarios (
nombre, apellido, correo, telefono, pass, direccion, departamento, imagen, idRol, createdAT, updatedAT)
VALUES ('Tiffany ','Matamoros','tmonique@gmail.com','88652109','PASsword1','Distrito Central','Fco Morazan',0,2,NULL,NULL);
SELECT * FROM Usuarios;
Update Usuarios set correo = "tmonique@gmail.com" where idUsuarios = 4;
Delete from Usuarios where idUsuarios = 3;
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

create table Categorias(
	nombre varchar(50) primary key,
	descripcion varchar(255),
	createdAT DATE,
	updatedAT DATE);
INSERT INTO Categorias 
VALUES ("Hogar", "Descripcion de Hogar", null, null);
INSERT INTO Categorias 
VALUES ("Cosmeticos", "Descripcion de cosmeticos", null, null);
INSERT INTO Categorias 
VALUES ("Vehiculos", "Descripcion de vehiculos", null, null);
SELECT * FROM Categorias;

create table Venta(
	idVenta bigint primary key auto_increment,
	idUsuario int not null,
	estado bool not null,
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
SELECT * FROM Venta;
insert into Venta 
values(1, 1, true, "Mesa", 1, "Comedor", "Hogar", 100.5, 22/03/2022, null, null);

create table Calificaciones(	
	idCalificacion int primary key auto_increment,
	calificacion int,
	idVenta bigInt,
	createdAT DATE,
	updatedAT DATE,
	foreign key(idVenta) references Venta(idVenta));
                            
insert into Calificaciones values (1, 5, 1, null, null);
select * from venta;
/*create table DetalleVenta(
					idDetalleVenta int primary key auto_increment,
                    idVenta bigint not null,
                    producto varchar(100) not null,
                    cantidad int not null,
                    descripcion varchar(1000),
                    categoria int not null,
                    precio float not null,
                    fechaPublicacion date not null,
                    ubicacion int not null,
                    
                    foreign key(idVenta) references Venta(idVenta),
                    foreign key(categoria) references Categorias(idCategoria),
                    foreign key(ubicacion) references Ubicaciones(idUbicacion));*/

create table Anuncios(
	idAnncio bigint primary key auto_increment,
	idVenta bigint not null,
	fechaInicio datetime not null,
	fechaFin datetime not null,
	descripcion varchar(1000),
    createdAT DATE,
	updatedAT DATE,
	foreign key(idVenta) references Venta(idVenta));

create table Suscripciones(
	idSuscripcion bigint primary key auto_increment,
	idUsuario int not null,
	idCategoria varchar(50) not null,
	fecha datetime not null,
	createdAT DATE,
	updatedAT DATE,
	foreign key(idUsuario) references Usuarios(idUsuarios),
	foreign key(idCategoria) references Categorias(nombre));
              
/*create table Ubicaciones(
	idUbicacion int primary key,
	nombreDepto varchar(20) not null,
	direccion varchar(1000) not null);*/
                    
                    

SELECT * FROM Usuarios inner join roles on Roles.idRol = Usuarios.idRol WHERE correo = "tmonique@gmail.com"