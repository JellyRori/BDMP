<?php
    include_once '../php/conection.php';
    $id = $_GET["id"];
    $conexion = new conexion;
    $sql = "call sp_fotoCursos($id);";
    header("content_type: image/jpeg");
    $result = mysqli_query($conexion->conexion, $sql);
    $row = mysqli_fetch_array($result);
    $imagendata = $row["imagCurso"];
    echo $imagendata;
?>