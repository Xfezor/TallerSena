CREATE DATABASE  IF NOT EXISTS `restaurantedb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `restaurantedb`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: restaurantedb
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `id_Categoria` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`id_Categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'entrada'),(2,'platillo'),(3,'bebida'),(4,'postre');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mesas`
--

DROP TABLE IF EXISTS `mesas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mesas` (
  `id_Mesa` int(11) NOT NULL AUTO_INCREMENT,
  `numero` int(11) NOT NULL,
  `ocupada` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id_Mesa`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mesas`
--

LOCK TABLES `mesas` WRITE;
/*!40000 ALTER TABLE `mesas` DISABLE KEYS */;
INSERT INTO `mesas` VALUES (1,1,1),(2,2,1),(3,3,0),(4,4,1),(5,5,0),(6,6,1),(7,7,0),(8,8,1),(9,9,0),(10,10,1);
/*!40000 ALTER TABLE `mesas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orden_detalle`
--

DROP TABLE IF EXISTS `orden_detalle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orden_detalle` (
  `id_Detalle_Orden` int(11) NOT NULL AUTO_INCREMENT,
  `id_Orden` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  PRIMARY KEY (`id_Detalle_Orden`),
  KEY `producto_idx_idx` (`producto_id`),
  KEY `id_ordenx_idx` (`id_Orden`),
  CONSTRAINT `id_ordenx` FOREIGN KEY (`id_Orden`) REFERENCES `ordenes` (`id_Ordenes`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `producto_idx` FOREIGN KEY (`producto_id`) REFERENCES `productos_menu` (`id_Producto`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orden_detalle`
--

