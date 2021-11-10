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

DELIMITER $$
USE `bdm_inter_base`$$
CREATE FUNCTION `obtNumNivel` (pIdNivel BIGINT UNSIGNED)
RETURNS INTEGER
DETERMINISTIC
BEGIN
	declare numeNivel BIGINT UNSIGNED;        
    select numNivel
    into numeNivel
    from Nivel
    where idNivel = pIdNivel;
RETURN numeNivel;
END$$

DELIMITER $$
USE `bdm_inter_base`$$
CREATE FUNCTION `obtNumCurso` (pIdNivel BIGINT UNSIGNED)
RETURNS INTEGER
DETERMINISTIC
BEGIN
-- Manda el ID curso, es solo que la programadora es muy floja para cambiar 
-- el nombre de las variables y no le importa confundirse
	declare numNivel BIGINT UNSIGNED;        
    select idCurso
    into numNivel
    from Nivel
    where idNivel = pIdNivel ;
RETURN numNivel;
END$$
drop function obNivTotalCurso;
DELIMITER $$
USE `bdm_inter_base`$$
CREATE FUNCTION `obNivTotalCurso` (pIdCurso BIGINT UNSIGNED)
RETURNS INTEGER
DETERMINISTIC
BEGIN
	declare numTotal BIGINT UNSIGNED;
    
    select cantNivel
    into numTotal
    from curso
    where idCurso = pIdCurso;
RETURN numTotal;
END$$

DELIMITER $$
USE `bdm_inter_base`$$
CREATE FUNCTION `avance` (
pIdEstado BIGINT UNSIGNED, 
pIdNivel BIGINT UNSIGNED)
RETURNS INTEGER
DETERMINISTIC
BEGIN
	declare numeroNivel BIGINT UNSIGNED;
    declare numeroCurso BIGINT UNSIGNED;
    
    select idCurso
    into numeroCurso
    from nivel
    where idNivel = pIdnivel;
    
    
    select progreso
    into numeroNivel
    from historial
    where idEstado = pIdEstado and idCurso = numeroCurso;
RETURN numeroNivel;
END$$
