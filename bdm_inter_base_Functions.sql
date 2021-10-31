DELIMITER $$
USE `bdm_inter_base`$$
CREATE FUNCTION `RegistroCateCurso` ( #Declarando los parametros-----------------------------------------------------
pIdCatego1 int, 
pIdCatego2 int, 
pNomCurso varchar(70),
pDescCurso varchar(200),
pCantidadNivel int,
pIdMaestro int)
RETURNS INTEGER
#será una funcion deterministica------------------
DETERMINISTIC
BEGIN
declare idDelCurso int; 
#Seleccionando de la tabla curso----------------
	select idCurso
    into idDelCurso
    from curso
    where nomCurso = pNomCurso and descCurso = pDescCurso and cantNivel = pCantidadNivel and idUsEsc = pIdMaestro;
#Mandando a llamar el Procedure de registrar la categoria del curso----
CALL sp_regCursoCategoria(pIdCatego1, idDelCurso);
CALL sp_regCursoCategoria(pIdCatego2, idDelCurso);
RETURN 1;
END$$

#Registrar nivel en el curso-----------------------------------------------------------------------------------------------------
DROP FUNCTION  IF EXISTS  RegistroNivCurso;
DELIMITER $$
USE `bdm_inter_base`$$
CREATE FUNCTION `RegistroNivCurso` (
 pNomNivel varchar(200),
 pVideoNivel varchar(900),
 pContenidoNivel varchar(900),
 pNumNivel int,
 pNomCurso varchar(70),
 pDescCurso varchar(200),
 pCantidadNivel int,
 pIdMaestro int)
RETURNS INTEGER
#será una funcion deterministica------------------
DETERMINISTIC
BEGIN
declare idDelCurso int; 
	select idCurso
    into idDelCurso
    from curso
    where nomCurso = nomCurso and descCurso = pDescCurso and cantNivel = pCantidadNivel and idUsEsc = pIdMaestro;
CALL sp_registrarNivel(idDelCurso,pNomNivel,pVideoNivel, pContenidoNivel,pNumNivel);
RETURN 1;
END$$