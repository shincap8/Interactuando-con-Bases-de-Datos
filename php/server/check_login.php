<?php
    require('./conector.php');
    $username = $_POST['username'];
    $password = $_POST['password'];
    $password = md5($password);
    $con = new ConectorBD();
    $response['conexion'] = $con->initConexion('agenda_db');
        //si la conexión fue exitosa
    if ($response['conexion'] == 'OK') {
            //Consulta para ver si el usuario ingresado exite en la BD
        $resultado_consulta = $con->consultar(['usuarios'], ['email', 'password'], 'WHERE email="' . $username . '"');
        if ($resultado_consulta->num_rows != 0) {
            $fila = $resultado_consulta->fetch_assoc();
            if ($password == $fila['password']) {
                $response['msg'] = 'OK';
                $response['acceso'] = 'Usuario Autorizado';
                $_SESSION['email'] = $fila['email']; //asigno la sesion al usuario actual
            } else {
                $response['msg'] = 'Contraseña incorrecta';
                $response['acceso'] = 'Acceso rechazado';
            }
        } else {
            $response['msg'] = 'Email incorrecto';
            $response['acceso'] = 'Acceso rechazado'; //Mostrar alerta si no existen usuarios registrados

        }
    } else {
        $response['conexion'] = 'Error en el inicio de conexion';
    }
    echo json_encode($response);
    $con->cerrarConexion();
?>