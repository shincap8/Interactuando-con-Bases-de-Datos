<?php
    require ('./conector.php');
    $username = $_POST['username'];
    $password = $_POST['password'];
    $password = md5($password);
    $con = new ConectorBD();
    $response['conexion'] = $con->initConexion('agenda_db');

    //si la conexión fue exitosa
    if ($response['conexion'] == 'OK') {
        //Consulta para ver si el usuario ingresado exite en la BD
        $resultado_consulta = $con->consultar(['usuarios'],['email', 'password'], 'WHERE email="'.$username.'"');
        if ($resultado_consulta-> num_rows != 0) {
            $fila = $resultado_consulta->fetch_assoc();
            if ($password == $fila['password']) {
                $response['msg'] = 'Redireccionando';
                $response['acceso'] = 'Usuario Autorizado';
                $_SESSION['email'] = $fila['email']; //asigno la sesion al usuario actual
            } else {
                $response['msg'] = 'Contraseña incorrecta';
                $response['acceso'] = 'Acceso rechazado';
            }
        } else {
            $response['acceso'] = 'No existen usuarios registrados'; //Mostrar alerta Si no existen usuarios registrados
            $response['msg'] = 'Presione el botón Inicializar Usuarios'; //Enviar mensajes para registrar los usuarios
        }
    }

 ?>
