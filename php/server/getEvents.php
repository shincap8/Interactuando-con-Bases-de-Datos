<?php
    require('./conector.php');
    
    $con = new ConectorBD();
    $response['msg'] = $con->initConexion('agenda_db');
    $username = $_SESSION["email"];
    

    if ($response['msg']=="OK") {
        $resultado = $con->consultar(['eventos'],['*'], "WHERE fk_usuario = '" . $username . "'", '');

        $i=0;

        while ($fila = $resultado->fetch_assoc()) {
            $response['eventos'][$i]['id'] = $fila['id'];
            $response['eventos'][$i]['title'] = $fila['titulo'];
            //Verificamos si el evento es de todo el día o no, para guardar la hora de inicio y fin junto con la fecha
            if ($fila['dia_completo'] == 0) {
                $diaCompleto = false;
                $response['eventos'][$i]['start']=$fila['fecha_inicio'].'T'.$fila['hora_inicio'];
                $response['eventos'][$i]['end']=$fila['fecha_finalizacion'].'T'.$fila['hora_finalizacion'];
            }else {
                $diaCompleto = true;
                $response['eventos'][$i]['start'] = $fila['fecha_inicio'];
                $response['eventos'][$i]['end'] = ""; 
            }

            $response['eventos'][$i]['diaCompleto'] = $diaCompleto;
            $i++;
        }
        $response['getData'] = "OK";
    }
    echo json_encode($response);
    $con->cerrarConexion();
?>
