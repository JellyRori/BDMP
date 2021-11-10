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
    foto = pImagen where idUser= pIdUs;
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

#Procedure para obetner la lista de niveles-------------------------------------------------------------------------------
DELIMITER $$
USE `bdm_inter_base`$$
create procedure sp_obtenerNiveles(
in pIdCurso int)
begin
	select idNivel, nomNivel , video, numNivel,contenido
    from nivel where idCurso=pIdCurso;
end $$
CALL `bdm_inter_base`.`sp_obtenerNiveles`(3);

#Procedure para ver un nivel---------------------------------------------------------------------------------------------------
DELIMITER $$
USE `bdm_inter_base`$$
create procedure sp_getNivel(
in pIdNvl BIGINT UNSIGNED 
)
begin
	select idCurso, nomNivel , video, numNivel, contenido
    from nivel where idNivel=pIdNvl;
end $$
CALL `bdm_inter_base`.`sp_getNivel`(3);

#Procedure para busqueda de curso----------------------------------------------------------------------------------------------
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

#Procedure para registrar el historial de alumnos---------------------------------------------------------------------------------
DELIMITER $$
USE `bdm_inter_base`$$
create procedure sp_Historial (
	in  pIdEstado BIGINT,
    in pIdCurso BIGINT
    )
begin
    insert into historial(idEstado, idCurso, progreso)
    values(pIdEstado, pIdCurso, 0);
end $$
delimiter $$
create procedure sp_revisarFinalizacion (
	in  pIdEstado BIGINT UNSIGNED,
    in pIdNivel BIGINT UNSIGNED
    )
begin
    declare pNumNivel int;
    declare pIdCurso int;    
    declare pNumTotalCurso int;     
    set pIdCurso = obtNumCurso(pIdNivel);    
	set pNumNivel = obtNumNivel(pIdNivel);
    set pNumTotalCurso = obNivTotalCurso(pIdCurso);
    
    if pNumNivel = pNumTotalCurso THEN
    update pagoCurso
    set
	terminado = true
    where idUsuario = pIdEstado AND idCurso = pIdCurso;
    END IF;
end $$

#Procedure para inscribir curso----------------------------------------------------------------------------------------------------
DELIMITER $$
USE `bdm_inter_base`$$
create procedure sp_compraCurso(
	in  pIdAlumno BIGINT,
    in pIdCurso BIGINT
    )
begin
    insert into pagoCurso(idUsuario, idCurso)
    values(pIdAlumno, pIdCurso);
    call sp_Historial(pIdAlumno, pIdCurso);
end $$
CALL `bdm_inter_base`.`sp_compraCurso`(1, 2);

#Procedure para cuando estés inscrito en un curso----------------------------------------------------------------------
DELIMITER $$
USE `bdm_inter_base`$$
create procedure sp_alumnoInscrito(
	in  pIdAlumno BIGINT UNSIGNED,
    in pIdurso BIGINT UNSIGNED
    )
begin
    select terminado from pagoCurso 
    where idUsuario=pIdAlumno and idCurso=pIdurso;
end $$

#Procedure para el historial------------------------------------------------------------------------------------------------
DROP PROCEDURE sp_MostrarHistorialAlumno;
DELIMITER $$
USE `bdm_inter_base`$$
create procedure sp_MostrarHistorialAlumno(
in pIdAlumno BIGINT UNSIGNED)
begin
select curso.idCurso, curso.nomCurso,curso.descCurso, cantNivel, group_concat(cate_Curso.nomCateg) as "Categorias",
curso.cantNivel, historial.progreso
from usuarios join  historial on usuarios.idUser = historial.idEstado
join Curso on historial.idCurso = curso.idCurso
left join  tablaAsociativaCursoCategoria on  
Curso.idCurso = tablaAsociativaCursoCategoria.idCurso left join cate_Curso 
on tablaAsociativaCursoCategoria.idCateg = cate_Curso.idCateg
where Usuarios.idUser = pIdAlumno
group by curso.idCurso order by curso.idCurso desc;
end $$
CALL `bdm_inter_base`.`sp_MostrarHistorialAlumno`(2);

DELIMITER $$
USE `bdm_inter_base`$$
create procedure sp_actualizaElHistorial (
	in  pIdEstado BIGINT UNSIGNED,
    in  pIdNivel BIGINT UNSIGNED
    )
begin
	declare numNivelRegistrado BIGINT UNSIGNED;
    declare NumeroNivel int;
    declare NumeroCurso BIGINT UNSIGNED;
    
    set NumeroCurso = obtNumCurso(pIdNivel);
    
    set numNivelRegistrado = avance(pIdEstado, pIdNivel);
	set NumeroNivel = obtNumNivel(pIdNivel);
    
    if NumeroNivel > numNivelRegistrado THEN
        update historial
        set       
        progreso = NumeroNivel
		WHERE  idEstado = pIdEstado and idCurso = NumeroCurso;
    END IF;
end $$

CALL `bdm_inter_base`.`sp_actualizaElHistorial`(2, 3);

DELIMITER $$
USE `bdm_inter_base`$$
create procedure sp_RevisarCursoFinal (
	in  pIdEstado BIGINT UNSIGNED,
    in pIdNivel BIGINT UNSIGNED
    )
begin
    declare NumeroNivel BIGINT UNSIGNED;
    declare IdCurso BIGINT UNSIGNED;    
    declare NumeroTotalCurso BIGINT UNSIGNED;     
    set IdCurso = obtNumCurso(pIdNivel);    
	set NumeroNivel = obtNumNivel(pIdNivel);
    set NumeroTotalCurso = obNivTotalCurso(IdCurso);
    
    if NumeroNivel = NumeroTotalCurso THEN
    update pagoCurso
    set
	terminado = true
    where idUsuario = pIdEstado AND idCurso = IdCurso;
    END IF;
end $$
