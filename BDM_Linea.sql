CREATE DATABASE BDM_Linea;
use BDM_Linea;


Create Table IF NOT  EXISTS usEscuela(
idUsEsc bigint  unsigned auto_increment not null primary key,
Nombre varchar(50) not null,
Apellidos varchar(200) not null,
FechaNac date,
Contra varchar(150) not null,
Rol  int,
Email varchar(150) not null,
Foto blob,
FechaMod DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
alter table usEscuela add nomRol varchar(15);
alter table usEscuela drop CURP;

Create Table IF NOT  EXISTS usAlumno(
idUsuario bigint unsigned auto_increment not null primary key,
Nombre varchar(50) not null,
Apellidos varchar(200) not null,
FechaNac date,
Contra varchar(150) not null,
Rol  int not null,
Email varchar(150) not null,
Foto blob,
FechaMod DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
alter table usAlumno add nomRol varchar(15);


Create Table IF NOT  EXISTS categoria(
idCateg bigint unsigned auto_increment not null primary key,
descCateg varchar(250) not null,
FechaCreat DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
idUsEsc bigint unsigned,
CONSTRAINT FK_IdUserEsc FOREIGN KEY (idUsEsc)
    REFERENCES usEscuela(idUsEsc)
);

Create Table IF NOT  EXISTS curso(
idCurso bigint unsigned auto_increment not null primary key,
nomCurso varchar(100) not null,
descrip varchar(250) not null,
costo float not null,
imagen blob,
material TEXT,
Calificacion int,
idUsEsc bigint unsigned,
CONSTRAINT FK_IdUserEscCom FOREIGN KEY (idUsEsc)
    REFERENCES usEscuela(idUsEsc)
);

Create Table IF NOT  EXISTS cate_Curso(
idCurso bigint unsigned not null,
idCateg bigint unsigned not null,
PRIMARY KEY (idCurso,idCateg),
  KEY fk_Cate_Cursos_Categ (idCateg),
  CONSTRAINT fk_Cate_Cursos_Categ  FOREIGN KEY (idCateg) REFERENCES categoria (idCateg) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_Cate_Cursos_Curso FOREIGN KEY (idCurso) REFERENCES curso (idCurso) ON DELETE RESTRICT ON UPDATE CASCADE

);

Create Table IF NOT  EXISTS nivel(
idNivel bigint unsigned auto_increment not null primary key,
nomNivel varchar(100),
idCurso bigint unsigned not null,
idCateg bigint unsigned not null,
video blob,
descrip varchar(250),
Estado BOOLEAN,
CONSTRAINT `fk_Cate_Cursos` FOREIGN KEY (idCateg,idCurso) REFERENCES cate_Curso(idCateg,idCurso)
);

Create Table certificado(
idCertid bigint unsigned auto_increment primary key,
FechaObtain DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
idUsuario bigint unsigned,
idCurso bigint unsigned,
CONSTRAINT FK_IdUsCertif FOREIGN KEY (idUsuario)
    REFERENCES usAlumno(idUsuario),
CONSTRAINT FK_IdCursCertif FOREIGN KEY (idCurso)
    REFERENCES curso(idCurso)
);

Create Table comentario(
idComent bigint unsigned auto_increment primary key,
contenido Text,
idUsuario bigint unsigned,
idCurso bigint unsigned,
CONSTRAINT FK_IdUsComent FOREIGN KEY (idUsuario)
    REFERENCES usAlumno(idUsuario),
CONSTRAINT FK_IdCursComent FOREIGN KEY (idCurso)
    REFERENCES curso(idCurso)
);

Create Table mensajes(
idMensaje bigint unsigned auto_increment primary key,
contenido Text,
idUsuario bigint unsigned,
idUsEsc bigint unsigned,
CONSTRAINT FK_IdUsMessa FOREIGN KEY (idUsuario)
    REFERENCES usAlumno(idUsuario),
    CONSTRAINT FK_IdEscMessa FOREIGN KEY (idUsEsc)
    REFERENCES usEscuela(idUsEsc)
);
DROP TABLE  ventas;

Create Table IF NOT  EXISTS ventas(
idCurso bigint unsigned not null,
idUsEsc bigint unsigned not null,
CantAlum bigint unsigned ,
IngTotal float ,
TotalVentas float,
PRIMARY KEY (idCurso,idUsEsc),
  KEY fk_Vent_Cursos (idUsEsc),
  CONSTRAINT fk_Vent_Cursos_Curso FOREIGN KEY (idCurso) REFERENCES curso (idCurso) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_Vent_Cursos_Us  FOREIGN KEY (idUsEsc) REFERENCES usEscuela (idUsEsc) ON DELETE RESTRICT ON UPDATE CASCADE
);

/*Tablas asociativas-------------------------------------*/
Create Table IF NOT  EXISTS pagoCurso(
idCurso bigint unsigned not null,
idUsuario bigint unsigned not null,
monto bigint unsigned ,
metodo int,
PRIMARY KEY (idCurso,idUsuario),
  KEY fk_Pay_Cursos (idUsuario),
  CONSTRAINT fk_Pay_Cursos_Curso FOREIGN KEY (idCurso) REFERENCES curso (idCurso) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_Pay_Cursos_Us  FOREIGN KEY (idUsuario) REFERENCES usAlumno (idUsuario) ON DELETE RESTRICT ON UPDATE CASCADE
);

Create Table IF NOT  EXISTS pagoNivel(
idNivel bigint unsigned not null,
idUsuario bigint unsigned not null,
monto bigint unsigned ,
metodo int,
PRIMARY KEY (idNivel,idUsuario),
  KEY fk_Pay_Nivel (idUsuario),
  CONSTRAINT fk_Pay_Nivel_Niv FOREIGN KEY (idNivel) REFERENCES nivel(idNivel) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_Pay_Nivel_Us  FOREIGN KEY (idUsuario) REFERENCES usAlumno (idUsuario) ON DELETE RESTRICT ON UPDATE CASCADE
);
DROP TABLE  pago;
Create Table IF NOT  EXISTS historial(
idCurso bigint unsigned not null,
idUsuario bigint unsigned not null,
fechaInsc DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
cursoTerm float,
progreso float,
PRIMARY KEY (idCurso,idUsuario),
  KEY fk_hist_Cursos (idUsuario),
  CONSTRAINT fk_hist_Cursos_Curso FOREIGN KEY (idCurso) REFERENCES curso (idCurso) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_hist_Cursos_User  FOREIGN KEY (idUsuario) REFERENCES usAlumno (idUsuario) ON DELETE RESTRICT ON UPDATE CASCADE
);





