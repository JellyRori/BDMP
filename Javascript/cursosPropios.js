$(document).ready(function () {

    $("#cursosCreados").on("click", ".titCursos", function () {
        //cursoEsp(this.id);
    });

    function ocultarMisCursos() {
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
                document.getElementById("imgAvatar").style.display = 'inline';
                document.getElementById("logOut").style.display = 'inline';
                document.getElementById("imgAvatar").src = "php/laFotoDePerfil.php";
                   
                if(obj['rol']==true){
                    document.getElementById("histUser").style.display = 'none';
                   mostrarCursosProf();
                    
                }else{
                    if(obj['rol']==false){
                        document.getElementById("misCursos").style.display = 'none';
                        document.getElementById("cursoUser").style.display = 'none';
                        document.getElementById("ventUser").style.display = 'none';
                        //mostrarCursosAlumno();
                    }
                }
              

            })
    }
    ocultarMisCursos();
    function mostrarCursosProf() {
        var opc = 3;
        let Body = { opc }
        let jsonBody = JSON.stringify(Body)
        console.log(jsonBody);
        
        fetch('php/cursos.php', { method: "POST", header: { 'Content-Type': 'application/json' }, body: jsonBody })
        .then(response => {
            return response.json();
        })
        .then(data => {
                
            var Jason = data;
            //var obj = JSON.parse(Jason);
            console.log(data);
            
            if(data=="NoHayCursos"){
                $("#hayCursos").append("<p>No hay cursos creados</p>");
            }else{
                for (var i in Jason) {
                    //window.location.href = "blogEspecifico.html?id="+_postID
                    //href='../Html's/VerCurso.html?id='
                    $("#cursosCreados").append("<div class='cursos'><img src ='Javascript/fotosDelCursoP.php?id="
                                                +Jason[i]['idCurso']+"' alt='fotoCurso' height='165' width='240'><br><p id="
                                                +Jason[i]['idCurso']+" class='titCursos' >"+Jason[i]['nomCurso']
                                                +"</p><br><p class='niveles'>Lvls:"+Jason[i]['cantNivel']+" </p><br><p>"
                                                +Jason[i]['costo'] +"</p></div>");
                }
            }
        })
          
    }




});