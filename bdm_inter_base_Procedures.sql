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

#Procedure para registrar cursos------------------------------------------------------------------------------------------------------------------
DROP PROCEDURE sp_subirrCurso;
DELIMITER $$
USE `bdm_inter_base`$$
create procedure sp_subirrCurso(
 in pNomCurso varchar(70),
 in pDescCurso varchar(100),
 in pImagCurso mediumblob,
 in pVideoMuestra varchar(900),
 in pCosto float,
 in pCantNivel int,
 in pIdUsEsc int,
 in pIdCatego1 int,
 in pIdCatego2 int
 )
begin
   declare idDelCurso int;    
    insert into Curso(nomCurso, descCurso, imagCurso, videoMuestra, 
    costo, cantNivel, idUsEsc, activo)
    values(pNomCurso, pDescCurso, pImagCurso, pVideoMuestra, 
    pCosto, pCantNivel, pIdUsEsc, 1);
	set idDelCurso = RegistroCateCurso(pIdCatego1, pIdCatego2, pNomCurso, pDescCurso, pCantNivel, pIdUsEsc);     
end$$

CALL `bdm_inter_base`.`sp_subirrCurso`('Aprende con Javascript', 'Aqui aprenderas a usar llavascript', 'cosaX', 'videoMuestra.mp4', 350, 2, 1, 1, 2);

#Procedure para registrar la categoria en el curso----------------------------------------------------------------------------------------------------
DELIMITER $$
USE `bdm_inter_base`$$
create procedure sp_regCursoCategoria(
	in  pIdCatego int,
    in pIdCurso int
    )
begin
    insert into tablaAsociativaCursoCategoria(idCateg, idCurso)
    values(pIdCatego, pIdCurso);
end $$

#Procedure para registrar el nivel individualmente----------------------------------------------------------------------------------------------------
DELIMITER $$
USE `bdm_inter_base`$$
create procedure sp_registrarNivel (
 in pIdCurso int,
 in pNomNivel varchar(200),
 in pVideo varchar(900),
 in pContenido varchar(900),
 in pNumNivel int)
begin
    insert into nivel(idCurso,nomNivel, video, contenido, numNivel, estado)
    values(pIdCurso,pNomNivel,pVideo, pContenido, pNumNivel,1);
end$$
CALL `bdm_inter_base`.`sp_registrarNivel`(1,'Introduccio a Javascript', 'muestra.mp4', 'muestra.txt', 1);

#Procedure para registrar el nivel en el curso------------------------------------------------------------------------------------------
DELIMITER $$
USE `bdm_inter_base`$$
create procedure sp_registroNivelAlCurso( 
in pNomNivel varchar(200),
in pVideoNivel varchar(900),
in pContenido varchar(900),
in pNumNivel int,
in pNomCurso varchar(70),
in pDesCurso varchar(200),
in pCantNivel int,
in pIdUsEsc int
 )
begin
   declare idDelCurso int;    /*mandamos a llamar la funcion para registro del nivel en el curso----------------------------------*/
	set idDelCurso = RegistroNivCurso(pNomNivel,pVideoNivel,pContenido,pNumNivel,pNomCurso,pDesCurso,pCantNivel,pIdUsEsc);     
end$$

#obtener datos de los cursos dependiendo del maestro----------------------------------------------------------------------------

DELIMITER $$
USE `bdm_inter_base`$$
create procedure sp_cursosDeMaestros(
in pIdMaestro int)
begin
	select *
    from CursoCompleto 
    where CursoCompleto.Clave_Profesor = pIdMaestro;
end $$
CALL `bdm_inter_base`.`sp_cursosDeMaestros`(3);

#Procedure para obtener la imagen del curso---------------------------------------------------------------------------------------

DELIMITER $$
USE `bdm_inter_base`$$
create procedure sp_fotoCursos(
in pIdCursoPic int
)
begin
	select imagCurso
    from curso where idCurso=pIdCursoPic;
end $$
CALL `bdm_inter_base`.`sp_fotoCursos`(3);

#Procedure para obtener los datos del curso---------------------------------------------------------------------------------------
DROP PROCEDURE sp_DatosCurso;
DELIMITER $$
USE `bdm_inter_base`$$
create procedure sp_DatosCurso(
in pIdCurso int
)
begin
	select *,
	ROUND( avg(cursoCalificacion.resultado), 2) as "Media" 
    from CursoCompleto left join cursoCalificacion on CursoCompleto.idCurso=cursoCalificacion.idCursoCalif
    where CursoCompleto.idCurso = pIdCurso;
end $$
CALL `bdm_inter_base`.`sp_DatosCurso`(5);

#Procedure para traer los datos del curso-------------------------------------------------------------------------------
DROP PROCEDURE sp_DatosCurso;
DELIMITER $$
USE `bdm_inter_base`$$
create procedure sp_obtenerNiveles(
in pIdCurso int)
begin
	select idNivel, nomNivel , video, numNivel,contenido
    from nivel where idCurso=pIdCurso;
end $$
CALL `bdm_inter_base`.`sp_obtenerNiveles`(3);

DELIMITER $$
USE `bdm_inter_base`$$
create procedure sp_buscarCurso (
in cursoAbuscar varchar(200)
)
begin
    select * from CursoCompleto where nomCurso like cursoAbuscar or 
    Profesor like cursoAbuscar or
    Categorias like cursoAbuscar limit 4;  -- concat(%, _NombreUsuario, %)
end $$

CALL `bdm_inter_base`.`sp_buscarCurso`("Curso de JQuery");

