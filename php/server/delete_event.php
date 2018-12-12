<?php
    require('./conector.php');

    $con = new ConectorBD();
    $response['conexion'] = $con->initConexion('agenda_db');
    if ($response['conexion'] == "OK") {
        if ($con->eliminarRegistro('eventos', 'id='.$_POST['id'])) {
            $response['msg'] = "OK";
        }else{
            $response['msg'] = "Ha ocurrido un error al eliminar el evento";
        }
    }else {
        $response['msg'] = 'Erro en la comunicacion con la base de datos';
    }

    $con->cerrarConexion();
    echo json_encode($response);

 ?>
