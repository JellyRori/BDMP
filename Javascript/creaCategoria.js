$(document).ready(function () {
    ocultarElNav();
    /*mostrarCategoriasExistentes();*/
    function ocultarElNav() {
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
                if(obj['rol']==true){
                    document.getElementById("imgAvatar").style.display = 'inline';
                        document.getElementById("logOut").style.display = 'inline';
                        document.getElementById("ventUser").style.display = 'none';
                        document.getElementById("categUser").style.display = 'none';
                        document.getElementById("cursoUser").style.display = 'none';
                        document.getElementById("imgAvatar").src = "php/laFotoDePerfil.php";
                } 
            })
    }

   /* function mostrarCategoriasExistentes() {
        var opc = 2;
        let Body = { opc }
        let jsonBody = JSON.stringify(Body)
        console.log(jsonBody);
        fetch('php/categorias.php', { method: "POST", header: { 'Content-Type': 'application/json' }, body: jsonBody })
            .then(response => {
                return response.json();
            })
            .then(data => {
                
                var Jason = data;
                //var obj = JSON.parse(Jason);
                console.log(data);
                if(data=="NoHayCategorias"){
                    $("#Creadas").append("<p >No hay categorias disponibles</p>");
                    //<p class="Categoria">Categoria 1</p>
                }else{
                    for (var i in Jason) {
                        $("#Creadas").append("<li id='" + Jason[i]['idCateg'] + "'class='Categoria'>" + Jason[i]['nomCateg'] + "</li>");
                    }
                }
            })
    }*/
});
    function crearCat(){
        var nombre = document.getElementById("nameCat").value;
        var descripcion = document.getElementById("Desc").value;
       
        var opc=1;
    
        if(nombre != "" && descripcion != ""){
            let Body = { nombre,descripcion,opc }
            
            let jsonBody = JSON.stringify(Body);
    
            fetch('php/categorias.php',{method:"POST",header:{'Content-Type':'application/json'},body:jsonBody})
            .then(response => {
                return response.text();
            })
            .then(data => {
                
                var Jason =data;
                console.log(Jason);
                if(Jason==="success"){
                    alert("Categoria creada con éxito");
                    window.location.href="indexLoged.html";
                }
                else{
                    alert("Creacion fallida, ninguna categoría puede tener el mismo nombre");
                    alert(Jason.result)
                }
                    
                //"status" => "ok",
                //"result" => array()
            })
        }
       else{
        window.alert("Llene todos los campos")
       }
       
    }



