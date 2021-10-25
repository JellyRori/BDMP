function iniciaSesion(){
    var email = document.getElementById("username").value;
    var contra = document.getElementById("password").value;
    var opc=2;
    let Body = {email,contra,opc}

            let jsonBody = JSON.stringify(Body)
            console.log(jsonBody);
           fetch('php/usuario.php',{method:"POST",header:{'Content-Type':'application/json'},body:jsonBody})
           .then(response => {
             return response.text();
           })
           .then(data => {
            var Jason =data;
            console.log(Jason);
            if(Jason=="sesionEncontrada"){
                alert("bienvenido");
                window.location.href = "indexLoged.html";
            }
            else
                alert("Error, revise los datos")
            //"status" => "ok",
            //"result" => array()
            })
}