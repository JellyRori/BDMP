#Procedures de la base de datos------------------------------------------------------------------------------------------------------------
DROP PROCEDURE sp_registrarUsuario;
DELIMITER $$
USE `bdm_inter_base`$$
create procedure sp_registrarUsuario (
 in pNombre varchar(50),
 in pApellidos varchar(150),
 IN pFechaNac date,
 in pEmail varchar(150),
 in pContra varchar(150),
 in pRol bool,
 in pFoto mediumblob)
begin
    
    INSERT INTO usuarios(nombre,apellidos,FechaNac,email,contra,rol,foto,activo)
		VALUES(pNombre, pApellidos, pFechaNac, pEmail, pContra, pRol, pFoto, 1);
END$$

CALL `bdm_inter_base`.`registrarUsuario`(<{in pNombre varchar(50)}>, <{in pApellidos varchar(150)}>, <{IN pFechaNac date}>, <{in pEmail varchar(150)}>, <{in pContra varchar(150)}>, <{in pRol bool}>, <{in pFoto mediumblob}>);
