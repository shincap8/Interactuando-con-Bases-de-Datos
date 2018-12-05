<?php
    require ('./conector.php');
    $con = new ConectorBD();
    $response['conexion'] = $con->initConexion('agenda_db');




 ?>
