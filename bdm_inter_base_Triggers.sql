

DELIMITER $$
CREATE TRIGGER Catego_Desc_And_Fecha BEFORE INSERT ON cate_Curso FOR EACH ROW
BEGIN
    SET NEW.fechaCreat = NOW();
END;
DELIMITER;

#tomar en cuenta la funcion de RegistroCateCurso y el procedure de sp_regCursoCategoria
DELIMITER $$
CREATE TRIGGER Asocia_Cate_Curso 
after insert ON Curso FOR EACH ROW
BEGIN
INSERT INTO tablaAsociativaCursoCategoria(idCateg, idCurso)
   VALUES (NEW.idCateg, NEW.idCurso);
END$$    
DELIMITER ;

#tomar en cuenta el procedure de sp_Historial y de sp_compraCurso
DELIMITER $$
CREATE TRIGGER Crear_El_Historial_Alumno
after insert ON pagoCurso FOR EACH ROW
BEGIN
DECLARE var int;
Select COUNT(idInscript) into var from pagoCurso where idCurso = new.idCurso and idUsuario = new.idUsuario;
if var > 0 then
update  historial set progreso = progreso + 1 where progreso = 0;
ELSE
insert into historial(idEstado, idCurso, progreso)
    values(new.idUsuario, new.idCurso, 0);
    END IF;
END$$    
DELIMITER ;

DELIMITER $$
CREATE TRIGGER Limite_Precio
BEFORE insert ON curso FOR EACH ROW
BEGIN
if new.costo>8000 
THEN
 set new.costo=7500;
 END IF;
END$$    
DELIMITER ;




