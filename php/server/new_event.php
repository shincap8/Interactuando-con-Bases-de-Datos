<?php
    require('./conector.php');

    $con = new ConectorBD();
    $response['conexion'] = $con->initConexion('agenda_db');
    $session = $_SESSION["email"];
    $titulo = $_POST['titulo'];
    $fecha_inicio  = $_POST['start_date'];

    if ($_POST['allDay'] == 'false') {
        $dia_completo = "0";
        $hora_inicio = $_POST['start_hour'].":00";
        $fecha_finalizacion = $_POST['end_date'];
        $hora_finalizacion = $_POST['end_hour'] . ":00";
        $query = "INSERT INTO eventos (titulo, fecha_inicio, hora_inicio, fecha_finalizacion, hora_finalizacion, dia_completo, fk_usuario) VALUES ('$titulo', '$fecha_inicio', '$hora_inicio', '$fecha_finalizacion', '$hora_finalizacion', '$dia_completo', '$session' )";
    } else {
        $dia_completo = "1";
        $query = "INSERT INTO eventos (titulo, fecha_inicio, dia_completo, fk_usuario) VALUES ('$titulo', '$fecha_inicio', '$dia_completo', '$session' )";
    }

    if ($response['conexion'] == 'OK') {
        if ($con->ejecutarQuery($query) == true) {
            $resultado = $con->consultar(['eventos'], ['MAX(id)']);
            while ($fila = $resultado->fetch_assoc()) {
                $response['id'] = $fila['MAX(id)'];
            }
            $response['msg'] = "OK";
        } else {
            $response['msg'] = "Ha ocurrido un error al guardar el evento";
        }
    } else {
        $response['msg'] = "Error en la comunicacion con la base de datos";
    }

    echo json_encode($response);
    $con->cerrarConexion();
 ?>
