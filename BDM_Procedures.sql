#Procedure para crear un usuario escuela---------------------------------------------------------------------------------------------------
DROP PROCEDURE sp_RegistroUsuario;

DELIMITER $$
USE `BDM_Linea`$$
CREATE PROCEDURE sp_RegistroUsuario (
 #IN pIdUsEsc bigint unsigned,
 In pNombre varchar(50),
 IN pApellidos varchar(200),
 IN pFechaNac date,
 in pContra varchar(150),
 #IN pRol int, 
 in pEmail varchar(150),
 in pFoto blob)
BEGIN
    insert into usEscuela(idUsEsc, Nombre, Apellidos, FechaNac, Contra, Rol, Email, Foto, FechaMod, nomRol)
    values(default, pNombre, pApellidos, pFechaNac, pContra, 2, pEmail, pFoto, NOW(),'Maestro');
END$$

Call sp_RegistroUsuario('Alejandro','Bazaldua Gomez','1999-01-20','Dinosaurio#99','abgox99@gmail.com','C:\Users\TEMP.DESKTOP-DV3H2OO\Documents\Escuela\Facultad\9 semestre\BDM\PIA\Material para el 1er avance\BDMP_Bazaldua_Silva\fotos\hei.png');
Call sp_RegistroUsuario('Maura','Silva Cantu','1998-03-17','LaRori98#23','mauraSilva@gmail.com','C:\Users\TEMP.DESKTOP-DV3H2OO\Documents\Escuela\Facultad\9 semestre\BDM\PIA\Material para el 1er avance\BDMP_Bazaldua_Silva\fotos\kowalski.png');
Call sp_RegistroUsuario('Fernanda','Estrada Medina','1998-11-02','criminologA#2445','maferEsMe@gmail.com','C:\Users\TEMP.DESKTOP-DV3H2OO\Documents\Escuela\Facultad\9 semestre\BDM\PIA\Material para el 1er avance\BDMP_Bazaldua_Silva\fotos\bobToronja.png');

SELECT * FROM  usEscuela;
SET FOREIGN_KEY_CHECKS = 0; 
TRUNCATE table usEscuela; 

#Procedure para crear un usuario alumno---------------------------------------------------------------------------------------------------
DROP PROCEDURE sp_RegistroUsAlumno;
DELIMITER $$
USE `BDM_Linea`$$
CREATE PROCEDURE sp_RegistroUsAlumno (
 #IN pIdUsEsc bigint unsigned,
 In pNombreEsc varchar(50),
 IN pApellidosEsc varchar(200),
 IN pFechaNacEsc date,
 in pContraEsc varchar(150),
 #IN pRolEsc int, 
 in pEmailEsc varchar(150),
 in pFotoEsc blob)
BEGIN
    insert into usAlumno(idUsuario, Nombre, Apellidos, FechaNac, Contra, Rol, Email, Foto, FechaMod,NomRol)
    values(default, pNombreEsc, pApellidosEsc, pFechaNacEsc, pContraEsc, 1, pEmailEsc, pFotoEsc, NOW(),'Alumno');
END$$
Call sp_RegistroUsAlumno ('Carlos','Llanas Gutierrez','1999-05-12','bersekJoJo#2490','llanasAlCar@gmail.com','C:\Users\TEMP.DESKTOP-DV3H2OO\Documents\Escuela\Facultad\9 semestre\BDM\PIA\Material para el 1er avance\BDMP_Bazaldua_Silva\fotos\bell3.png');
Call sp_RegistroUsAlumno ('Ximena','Gil Garza','1997-04-03','barcoCaribe#45','ximeGil@gmail.com','C:\Users\TEMP.DESKTOP-DV3H2OO\Documents\Escuela\Facultad\9 semestre\BDM\PIA\Material para el 1er avance\BDMP_Bazaldua_Silva\fotos\Erencio.png');
SELECT * FROM  usAlumno;

SET FOREIGN_KEY_CHECKS = 0; 
TRUNCATE table usAlumno; 

#Procedure para  mostrar perfil---------------------------------------------------------------------------------------------------
DROP PROCEDURE sp_MostrarPerfil;
DELIMITER $$
/*USE `BDM_Linea`$$
CREATE PROCEDURE sp_MostrarPerfil (
IN pIdUsEsc bigint unsigned,
OUT pRol int)
BEGIN
DECLARE TheRol int;
    SELECT 
    Nombre, 
    Apellidos, 
	FechaNac as  'Cumpleaños',  
    Email, 
    @Rol,
    foto
   
    From usEscuela
    WHERE pIdUsEsc = idUsEsc;
    
    IF TheRol = 2  THEN
        SET Rol = 'Maestro';
    END IF;

END$$*/

CREATE PROCEDURE sp_MostrarPerfil (
IN pIdUsEsc bigint unsigned)
BEGIN
    SELECT 
    Nombre, 
    Apellidos, 
	FechaNac as  'Cumpleaños',  
    Email, 
    nomRol as 'Rol',
    foto
   
    From usEscuela
    WHERE pIdUsEsc = idUsEsc;

END$$

call sp_MostrarPerfil(1);

DROP PROCEDURE sp_MostrarPerfilAl;
DELIMITER $$
CREATE PROCEDURE sp_MostrarPerfilAl (
IN pIdUsAlum bigint unsigned)
BEGIN
    SELECT 
    Nombre, 
    Apellidos, 
	FechaNac as  'Cumpleaños',  
    Email, 
    nomRol as 'Rol',
    foto
   
    From usAlumno
    WHERE pIdUsAlum = idUsuario;

END$$

call sp_MostrarPerfilAl (1);


