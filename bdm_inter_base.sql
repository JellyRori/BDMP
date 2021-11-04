CREATE DATABASE bdm_inter_base;
use bdm_inter_base;
DROP DATABASE bdm_inter_base; #CUDADO CON ESTA LINEA, solo usar cuando tengas que recrear tablas si no quieres alterar campo X campo-----------------

#Creando tabla de usuarios (decidimos juntarlas por la redundancia de datos)--------------------------------------------------------------------------
create table IF NOT  EXISTS usuarios(
	idUser BIGINT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    nombre varchar(50) NOT NULL,
    apellidos varchar (150) NOT NULL,
    FechaNac date,
    email varchar(150) NOT NULL UNIQUE, 
    contra varbinary(150) NOT NULL,
    rol bool,
    foto mediumblob NOT NULL,  
	activo bool DEFAULT NULL
);

#Creando tabla de categorias-------------------------------------------------------------------------------------------------------------------------
create Table IF NOT  EXISTS cate_Curso(
	idCateg BIGINT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    nomCateg varchar(100) UNIQUE, 
    descCateg varchar(200),
    idUsCat BIGINT UNSIGNED,
    fechaCreat DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    activa bool DEFAULT NULL,
	CONSTRAINT `FK_Us_Categ` FOREIGN KEY (idUsCat) REFERENCES usuarios(idUser)
);
alter table cate_Curso add fechaCreat DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
alter table cate_curso drop column fechaCreat;
ALTER TABLE cate_Curso
  DROP COLUMN column_name;



#Creando tabla de cursos------------------------------------------------------------------------------------------------------------------------------
create Table IF NOT  EXISTS curso(
	idCurso BIGINT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    nomCurso varchar(70) NOT NULL UNIQUE,
    descCurso varchar(200) NOT NULL,
    imagCurso mediumblob NOT NULL,
    videoMuestra varchar(900) NOT NULL,
    costo FLOAT NOT NULL,
    cantNivel INT NOT NULL,
    idUsEsc BIGINT UNSIGNED,
    activo BOOL DEFAULT NULL,
    CONSTRAINT `FK_Us_Curso` FOREIGN KEY (idUsEsc) REFERENCES Usuarios(idUser)
);

#Creando tabla de niveles------------------------------------------------------------------------------------------------------------------------------
create Table IF NOT  EXISTS nivel(
	idNivel BIGINT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    idCurso BIGINT UNSIGNED,
    nomNivel varchar(200) not null,
    descNivel varchar(150) NOT NULL,
    video varchar(900) NOT NULL,
    contenido varchar(900),
	numNivel int NOT NULL,
    estado bool DEFAULT NULL,
    CONSTRAINT `FK_Niv_Cursos` FOREIGN KEY (idCurso) REFERENCES curso(idCurso)
);
alter table nivel drop column descNivel;
ALTER TABLE nivel DROP COLUMN idCateg;
#Creando tabla de comentarios------------------------------------------------------------------------------------------------------------------------------
create Table IF NOT EXISTS comentario(
	idComent BIGINT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    idEstado BIGINT UNSIGNED,
    idCurso BIGINT UNSIGNED,
    contenido varchar(250) NOT NULL,
    fechaPub TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
   CONSTRAINT `FK_Com_Estado` FOREIGN KEY (idEstado) REFERENCES usuarios(idUser),
   CONSTRAINT `FK_Com_Curso` FOREIGN KEY (idCurso) REFERENCES curso(idCurso)
);

#Creando tabla de historial------------------------------------------------------------------------------------------------------------------------------
create Table IF NOT  EXISTS historial(
	idHistorial BIGINT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    idEstado BIGINT UNSIGNED,
    idCurso BIGINT UNSIGNED,
    progreso int,
	CONSTRAINT `FK_hist_User` FOREIGN KEY (idEstado) references Usuarios(idUser),
	CONSTRAINT `FK_hist_Curso` FOREIGN KEY (idCurso) references Curso(idCurso)
);
ALTER TABLE historial DROP COLUMN cursoTerm;

#Creando tabla de mensajes------------------------------------------------------------------------------------------------------------------------------
create table IF NOT  EXISTS Mensajes(
	idMensaje BIGINT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    idEnvia BIGINT UNSIGNED,
    idRecive BIGINT UNSIGNED,
    contenido varchar(500) NOT NULL,
	fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    CONSTRAINT `FK_Mens_Envia` FOREIGN KEY (idEnvia) REFERENCES usuarios(idUser),
	CONSTRAINT `FK_Mens_Recibe` FOREIGN KEY(idRecive) REFERENCES usuarios(idUser)
);
ALTER TABLE historial DROP COLUMN idUsuario;
ALTER TABLE historial DROP COLUMN idUsEsc;
ALTER TABLE historial DROP COLUMN contenido;
ALTER TABLE Mensajes ADD COLUMN idEnvia BIGINT UNSIGNED;
ALTER TABLE Mensajes ADD COLUMN idRecive BIGINT UNSIGNED;
ALTER TABLE Mensajes ADD COLUMN contenido varchar(500) NOT NULL;

#Creando tabla de calificar curso------------------------------------------------------------------------------------------------------------------------------
create table IF NOT  EXISTS cursoCalificacion(
	idCalificacion int NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    idUsAlumnoCalif BIGINT UNSIGNED,
    idCursoCalif BIGINT UNSIGNED,
    resultado INT DEFAULT 0,
    CONSTRAINT `FK_Calif_Alumno` FOREIGN KEY(idUsAlumnoCalif) REFERENCES Usuarios(idUser),
	CONSTRAINT `FK_Calif_Curso` FOREIGN KEY (idCursoCalif) REFERENCES Curso(idCurso)
);
#Tabla para la inscripcion del curso-------------------------------------------------------------------------------------------------------------------------
create table IF NOT  EXISTS pagoCurso(
	idInscript int NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    idUsuario BIGINT UNSIGNED,
    idCurso BIGINT UNSIGNED,
    terminado bool DEFAULT 0,
    CONSTRAINT `FK_pago_User` FOREIGN KEY(idUsuario) REFERENCES Usuarios(idUser),
	CONSTRAINT `FK_pago_Curso` FOREIGN KEY (idCurso) REFERENCES Curso(idCurso)
);
ALTER TABLE pagoCurso DROP COLUMN monto;
ALTER TABLE pagoCurso DROP COLUMN metodo;
DROP TABLE pagoCurso;
#Creando una tabla asociativa entre el curso y la categoría-------------------------------------------------------------------------------------------------
create table IF NOT  EXISTS tablaAsociativaCursoCategoria(
	idTablaAsoursCat int NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    idCateg BIGINT UNSIGNED,
    idCurso BIGINT UNSIGNED,
   CONSTRAINT `FK_Aso_Categ` FOREIGN KEY (idCateg) REFERENCES cate_Curso(idCateg),
   CONSTRAINT `FK_Aso_Curso` FOREIGN KEY(idCurso) REFERENCES curso(idCurso)
);
#Selects para revisar que las tablas tengan contenido-------------------------------------------------------------------------------------------------
select * from Usuarios;
select * from cate_Curso;
select*from curso;
select*from nivel;
select*from comentario;
select*from historial;
select*from mensajes;
select * from pagoCurso;