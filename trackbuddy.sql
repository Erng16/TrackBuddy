-- MySQL dump 10.13  Distrib 8.0.36, for macos14 (arm64)
--
-- Host: localhost    Database: trackbuddy
-- ------------------------------------------------------
-- Server version	8.3.0

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
-- Table structure for table `Address`
--

DROP TABLE IF EXISTS `Address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Address` (
  `address_id` int NOT NULL AUTO_INCREMENT,
  `province` varchar(100) NOT NULL,
  `district` varchar(100) NOT NULL,
  `sub_district` varchar(100) NOT NULL,
  `postal_code` varchar(5) NOT NULL,
  PRIMARY KEY (`address_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Address`
--

LOCK TABLES `Address` WRITE;
/*!40000 ALTER TABLE `Address` DISABLE KEYS */;
INSERT INTO `Address` VALUES (1,'Bangkok','Phra Nakhon','Samran Rat','10200'),(2,'Bangkok','Dusit','Dusit','10300'),(3,'Bangkok','Nong Chok','Nong Chok','10530'),(4,'Bangkok','Bang Rak','Si Lom','10500'),(5,'Bangkok','Bang Khen','Anusawari','10220'),(6,'Bangkok','Bang Kapi','Hua Mak','10240'),(7,'Bangkok','Pathum Wan','Pathum Wan','10330'),(8,'Bangkok','Phaya Thai','Phaya Thai','10400'),(9,'Bangkok','Khlong San','Khlong San','10600'),(10,'Bangkok','Din Daeng','Din Daeng','10400');
/*!40000 ALTER TABLE `Address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Distribution`
--

DROP TABLE IF EXISTS `Distribution`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Distribution` (
  `dist_id` int NOT NULL AUTO_INCREMENT,
  `dist_name` varchar(255) NOT NULL,
  `dist_addr_id` int DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`dist_id`),
  KEY `dist_addr_id` (`dist_addr_id`),
  CONSTRAINT `distribution_ibfk_1` FOREIGN KEY (`dist_addr_id`) REFERENCES `Address` (`address_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Distribution`
--

LOCK TABLES `Distribution` WRITE;
/*!40000 ALTER TABLE `Distribution` DISABLE KEYS */;
INSERT INTO `Distribution` VALUES (1,'Center',NULL,1),(2,'Phra Nakhon Distribution',1,1),(3,'Dusit Distribution',2,1),(4,'Nong Chok Distribution',3,1),(5,'Bang Rak Distribution',4,1),(6,'Bang Khen Distribution',5,1),(7,'Bang Kapi Distribution',6,1),(8,'Pathum Wan Distribution',7,1),(9,'Phaya Thai Distribution',8,1),(10,'Khlong San Distribution',9,1),(11,'Din Daeng Distribution',10,1);
/*!40000 ALTER TABLE `Distribution` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Parcel`
--

DROP TABLE IF EXISTS `Parcel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Parcel` (
  `tracking_id` varchar(13) NOT NULL,
  `sender_id` int DEFAULT NULL,
  `recipient_id` int DEFAULT NULL,
  `sender_name` varchar(100) DEFAULT NULL,
  `sender_phone` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`tracking_id`),
  KEY `sender_id` (`sender_id`),
  KEY `recipient_id` (`recipient_id`),
  CONSTRAINT `parcel_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `Sender` (`sender_id`),
  CONSTRAINT `parcel_ibfk_2` FOREIGN KEY (`recipient_id`) REFERENCES `Recipient` (`recipient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Parcel`
--

LOCK TABLES `Parcel` WRITE;
/*!40000 ALTER TABLE `Parcel` DISABLE KEYS */;
INSERT INTO `Parcel` VALUES ('TBD1625653766',1,8,'Betty','1234567890'),('TBD4520809421',1,2,NULL,NULL),('TBD5269488379',2,7,'Robert Jones','1234567891'),('TBD5377635782',1,8,'Betty','1234567890'),('TBD6018935187',1,6,'Betty Willans','1234567890'),('TBD7319168464',2,5,'Robert','1234567891'),('TBD7706112826',7,4,'Joey','1234567896'),('TBD8017141868',1,3,NULL,NULL),('TBD8170906452',1,8,'Betty','1234567890'),('TBD9121303909',1,1,NULL,NULL),('TBD9626611253',1,8,'Betty','1234567890'),('TBD9831137828',2,7,'Robert Jones','1234567891'),('TBD9970324295',1,8,'Betty','1234567890');
/*!40000 ALTER TABLE `Parcel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipient`
--

DROP TABLE IF EXISTS `recipient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipient` (
  `recipient_id` int NOT NULL AUTO_INCREMENT,
  `recipient_name` varchar(100) NOT NULL,
  `recipient_address` varchar(255) NOT NULL,
  `recipient_phone` varchar(10) NOT NULL,
  PRIMARY KEY (`recipient_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipient`
--

LOCK TABLES `recipient` WRITE;
/*!40000 ALTER TABLE `recipient` DISABLE KEYS */;
INSERT INTO `recipient` VALUES (1,'Noodle Aroi','14 Anusawari, Bang Khen, Bangkok, 10220','0987654321'),(2,'Khao Aroi','12 Hua Mak, Bang Kapi, Bangkok, 10240','1987654321'),(3,'Rice Aroi','12 Pathum Wan, Pathum Wan, Bangkok, 10330','2987654321'),(4,'Toek Aroi','14 Phaya Thai, Phaya Thai, Bangkok, 10400','3987654321'),(5,'Hiw Kao','12 Khlong San, Khlong San, Bangkok, 10600','4987654321'),(6,'Eve Green','23 Hua Mak, Bang Kapi, Bangkok, 10240','1234567893'),(7,'Sam Smith','54 Pathum Wan, Pathum Wan, Bangkok, 10330','0790442341'),(8,'Pakarang','54 Pathum Wan, Pathum Wan, Bangkok, 10330','5987654321');
/*!40000 ALTER TABLE `recipient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sender`
--

DROP TABLE IF EXISTS `sender`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sender` (
  `sender_id` int NOT NULL AUTO_INCREMENT,
  `sender_fName` varchar(50) DEFAULT NULL,
  `sender_lName` varchar(50) DEFAULT NULL,
  `sender_phone` varchar(10) NOT NULL,
  `sender_password` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`sender_id`),
  UNIQUE KEY `sender_phone` (`sender_phone`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sender`
--

LOCK TABLES `sender` WRITE;
/*!40000 ALTER TABLE `sender` DISABLE KEYS */;
INSERT INTO `sender` VALUES (1,'Bettie','Willans','1234567890','$2a$10$bdghcb1e/b0XWRrw76DXeOwV6SCwCMqNe/uMI8ugnepJl.y/M7dd2'),(2,'Robert','Jones','1234567891','$2a$10$AvuPL2PZJhO.lTHkf2/b9epHqmUyk5IBzKaXRKNNsEG.Kz8VJF1l6'),(3,'Oliver','Brown','1234567892','$2a$10$iEWre.6uRaI9cqpNYrKHQ.hVLCQEfZZglYM/EXKeLDoxVQKvWHgOe'),(4,'Eve','Green','1234567893','$2a$10$82EdsN0zAKDo8ydjYNEst.TQzCHo4a6C3jB5.0hg8h7ZTnFkUwPee'),(5,'Elle','Fanning','1234567894','$2a$10$LdsLMIo8TCrhjpe8O7YmGeugx5EqN56gBJgUpcqtt7eRjNfLb8I1q'),(6,'Alicia','Keys','1234567895','$2a$10$IR0gLpgEwR2XMD1Pi6uyVeUUGf.D0xLns7lf0DTmVP3tZh789KOiq'),(7,'Joey','Harris','1234567896','$2a$10$8c0xQQhrKG9usPvOcU9kieOU2HrnosM5jB5r5zq5r1VD9EYqNV.3W'),(8,'Jirac','Nong','1234567897','$2a$10$5mxLBVEOb/y0gJOh1LKi5.REzIPVkNOkMwyFx1lyejJMqa88YmWXy');
/*!40000 ALTER TABLE `sender` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff` (
  `staff_id` int NOT NULL AUTO_INCREMENT,
  `staff_fname` varchar(50) NOT NULL,
  `staff_lname` varchar(50) NOT NULL,
  `staff_password` varchar(60) NOT NULL,
  `dist_id` int DEFAULT NULL,
  `staff_role` varchar(50) NOT NULL,
  PRIMARY KEY (`staff_id`),
  KEY `dist_id` (`dist_id`),
  CONSTRAINT `staff_ibfk_1` FOREIGN KEY (`dist_id`) REFERENCES `Distribution` (`dist_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
INSERT INTO `staff` VALUES (1,'James','Bond','$2a$10$tpfwZr/jZvjl0fbVzYmo.O.932eYkWkvqr73r5SrJcP2cIp9sLJaW',1,'Admin'),(2,'Susan','Scott','$2a$10$fwxI06O4.duwbvFaIxaiKOk3uNrutXLHJmwFguMpVOo3pFS2DkrO2',2,'Staff'),(3,'Tom','Holly','$2a$10$ycFzwFXlvBRJ.Idqz.SyBufQzT6u6lAsptVkgJ/3hFC7ymuIUf.tm',3,'Staff'),(4,'Jennifer','Lopez','$2a$10$mVLn5HvgUTUFRNidNhL31.6XqE8dkwSE/x6JzVB0yTc7.Q471G872',4,'Staff'),(5,'Katy','Perry','$2a$10$reU5Rq6PWXh5L5vZIyIXG.7Tfp9acMf3LtzwACBwcIvMfA31qxaLC',5,'Staff'),(6,'Shawn','Mendes','$2a$10$gq3PKUpXb1XjZ/8RqU/vTOl0bHgLSh0SObP/O57LHWS03I2LeKI6.',6,'Courier'),(7,'Louis','Tomlinson','$2a$10$SsSsbmU..Bhhcvl5/agLBuVC3Qx/QK12SUub.jMXSIFysNDI9cKhC',7,'Courier'),(8,'Harry','Styles','$2a$10$xKm/7DTXZTSjKWo1W22mGe88C3uZnuDaSScr10HanL2/yIX9Y7NZi',8,'Courier'),(9,'Taylor','Morgan','$2a$10$w.weqLBjRDSsitYqPclb5.4vEuS6iNvwTjqjIg5Y9PNGhkJYhPH5K',9,'Courier'),(10,'Amber','Davis','$2a$10$m6Rp4i9iRUD07xtFru7Qsewx1GzmINGzjvhcaA9LlbU78kxj1aZvG',10,'Courier');
/*!40000 ALTER TABLE `staff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trackingevent`
--

DROP TABLE IF EXISTS `trackingevent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trackingevent` (
  `event_id` int NOT NULL AUTO_INCREMENT,
  `tracking_id` varchar(13) DEFAULT NULL,
  `final_dist_id` int DEFAULT NULL,
  `dist_id` int DEFAULT NULL,
  `staff_id` int DEFAULT NULL,
  `timestamp` datetime NOT NULL,
  `tracking_status` varchar(100) NOT NULL,
  `note` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`event_id`),
  KEY `tracking_id` (`tracking_id`),
  KEY `final_dist_id` (`final_dist_id`),
  KEY `dist_id` (`dist_id`),
  KEY `staff_id` (`staff_id`),
  CONSTRAINT `trackingevent_ibfk_1` FOREIGN KEY (`tracking_id`) REFERENCES `Parcel` (`tracking_id`),
  CONSTRAINT `trackingevent_ibfk_2` FOREIGN KEY (`final_dist_id`) REFERENCES `Address` (`address_id`),
  CONSTRAINT `trackingevent_ibfk_3` FOREIGN KEY (`dist_id`) REFERENCES `Distribution` (`dist_id`),
  CONSTRAINT `trackingevent_ibfk_4` FOREIGN KEY (`staff_id`) REFERENCES `Staff` (`staff_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trackingevent`
--

LOCK TABLES `trackingevent` WRITE;
/*!40000 ALTER TABLE `trackingevent` DISABLE KEYS */;
INSERT INTO `trackingevent` VALUES (1,'TBD9121303909',6,2,2,'2024-11-21 18:12:06','Pick up',NULL),(2,'TBD9121303909',6,4,4,'2024-11-21 18:14:04','Arrived at Nong Chok Distribution',NULL),(3,'TBD9121303909',6,5,5,'2024-11-21 18:14:58','Arrived at Bang Rak Distribution',NULL),(4,'TBD9121303909',6,6,6,'2024-11-21 18:16:09','Out for delivery',NULL),(5,'TBD9121303909',6,6,6,'2024-11-21 18:16:15','Delivered',NULL),(6,'TBD4520809421',7,3,3,'2024-11-21 18:18:14','Pick up',NULL),(7,'TBD4520809421',7,4,4,'2024-11-21 18:19:36','Arrived at Nong Chok Distribution',NULL),(8,'TBD4520809421',7,4,5,'2024-11-21 18:20:29','Unsuccessful','Accident'),(9,'TBD8017141868',8,3,3,'2024-11-21 18:22:13','Pick up',NULL),(10,'TBD8017141868',8,4,4,'2024-11-21 18:25:15','Arrived at Nong Chok Distribution',NULL),(11,'TBD8017141868',8,8,8,'2024-11-21 18:26:21','Out for delivery',NULL),(12,'TBD8017141868',8,NULL,1,'2024-11-26 16:35:19','Unsuccessful','accident'),(13,'TBD7706112826',9,2,2,'2024-11-22 00:14:38','Pick up',NULL),(14,'TBD7706112826',9,3,3,'2024-11-22 00:25:53','Arrived at Dusit Distribution',NULL),(15,'TBD7706112826',9,9,1,'2024-11-26 16:12:06','Delivered',NULL),(16,'TBD7319168464',10,3,3,'2024-11-25 17:23:20','Pick up',NULL),(17,'TBD7319168464',10,4,4,'2024-11-26 18:39:41','Arrived at Nong Chok Distribution',NULL),(20,'TBD7319168464',10,10,10,'2024-11-26 19:42:42','Out for delivery',NULL),(21,'TBD7319168464',10,10,10,'2024-11-26 19:43:31','Unsuccessful','Accident'),(22,'TBD1625653766',8,2,2,'2024-11-27 12:52:00','Pick up',NULL),(23,'TBD9626611253',8,3,3,'2024-11-27 14:18:44','Pick up',NULL),(24,'TBD1625653766',8,3,3,'2024-11-27 14:19:20','Arrived at Dusit Distribution',NULL);
/*!40000 ALTER TABLE `trackingevent` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-28 19:00:41
