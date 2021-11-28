$(document).ready(function () {
    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) {
                return pair[1];
            }
        }
        return false;
    }
    $("#tablaCursos").on("click", ".titCursos", function () {
        cursoEsp(this.id);
    });
    $("#tablaCursos").on("click", ".totalVentitas", function () {
        debugger;
        cursoDetalle(this.id);
    });
    ocultarVerCursos();
    function ocultarVerCursos(){
        var opc = 3;
        let Body = { opc }
        let jsonBody = JSON.stringify(Body)
        fetch('php/usuario.php', { method: "POST", header: { 'Content-Type': 'application/json' }, body: jsonBody })
            .then(response => {
                return response.text();
            })
            .then(data => {
                var Jason = data;
                var obj = JSON.parse( Jason);
                if(obj['rol']==true){
                    document.getElementById("imgAvatar").style.display = 'inline';
                    document.getElementById("logOut").style.display = 'inline';
                    document.getElementById("imgAvatar").src = "php/laFotoDePerfil.php";
                    //document.getElementById("iniciaSes").style.display = 'none';  
                    document.getElementById("histUser").style.display = 'none';
                   // document.getElementById("datosForAlumno").style.display = 'none';
                    
                }else{
                    if(obj['rol']==false){
                        document.getElementById("imgAvatar").style.display = 'inline';
                        document.getElementById("logOut").style.display = 'inline';
                        document.getElementById("imgAvatar").src = "php/laFotoDePerfil.php";
                        document.getElementById("categUser").style.display = 'none';
                        document.getElementById("histUser").style.display = 'inline';
                        //document.getElementById("iniciaSes").style.display = 'none';  
                        document.getElementById("ventUser").style.display = 'none';
                       // document.getElementById("nivelLista").style.display = 'none';
                       // document.getElementById("listaNiveles").style.display = 'none';
                         document.getElementById("misCursos").style.display = 'none';
                            document.getElementById("cursoUser").style.display = 'none';
                        //aqui se manda a llamar la confirmacion de si tiene el curso
                        //cursoComprado();
                    }else{
                      // document.getElementById("Compra").style.display = 'inline';
                      // document.getElementById("Promedio").style.display = 'none';
                      // document.getElementById("nivelesCurso").style.display = 'none';
                      // document.getElementById("progresoCur").style.display = 'none';
                    }
                }      
            })
    }
    verElHistorial();//mandando a llamar la funcion para ver el historial del alumno que tiene sesion iniciada------------------
    verLasVentas();
    verTotalVentas();
    verDetallesAlumno();
    function verElHistorial() {
        var opc = 3;
        let Body = { opc }
        let jsonBody = JSON.stringify(Body)
        console.log(jsonBody);
        
        fetch('php/historial.php', { method: "POST", header: { 'Content-Type': 'application/json' }, body: jsonBody })
        .then(response => {
            return response.json();
        })
        .then(data => {
                
            var Jason = data;
            //var obj = JSON.parse(Jason);
            console.log(data);
            
            if(data=="NoHayCursos"){
                $("#hayCursos").append("<p>No hay cursos inscritos</p>");
            }else{
                for (var i in Jason) {
                    //window.location.href = "blogEspecifico.html?id="+_postID
                    //href='../Html's/VerCurso.html?id='
                    var total = Jason[i]['cantNivel'];
                    var avance = Jason[i]['progreso'];
                    var prom = avance / total * 100;
                    $("#tablaCursos").append("<tr id='Tarjeta'><th id='thIm'><img id='Imagen' width='60' height='60' src='Javascript/fotosDelCursoP.php?id="
                                             +Jason[i]['idCurso']+"' alt='fotoCurso'></th><th id='titulos'><p id="
                                             +Jason[i]['idCurso']+" class='titCursos' >"+Jason[i]['nomCurso']
                                             +"</p></th><th id='descCursillo'><p id='Descripcion'> "+Jason[i]['descCurso']
                                             +"</p></th><th id='cateCursillo'><p id='Categorias'>"+Jason[i]['Categorias']
                                             +"</p></th><th><p id='Avance'>  "+prom+" %</p></th></tr>");
                   
                   // $("#titulos").append("<div class='cursos'><img src ='../JAVA/fotos.php?id="+Jason[i]['id_curso']+"' alt='fotoCurso' height='165' width='240'><br><p id="+Jason[i]['id_curso']+" class='titCursos' >"+Jason[i]['nombre']+"</p><br><p class='niveles'>Lvls:"+Jason[i]['cantidadNivelesCurso']+" </p></div>");
                }
            }
        })
          
    }

    function verLasVentas() {
        var opc = 4;
        let Body = { opc }
        let jsonBody = JSON.stringify(Body)
        console.log(jsonBody);
        
        fetch('php/historial.php', { method: "POST", header: { 'Content-Type': 'application/json' }, body: jsonBody })
        .then(response => {
            return response.json();
        })
        .then(data => {
                
            var Jason = data;
            //var obj = JSON.parse(Jason);
            console.log(data);
            
            if(data=="NoHayCursos"){
                $("#hayCursos").append("<p>No hay cursos inscritos</p>");
            }else{
                for (var i in Jason) {

                    var total = Jason[i]['cantNivel'];
                 
                    $("#tablaCursos").append("<tr id='Tarjeta'><th id='thIm'><img id='Imagen' width='60' height='60' src='Javascript/fotosDelCursoP.php?id="
                                             +Jason[i]['idCurso']+"' alt='fotoCurso'></th><th id='titulos'><p id="
                                             +Jason[i]['idCurso']+" class='titCursos'>"+Jason[i]['nomCurso']
                                             +"</p></th><th id='descCursillo'><p id='Descripcion'> "+Jason[i]['descCurso']
                                             +"</p></th><th id='cateCursillo'><p id='Categorias'>"+Jason[i]['costo']
                                             +"</p></th><th><p id="
                                             +Jason[i]['idCurso']+" class='totalVentitas'> "+Jason[i]['cursosComprados']+"</p></th><th><p  id='totalVentasa'> "
                                             +Jason[i]['TotalVentas']+"</p></th></tr>");
                   
                   // $("#titulos").append("<div class='cursos'><img src ='../JAVA/fotos.php?id="+Jason[i]['id_curso']+"' alt='fotoCurso' height='165' width='240'><br><p id="+Jason[i]['id_curso']+" class='titCursos' >"+Jason[i]['nombre']+"</p><br><p class='niveles'>Lvls:"+Jason[i]['cantidadNivelesCurso']+" </p></div>");
                }
            }
        })
          
    }

    function verTotalVentas() {
        var opc = 5;
        let Body = { opc }
        let jsonBody = JSON.stringify(Body)
        console.log(jsonBody);
        
        fetch('php/historial.php', { method: "POST", header: { 'Content-Type': 'application/json' }, body: jsonBody })
        .then(response => {
            return response.json();
        })
        .then(data => {
                
            var Jason = data;
            //var obj = JSON.parse(Jason);
            console.log(data);
            if(data=="NoHayCursos"){
                $("#hayCursos").append("<p>No hay cursos inscritos</p>");
            }else{
                for (var i in Jason) {
               
                    $("#tablaCursos2").append("<tr id='Tarjeta'><th id='thIm2'>"+Jason[i]['sumaTotal']
                                             +"</p></th></tr>");
                   
                }
            }
            
        })
          
    }

    function verDetallesAlumno(){
        var idCurso = getQueryVariable("id");
        var opc = 6;
        let Body = { idCurso,opc }
        let jsonBody = JSON.stringify(Body)
        console.log(jsonBody);
        
        fetch('php/historial.php', { method: "POST", header: { 'Content-Type': 'application/json' }, body: jsonBody })
        .then(response => {
            return response.json();
        })
        .then(data => {
                
            var Jason = data;
            //var obj = JSON.parse(Jason);
            console.log(data);
            
            if(data=="NoHayCursos"){
                $("#hayCursos").append("<p>No hay cursos inscritos</p>");
            }else{
                for (var i in Jason) {
                    $("#tablaCursos3").append("<tr id='Tarjeta3'><th id='titulos'>"+Jason[i]['nombreAlumno']
                                             +"</p></th><th id='cateCursillo'><p id='Categorias'>"+Jason[i]['FechaInscripcion']
                                             +"</p></th><th><p id='compras'>  "+Jason[i]['metodoPago']+"</p></th><th><p id='totalVentasa3'> "
                                             +Jason[i]['progreso']+"</p></th></tr>");
                }
            }
        })
          
    }
    
    

    function cursoEsp(_postID) {
        window.location.href = "Curso.html?id="+_postID;
    }
    function cursoDetalle(_postID) {
        window.location.href = "detallesAlumno.html?id="+_postID;
    }
});