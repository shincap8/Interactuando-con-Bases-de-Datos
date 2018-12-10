<?php
    require ('./conector.php');

    $con= new ConectorBD();

    $response['conexion'] = $con->initConexion('agenda_db');

    if ($response['conexion'] == 'OK') {
        $data['titulo'] = '"'.$_POST['titulo'].'"';
        $data['fecha_inicio'] = '"' . $_POST['start_date'] . '"';
        $data['hora_inicio'] = '"' . $_POST['start_hour'] . ':00"';
        $data['fecha_finalizacion'] = '"' . $_POST['end_date'] . '"';
        $data['hora_finalizacion'] = '"' . $_POST['end_hour'] . ':00"';
        $data['dia_completo'] = $_POST['allday'];
        $data['fk_usuario'] = '"' . $_SESSION['email'] . '"';

        if (con->insertData('eventos', $data)) {
            $resultado = $con->consultar(['eventos'],['MAX(id)']);
            while ($fila = $resultado->fetch_assoc()) {
                $response['id'] = $fila['MAX(id)'];
            }
            $response['msg'] = "OK";
        }else {
            $response['msg'] = "Ha ocurrido un error al guardar el evento";
        }
    }else {
        $response['msg'] = "Error en la comunicacion con la base de datos";
    }

    echo json_encode($response);
    
 ?>
