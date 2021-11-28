<?php

 $nombreAlumno = $_POST['IDC1'];
 $nombreCurso = $_POST['IDC2'];
 $fechaCurso = $_POST['IDC3'];

    include_once('tbs_class.php'); 
    include_once('plugins/tbs_plugin_opentbs.php'); 

    $TBS = new clsTinyButStrong; 
    $TBS->Plugin(TBS_INSTALL, OPENTBS_PLUGIN); 
    //Parametros
    $nomprofesor = $nombreCurso;
    $fechaprofesor = getdate();
    $laFecha = $fechaprofesor;
    $fechaObtenida=$laFecha;
     $firmaDeInstructor = '5.png';
    $firmaDeCoInstructor = 'FirmaFS.png';
    //Cargando template
    $template = 'Art&LearnDoc.docx';
    $TBS->LoadTemplate($template, OPENTBS_ALREADY_UTF8);
    //Escribir Nuevos campos
    $TBS->MergeField('pro.nomCurso', $nomprofesor);
    $TBS->MergeField('pro.nomAlumn', $nombreAlumno);
    $TBS->MergeField('pro.fechaCurso', $fechaObtenida);
    //$TBS->MergeField('pro.fechaprofesor', $fechaprofesor);
    $TBS->VarRef['x'] = $firmaDeInstructor;
    $TBS->VarRef['y'] = $firmaDeCoInstructor;

    $TBS->PlugIn(OPENTBS_DELETE_COMMENTS);

    $save_as = (isset($_POST['save_as']) && (trim($_POST['save_as'])!=='') && ($_SERVER['SERVER_NAME']=='localhost')) ? trim($_POST['save_as']) : '';
    $output_file_name = str_replace('.', '_Diploma_'. $nombreCurso.$save_as.'.', $template);
    if ($save_as==='') {
        $TBS->Show(OPENTBS_DOWNLOAD, $output_file_name); 
        exit();
    } else {
        $TBS->Show(OPENTBS_FILE, $output_file_name);
        exit("File [$output_file_name] has been created.");
    }
  
?>