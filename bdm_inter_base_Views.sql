#BETA Ver usuarios que son maestros--------------------------------------------------------------------------------------------------
CREATE VIEW usuariosMaestros as
select usuarios.idUser as "Clave", usuarios.nombre, usuarios.apellidos, usuarios.email as "correo"
from usuarios where rol = 1 group by usuarios.idUser order by usuarios.apellidos desc;

#Procedure para traer los datos de los cursos-----------------------------------------------------------------------------------------
create view CursoCompleto as
select curso.idCurso, curso.nomCurso,curso.descCurso,curso.videoMuestra,curso.costo,
cantNivel, group_concat(cate_Curso.nomCateg) as "Categorias",
concat(usuarios.nombre, " ", usuarios.apellidos) as "Profesor", usuarios.idUser as "Clave_Profesor"
    from usuarios join curso on usuarios.idUser = curso.idUsEsc
    left join  tablaAsociativaCursoCategoria on  
     curso.idCurso = tablaAsociativaCursoCategoria.idCurso left join cate_Curso 
    on tablaAsociativaCursoCategoria.idCateg = cate_Curso.idCateg
    group by curso.idCurso order by curso.idCurso desc;
    
create view losComentarios as
select comentario.idComent,comentario.idCurso,usuarios.idUser,
	usuarios.nombre, comentario.contenido, comentario.fechaPub
	from usuarios join comentario on usuarios.idUser=comentario.idEstado
    order by comentario.fechaPub;

/*create view cursosCompletosVentas as
select CursoCompleto.id_curso, CursoCompleto.Id_Prof, CursoCompleto.nombre, 
	CursoCompleto.descripcion, CursoCompleto.videoTrailer, CursoCompleto.costo,
    CursoCompleto.cantidadNivelesCurso, count(inscripcionCurso.idCurso) as "CantiidadVentas", 
    costo * coalesce(precio_descuento, precio) as "Ingreso_Total",
    avg(calificarCurso.calificacion) as "calificacion" 
	from CursoCompleto join inscripcionCurso on CursoCompleto.id_curso=inscripcionCurso.idCurso
	left join calificarCurso on CursoCompleto.id_curso=calificarCurso.id_cursoCalif
    group by CursoCompleto.id_curso;*/


