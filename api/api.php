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
    case 'login':
        if ($requestMethod == 'POST') {
            login($db);
        }
        break;
    case 'mesas':
        if ($requestMethod == 'GET') {
            traerMesas($db);
        }
        break;
    case 'menu':
        if ($requestMethod == 'GET') {
            traerMenu($db);
        }
        break;
    case 'order':
        if ($requestMethod == 'POST') {
            crearOrder($db);
        } else if ($requestMethod == 'PUT') {
            actualizarOrder($db);
        } else if ($requestMethod == 'DELETE') {
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
    $query = "SELECT nombre, precio, descripcion FROM productos_menu";
    $stmt = $db->prepare($query);
    $stmt->execute();
    $menu = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($menu);
}

function crearOrder($db) {
    $data = json_decode(file_get_contents("php://input"), true);

    // Agregar depuración para ver los datos recibidos
    error_log("Datos recibidos: " . print_r($data, true));

    if (isset($data['mesa_id']) && isset($data['productos'])) {
        $mesa_id = $data['mesa_id'];
        $productos = $data['productos'];

        $query = "INSERT INTO ordenes (mesa_id, estado) VALUES (:mesa_id, 'pendiente')";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':mesa_id', $mesa_id);
        $stmt->execute();
        $id_Orden = $db->lastInsertId();

        foreach ($productos as $producto) {
            $query = "INSERT INTO orden_detalle (id_Orden, producto_id, cantidad) VALUES (:id_Orden, :producto_id, :cantidad)";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':id_Orden', $id_Orden);
            $stmt->bindParam(':producto_id', $producto['id']);
            $stmt->bindParam(':cantidad', $producto['cantidad']);
            $stmt->execute();
        }

        echo json_encode(["message" => "Orden creada exitosamente", "id_Orden" => $id_Orden]);
    } else {
        echo json_encode(["message" => "Datos incompletos para crear la orden"]);
    }
}

function actualizarOrder($db) {
    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['id_Orden']) && isset($data['productos'])) {
        $id_Orden = $data['id_Orden'];
        $productos = $data['productos'];

        // Obtener los productos existentes en la orden
        $query = "SELECT producto_id FROM orden_detalle WHERE id_Orden = :id_Orden";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':id_Orden', $id_Orden);
        $stmt->execute();
        $productos_existentes = $stmt->fetchAll(PDO::FETCH_COLUMN);

        // Actualizar o insertar los detalles de la orden
        foreach ($productos as $producto) {
            if (in_array($producto['id'], $productos_existentes)) {
                // Actualizar el producto existente
                $query = "UPDATE orden_detalle SET cantidad = :cantidad WHERE id_Orden = :id_Orden AND producto_id = :producto_id";
                $stmt = $db->prepare($query);
                $stmt->bindParam(':id_Orden', $id_Orden);
                $stmt->bindParam(':cantidad', $producto['cantidad']);
                $stmt->bindParam(':producto_id', $producto['id']);
                $stmt->execute();
            } else {
                // Insertar un nuevo producto
                $query = "INSERT INTO orden_detalle (id_Orden, producto_id, cantidad) VALUES (:id_Orden, :producto_id, :cantidad)";
                $stmt = $db->prepare($query);
                $stmt->bindParam(':id_Orden', $id_Orden);
                $stmt->bindParam(':producto_id', $producto['id']);
                $stmt->bindParam(':cantidad', $producto['cantidad']);
                $stmt->execute();
            }
        }

        echo json_encode(["message" => "Orden actualizada exitosamente", "id_Orden" => $id_Orden]);
    } else {
        echo json_encode(["message" => "Datos incompletos para actualizar la orden"]);
    }
}

function eliminarOrder($db) {
    $data = json_decode(file_get_contents("php://input"), true);

    // Agregar depuración para ver los datos recibidos
    error_log("Datos recibidos: " . print_r($data, true));

    if (isset($data['id_Orden'])) {
        $id_Orden = $data['id_Orden'];

        // Eliminar los detalles de la orden
        $query = "DELETE FROM orden_detalle WHERE id_Orden = :id_Orden";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':id_Orden', $id_Orden);
        $stmt->execute();

        // Eliminar la orden
        $query = "DELETE FROM ordenes WHERE id_Ordenes = :id_Orden";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':id_Orden', $id_Orden);
        $stmt->execute();

        echo json_encode(["message" => "Orden eliminada exitosamente"]);
    } else {
        echo json_encode(["message" => "Datos incompletos para eliminar la orden"]);
    }
}

?>


