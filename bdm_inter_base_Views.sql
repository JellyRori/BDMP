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

create view traerLosNiveles as
select nivel.idNivel, nivel.idCurso, nivel.nomNivel as "nombreDelNivel",nivel.video, 
nivel.contenido,nivel.numNivel as "numeroDeNivel", nivel.estado from nivel;

drop view cursosCompletosVentas;
       create view cursosCompletosVentas as
       select CursoCompleto.idCurso, CursoCompleto.Clave_Profesor, CursoCompleto.nomCurso, 
	   CursoCompleto.descCurso, CursoCompleto.videoMuestra, CursoCompleto.costo,
       CursoCompleto.cantNivel, count(pagoCurso.idCurso) as "cursosComprados", coalesce(CursoCompleto.costo * (count(pagoCurso.idCurso) )) as "TotalVentas",
       avg(cursoCalificacion.resultado) as "calificacion", (promedio(pagoCurso.idCurso)*100) as "promedioGeneral", sumayPal(pagoCurso.metodoPago) as "PagoConPaypal",
       sumayDebito(pagoCurso.metodoPago) as "PagoConDebito"
	   from CursoCompleto join pagoCurso on CursoCompleto.idCurso=pagoCurso.idCurso
	   left join cursoCalificacion on CursoCompleto.idCurso=cursoCalificacion.idCursoCalif
       group by CursoCompleto.idCurso;
    
	   create view ingresoTotal as
	   select  IngresoTotal(cursosCompletosVentas.Clave_Profesor) as "totalPorTodo",cursosCompletosVentas.Clave_Profesor
	   from cursosCompletosVentas join pagoCurso on cursosCompletosVentas.idCurso=pagoCurso.idCurso;


       create view alumnosInscritosEnCursos as
		select  usuarios.idUsuario as "Alumno", usuarios.nombre, usuarios.apellidos, usuarios.email as "correo", CursoCompleto.nomCurso
		from usuarios join pagoCurso on usuarios.idUsuario=pagoCurso.idUsuario left join CursoCompleto on CursoCompleto.idCurso=pagoCurso.idCurso
		where rol = 0
		group by usuarios.idUsuario;
        
 
		create view lasCategorias as
		select cate_Curso.idCateg as "ClaveCategoria",cate_Curso.nomCateg as "nombreCategoria",cate_Curso.descCateg as "descripion",
		cate_Curso.idUsCat as "ClaveDeUsuario", cate_Curso.fechaCreat as "FechaDeCreacion",cate_Curso.activa from cate_Curso
        order by nomCateg;
        
        CREATE  VIEW loscomentarios AS select
        comentario.idComent,comentario.idCurso,
        usuarios.idUsuario,usuarios.nombre,comentario.contenido,comentario.fechaPub 
        from (usuarios join comentario
        on(usuarios.idUsuario = comentario.idEstado))
        order by comentario.fechaPub;
        
        
        drop view alumnosDeCursos;
        create view alumnosDeCursos as
        select u.idUsuario, u.nombre, u.apellidos,n.fechaInsc,n.idCurso, n.metodoPago, historial.progreso
		from usuarios u INNER join  historial on historial.idEstado = u.idUsuario
        INNER join  cursosCompletosVentas on historial.idEstado = u.idUsuario
		INNER JOIN pagoCurso n on n.idUsuario = u.idUsuario where n.idCurso= cursosCompletosVentas.idCurso
		group by u.idUsuario;
        
         create view alumnosDeCursos as
        select u.idUsuario,concat(u.nombre," ", u.apellidos) as "nombreAlumno", n.fechaInsc as "FechaInscripcion",
        n.idCurso, n.metodoPago, historial.progreso
		from usuarios u INNER join  historial on historial.idEstado = u.idUsuario
        INNER join  cursosCompletosVentas on historial.idEstado = u.idUsuario
		INNER JOIN pagoCurso n on n.idUsuario = u.idUsuario 
		group by u.idUsuario;


/*create view cursosCompletosVentas as
select CursoCompleto.id_curso, CursoCompleto.Id_Prof, CursoCompleto.nombre, 
	CursoCompleto.descripcion, CursoCompleto.videoTrailer, CursoCompleto.costo,
    CursoCompleto.cantidadNivelesCurso, count(inscripcionCurso.idCurso) as "CantiidadVentas", 
    costo * coalesce(precio_descuento, precio) as "Ingreso_Total",
    avg(calificarCurso.calificacion) as "calificacion" 
	from CursoCompleto join inscripcionCurso on CursoCompleto.id_curso=inscripcionCurso.idCurso
	left join calificarCurso on CursoCompleto.id_curso=calificarCurso.id_cursoCalif
    group by CursoCompleto.id_curso;*/