LOCK TABLES `orden_detalle` WRITE;
/*!40000 ALTER TABLE `orden_detalle` DISABLE KEYS */;
INSERT INTO `orden_detalle` VALUES (1,15,1,2),(2,15,2,1),(3,16,1,2),(4,16,2,1),(5,19,1,2),(6,19,2,1),(7,20,1,3),(8,20,2,1),(9,21,1,5),(10,21,2,1),(11,22,1,2),(12,22,2,1),(15,2,1,3),(16,2,2,3),(17,23,1,2),(18,23,2,1),(21,2,4,4),(22,2,5,2),(24,6,1,4),(25,6,2,2),(26,6,3,3);
/*!40000 ALTER TABLE `orden_detalle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ordenes`
--

DROP TABLE IF EXISTS `ordenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ordenes` (
  `id_Ordenes` int(11) NOT NULL AUTO_INCREMENT,
  `mesa_id` int(11) NOT NULL,
  `estado` enum('pendiente','completada','cancelada') NOT NULL DEFAULT 'pendiente',
  `fecha` date NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id_Ordenes`),
  KEY `ordenes_ibfk_1` (`mesa_id`),
  CONSTRAINT `ordenes_ibfk_1` FOREIGN KEY (`mesa_id`) REFERENCES `mesas` (`id_Mesa`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ordenes`
--

LOCK TABLES `ordenes` WRITE;
/*!40000 ALTER TABLE `ordenes` DISABLE KEYS */;
INSERT INTO `ordenes` VALUES (2,1,'','2025-03-15'),(3,1,'pendiente','2025-03-16'),(4,1,'pendiente','2025-03-16'),(5,1,'pendiente','2025-03-16'),(6,1,'pendiente','2025-03-16'),(7,1,'pendiente','2025-03-16'),(8,1,'pendiente','2025-03-16'),(9,1,'pendiente','2025-03-16'),(10,1,'pendiente','2025-03-16'),(11,1,'pendiente','2025-03-16'),(12,1,'pendiente','2025-03-16'),(13,1,'pendiente','2025-03-16'),(14,1,'pendiente','2025-03-16'),(15,1,'pendiente','2025-03-16'),(16,1,'pendiente','2025-03-16'),(17,1,'pendiente','2025-03-16'),(18,1,'pendiente','2025-03-16'),(19,1,'pendiente','2025-03-16'),(20,1,'pendiente','2025-03-16'),(21,1,'pendiente','2025-03-16'),(22,2,'pendiente','2025-03-16'),(23,1,'pendiente','2025-03-16');
/*!40000 ALTER TABLE `ordenes` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER despues_insert_agregue_fecha
Before INSERT on ordenes
for each row
begin
	SET new.fecha = date(now());
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `productos_menu`
--

DROP TABLE IF EXISTS `productos_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos_menu` (
  `id_Producto` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `categoria_id` int(11) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `descripcion` text NOT NULL,
  PRIMARY KEY (`id_Producto`),
  KEY `productos_menu_ibfk_1` (`categoria_id`),
  CONSTRAINT `productos_menu_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id_Categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos_menu`
--

LOCK TABLES `productos_menu` WRITE;
/*!40000 ALTER TABLE `productos_menu` DISABLE KEYS */;
INSERT INTO `productos_menu` VALUES (1,'Ensalada Cesar',1,5.99,'Ensalada con lechuga, crutones y aderezo Cesar'),(2,'Sopa de Tortilla',1,4.99,'Sopa con tiras de tortilla, aguacate y queso'),(3,'Tacos al Pastor',2,8.99,'Tacos de cerdo adobado con piña y cebolla'),(4,'Hamburguesa',2,9.99,'Hamburguesa con carne de res, queso y vegetales'),(5,'Pizza Margarita',2,12.99,'Pizza con tomate, mozzarella y albahaca'),(6,'Coca Cola',3,1.99,'Refresco de cola'),(7,'Limonada',3,2.99,'Limonada fresca'),(8,'Cerveza',3,3.99,'Cerveza artesanal'),(9,'Pastel de Chocolate',4,4.99,'Pastel de chocolate con cobertura de chocolate'),(10,'Helado de Vainilla',4,3.99,'Helado de vainilla con chispas de chocolate'),(11,'Tacos de Asada',2,7.99,'Tacos de carne asada con cebolla y cilantro'),(12,'Enchiladas Verdes',2,9.99,'Enchiladas de pollo con salsa verde y queso'),(13,'Burrito de Pollo',2,8.99,'Burrito de pollo con frijoles y arroz'),(14,'Quesadilla',2,6.99,'Quesadilla de queso con guacamole'),(15,'Fajitas de Res',2,11.99,'Fajitas de res con pimientos y cebolla'),(16,'Agua Mineral',3,1.49,'Agua mineral con gas'),(17,'Jugo de Naranja',3,2.49,'Jugo de naranja natural'),(18,'Café',3,1.99,'Café americano'),(19,'Té Helado',3,2.49,'Té helado con limón'),(20,'Margarita',3,5.99,'Cóctel de tequila con limón y sal'),(21,'Cheesecake',4,4.99,'Cheesecake con salsa de fresa'),(22,'Brownie',4,3.99,'Brownie de chocolate con nueces'),(23,'Flan',4,3.49,'Flan de caramelo'),(24,'Tarta de Manzana',4,4.49,'Tarta de manzana con canela'),(25,'Mousse de Limón',4,3.99,'Mousse de limón con merengue'),(26,'Guacamole',1,5.99,'Guacamole con totopos'),(27,'Nachos',1,6.99,'Nachos con queso y jalapeños'),(28,'Ceviche',1,7.99,'Ceviche de pescado con limón y cilantro'),(29,'Bruschetta',1,4.99,'Bruschetta con tomate y albahaca'),(30,'Calamares Fritos',1,8.99,'Calamares fritos con salsa tártara');
/*!40000 ALTER TABLE `productos_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `contrasena` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `correo` (`correo`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Juan Perez','juan.perez@example.com','password1234'),(2,'Maria Lopez','maria.lopez@example.com','password123'),(3,'Carlos Sanchez','carlos.sanchez@example.com','password123'),(4,'Ana Gomez','ana.gomez@example.com','password123'),(5,'Luis Martinez','luis.martinez@example.com','password123');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'restaurantedb'
--

--
-- Dumping routines for database 'restaurantedb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-17  7:03:55
