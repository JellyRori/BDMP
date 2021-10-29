$(document).ready(function () {
    mostrarCategoriasExistentes();

    function mostrarCategoriasExistentes() {
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
                    $("#Creadas").append("<p >Ninguna categoría ha sido creada</p>");
                }else{
                    for (var i in Jason) {
                        $("#Creadas").append("<li id='" + Jason[i]['idCateg'] + "'class='Categoria'>" + Jason[i]['nomCateg'] + "</li>");
                    }
                    for (var i in Jason) {
                        //$("#menuCateg").append("<li id='" + Jason[i]['idCateg'] + "'class='Categoria'>" + Jason[i]['nomCateg'] + "</li>");
                        $("#menuCateg").append("<li id='" + Jason[i]['idCateg'] + "'class='Categoria'> <a href='Categoria.html'>" + Jason[i]['nomCateg'] + "</a></li>");
                    }
                    for (var i in Jason) {
                        //$("#menuCateg").append("<li id='" + Jason[i]['idCateg'] + "'class='Categoria'>" + Jason[i]['nomCateg'] + "</li>");
                        $("#menuCategIndex").append("<li id='" + Jason[i]['idCateg'] + "'class='Categoria'> <a href='Categoria.html'>" + Jason[i]['nomCateg'] + "</a></li>");
                    }
                }
            })
    }



});