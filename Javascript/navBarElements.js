$( document ).ready(function() {
    navUsuario();
    //buscar();
    $("body").on("click", "#btnBuscar", function () {
        buscar();
    });
    $(".tabla").on("click", ".titCursos", function () {
        cursoEsp(this.id);
        debugger;
    });
    function navUsuario() {
        var opc = 3;
        let Body = { opc }
        let jsonBody = JSON.stringify(Body)
        console.log(jsonBody);
        fetch('php/usuario.php', { method: "POST", header: { 'Content-Type': 'application/json' }, body: jsonBody })
            .then(response => {
                return response.text();
            })
            .then(data => {
                var Jason = data;
                var obj = JSON.parse( Jason);
                console.log(data);
                //Condicional que identifica si el usuario es maestro o alumno-----------------------------------------------------------------
                if(obj['rol']==true){
                    document.getElementById("imgAvatar").style.display = 'inline';
                    document.getElementById("logOut").style.display = 'inline';
                    document.getElementById("histUser").style.display = 'none';
                    document.getElementById("imgAvatar").src = "php/laFotoDePerfil.php";
                }else{
                    if(obj['rol']==false){
                        document.getElementById("imgAvatar").style.display = 'inline';
                        document.getElementById("logOut").style.display = 'inline';
                        document.getElementById("ventUser").style.display = 'none';
                        document.getElementById("categUser").style.display = 'none';
                        document.getElementById("misCursos").style.display = 'none';
                        document.getElementById("cursoUser").style.display = 'none';
                        document.getElementById("imgAvatar").src = "php/laFotoDePerfil.php";
                    }
                }
                
            })
    }
    function buscar(){
        var buscando = document.getElementById("buscar").value;
        var opc = 8;

        let Body = { opc ,buscando}
        let jsonBody = JSON.stringify(Body)
        console.log(jsonBody);
        fetch('php/cursos.php', { method: "POST", header: { 'Content-Type': 'application/json' }, body: jsonBody })
            .then(response => {
                return response.json();
            })
            .then(data => {

                var Jason = data;
                console.log(Jason);
        
                   
                      $("#cursosAgregados").empty();
                    var listacompleta = document.getElementById("cursosAgregados");
                  for (var i in Jason) {

                     var th1 =document.createElement('th');
                      th1.setAttribute("id","cursos");
                      var div1 =document.createElement('div');
                      div1.setAttribute("class","cursos");
                      var img1 = document.createElement("img");
                      img1.setAttribute("src","Javascript/fotosDelCursoP.php?id="+Jason[i]['idCurso']);
                      img1.setAttribute("alt","fotoCurso");
                      img1.setAttribute("class","IMG");
                      var br1 = document.createElement("br");
                      var a1 = document.createElement("a");
                      a1.setAttribute("class","titCursos");
                      a1.setAttribute("href","Curso.html?id="+Jason[i]['idCurso']);//aqui pones la direccion html donde lo colocas
                      a1.setAttribute("onclick","Curso.html");
                      a1.innerHTML =Jason[i]["nomCurso"];
                      var br2 = document.createElement("br");
                      var p1 = document.createElement("p");
                      p1.setAttribute("class","niveles");
                      p1.innerHTML ="Lvls:"+ Jason[i]["cantNivel"];
                      div1.appendChild(img1);
                      div1.appendChild(br1);
                      div1.appendChild(a1);
                      div1.appendChild(br2);
                      div1.appendChild(p1);
                      th1.appendChild(div1);
                      listacompleta.appendChild(th1);
                      
                    }
              
                
            })
    }
    function cursoEsp(_postID) {
        window.location.href = "Curso.html?id="+_postID;
    }
});