#Procedures de la base de datos------------------------------------------------------------------------------------------------------------
DROP PROCEDURE sp_crearCategoria;
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

#SP para el login-------------------------------------------------------------------------------------------------------------------
DELIMITER $$
USE `bdm_inter_base`$$
create procedure sp_iniSesion (
  in pEmail varchar(150),
 in  pContra varchar(150))
begin
	select idUser, nombre, apellidos, FechaNac, rol, foto from usuarios 
    where pEmail=email and pContra=contra;
END$$

call sp_iniSesion('charles@gmail.com','123456789#Q');

#Procedure para editar el usuario--------------------------------------------------------------------------------------------------------
DELIMITER $$
USE `bdm_inter_base`$$
create procedure sp_editarUsuario (
in pIdUs BIGINT UNSIGNED, 
in pNombre varchar(50),
 in pApellidos varchar(150),
 in pEmail varchar(150),
 in pContra varchar(150),
 in pImagen mediumblob)
begin
	update usuarios 
    set 
    nombre= pNombre,
    apellidos= pApellidos,
     email= pEmail,
    contra= pContra, 
    foto= pImagen where idUser= pIdUs;
end$$
#Procedure para registrar categoria----------------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
USE `bdm_inter_base`$$
create procedure sp_crearCategoria (
	in  pNombre varchar(100),
    in  pDesc varchar(200),
    in pUser int
    )
begin
    insert into cate_Curso(nomCateg, descCateg, idUsCat, fechaCreat, activa)
    values(pNombre, pDesc,  pUser, Now(),1);
end $$

#Procedure para seleccionar categoria----------------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
USE `bdm_inter_base`$$
create procedure sp_obtenCategoria()
begin
	select idCateg, nomCateg
    from cate_Curso;
end $$