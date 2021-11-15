#BETA Ver usuarios que son maestros--------------------------------------------------------------------------------------------------
CREATE VIEW usuariosMaestros as
select usuarios.idUsuario as "Clave", usuarios.nombre, usuarios.apellidos, usuarios.email as "correo"
from usuarios where rol = 1 group by usuarios.idUsuario order by usuarios.apellidos desc;

#Procedure para traer los datos de los cursos-----------------------------------------------------------------------------------------
create view CursoCompleto as
select curso.idCurso, curso.nomCurso,curso.descCurso,curso.videoMuestra,curso.costo,
cantNivel, group_concat(cate_Curso.nomCateg) as "Categorias",
concat(usuarios.nombre, " ", usuarios.apellidos) as "Profesor", usuarios.idUsuario as "Clave_Profesor"
    from usuarios join curso on usuarios.idUsuario = curso.idUsEsc
    left join  tablaAsociativaCursoCategoria on  
     curso.idCurso = tablaAsociativaCursoCategoria.idCurso left join cate_Curso 
    on tablaAsociativaCursoCategoria.idCateg = cate_Curso.idCateg
    group by curso.idCurso order by curso.idCurso desc;
   
 
create view traerLosComentarios as
select comentario.idComent,comentario.idCurso,usuarios.idUsuario,
	usuarios.nombre, comentario.contenido, comentario.fechaPub
	from usuarios join comentario on usuarios.idUsuario=comentario.idEstado
    order by comentario.fechaPub;


create view cursosCompletosVentas as
select CursoCompleto.idCurso, CursoCompleto.Clave_Profesor, CursoCompleto.nomCurso, 
	CursoCompleto.descCurso, CursoCompleto.videoMuestra, CursoCompleto.costo,
    CursoCompleto.cantNivel, count(pagoCurso.idCurso) as "cursosComprados", coalesce(CursoCompleto.costo * (count(pagoCurso.idCurso) )) as "TotalVentas",
    avg(cursoCalificacion.resultado) as "calificacion" 
	from CursoCompleto join pagoCurso on CursoCompleto.idCurso=pagoCurso.idCurso
	left join cursoCalificacion on CursoCompleto.idCurso=cursoCalificacion.idCursoCalif
    group by CursoCompleto.idCurso;
    
    
create view lasCategorias as
select cate_Curso.idCateg as "ClaveCategoria",cate_Curso.nomCateg as "nombreCategoria",cate_Curso.descCateg as "descripion",
		cate_Curso.idUsCat as "ClaveDeUsuario", cate_Curso.fechaCreat as "FechaDeCreacion",cate_Curso.activa from cate_Curso
        order by nomCateg;

/*create view cursosCompletosVentas as
select CursoCompleto.id_curso, CursoCompleto.Id_Prof, CursoCompleto.nombre, 
	CursoCompleto.descripcion, CursoCompleto.videoTrailer, CursoCompleto.costo,
    CursoCompleto.cantidadNivelesCurso, count(inscripcionCurso.idCurso) as "CantiidadVentas", 
    costo * coalesce(precio_descuento, precio) as "Ingreso_Total",
    avg(calificarCurso.calificacion) as "calificacion" 
	from CursoCompleto join inscripcionCurso on CursoCompleto.id_curso=inscripcionCurso.idCurso
	left join calificarCurso on CursoCompleto.id_curso=calificarCurso.id_cursoCalif
    group by CursoCompleto.id_curso;*/


