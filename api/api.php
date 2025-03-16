<!-- Aquí voy a crear los endpoint -->

<?php

require './recursos/conexion.php';
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Acces-COntrol-Allow-Headers: Content-Typea, Acces-Control-Allow-Headers, Authorization, X-Requested-With');

$database = new DataBase();

$db = $database->getConnection();

$requestMethod = $_SERVER['REQUEST_METHOD'];

$path = explode('/', trim($_SERVER['PATH_INFO'], '/'));

switch ($path[0]) {
    case 'login' :
        if ($requestMethod == 'POST') {
            login($db);
        }
        break;
    case 'mesas' :
        if ($requestMethod == 'GET') {
            traerMesas($db);
        }
        break;
    case 'menu' :
        if ($requestMethod == 'GET') {
            traerMenu($db);
        }
        break;
    case 'order' :
        if ($requestMethod == 'POST') {
            crearOrder($db);
        } else if ($requestMethod = 'PUT'){
            actualizarOrder($db);
        } else if ($requestMethod = 'DELETE'){
            eliminarOrder($db);
        }
        break;
    default:
        echo json_encode(array('message' => 'Endpoint no encontrado'));
        break;
}

function login($db) {
    $data = json_decode(file_get_contents('php://input'), true);
    $correo = $data['correo'];
    $contrasena = $data['contrasena'];

    $query = "SELECT * FROM usuarios WHERE correo = :correo AND contrasena = :contrasena";

    $stmt = $db->prepare($query);

    $stmt->bindParam(':correo', $correo);
    $stmt->bindParam(':contrasena', $contrasena);

    $stmt->execute();

    $num = $stmt->rowCount();

    if ($num > 0) {
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode(array('message' => 'Login exitoso'));
    } else {
        echo json_encode(array('message' => 'Usuario o contraseña incorrectos'));
    }
}

function traerMesas($db) {
    $query = 'SELECT * FROM mesas';
    $stmt = $db->prepare($query);
    $stmt->execute();
    $mesas = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($mesas);
}

function traerMenu($db) {
    $query = "SELECT * FROM menu";
    $stmt = $db->prepare($query);
    $stmt->execute();
    $menu = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($menu);
}

function crearOrder($db) {
    $data = json_decode(file_get_contents("php://input"), true);
    $mesa_id = $data['mesa_id'];
    $productos = $data['productos'];

    $query = "INSERT INTO ordenes (mesa_id, estado) VALUES (:mesa_id, 'pendiente')";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':mesa_id', $mesa_id);
    $stmt->execute();
    $orden_id = $db->lastInsertId();

    foreach ($productos as $producto) {
        $query = "INSERT INTO orden_detalle (orden_id, producto_id, cantidad) VALUES (:orden_id, :producto_id, :cantidad)";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':orden_id', $orden_id);
        $stmt->bindParam(':producto_id', $producto['id']);
        $stmt->bindParam(':cantidad', $producto['cantidad']);
        $stmt->execute();
    }

    echo json_encode(["message" => "Orden creada exitosamente", "orden_id" => $orden_id]);
}

function actualizarOrder($db) {
    $data = json_decode(file_get_contents("php://input"), true);
    $orden_id = $data['orden_id'];
    $productos = $data['productos'];

    $query = "DELETE FROM orden_detalle WHERE orden_id = :orden_id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':orden_id', $orden_id);
    $stmt->execute();

    foreach ($productos as $producto) {
        $query = "INSERT INTO orden_detalle (orden_id, producto_id, cantidad) VALUES (:orden_id, :producto_id, :cantidad)";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':orden_id', $orden_id);
        $stmt->bindParam(':producto_id', $producto['id']);
        $stmt->bindParam(':cantidad', $producto['cantidad']);
        $stmt->execute();
    }

    echo json_encode(["message" => "Orden actualizada exitosamente", "orden_id" => $orden_id]);
}

function eliminarOrder($db) {
    $data = json_decode(file_get_contents("php://input"), true);
    $orden_id = $data['orden_id'];

    $query = "DELETE FROM orden_detalle WHERE orden_id = :orden_id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':orden_id', $orden_id);
    $stmt->execute();

    $query = "DELETE FROM ordenes WHERE id = :orden_id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':orden_id', $orden_id);
    $stmt->execute();

    echo json_encode(["message" => "Orden eliminada exitosamente", "orden_id" => $orden_id]);
}

?>


