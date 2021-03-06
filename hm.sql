-- MySQL dump 10.15  Distrib 10.0.34-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: 127.0.0.1    Database: HOTELMANAGEMENT
-- ------------------------------------------------------
-- Server version	10.0.34-MariaDB-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `HOTELMANAGEMENT`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `HOTELMANAGEMENT` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `HOTELMANAGEMENT`;

--
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `booking` (
  `userID` char(8) NOT NULL DEFAULT '',
  `bookingID` char(10) NOT NULL DEFAULT '',
  `hotelID` char(10) DEFAULT NULL,
  `checkin` date DEFAULT NULL,
  `checkout` date DEFAULT NULL,
  `suite` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`userID`,`bookingID`),
  KEY `hotelID` (`hotelID`),
  CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `user_account` (`userID`) ON DELETE CASCADE,
  CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`hotelID`) REFERENCES `hotel` (`hotelID`) ON DELETE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking`
--

LOCK TABLES `booking` WRITE;
/*!40000 ALTER TABLE `booking` DISABLE KEYS */;
INSERT INTO `booking` VALUES ('a0000000','b000000000','h000000000','2015-01-01','2015-01-04','standard suite'),('a0000000','b000000001','h000000000','2015-01-05','2015-01-09','royal sapphire suite');
/*!40000 ALTER TABLE `booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `booking_ID`
--

DROP TABLE IF EXISTS `booking_ID`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `booking_ID` (
  `userID` char(8) DEFAULT NULL,
  `bookingID` char(10) DEFAULT NULL,
  KEY `userID` (`userID`),
  CONSTRAINT `booking_ID_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `user_account` (`userID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking_ID`
--

LOCK TABLES `booking_ID` WRITE;
/*!40000 ALTER TABLE `booking_ID` DISABLE KEYS */;
INSERT INTO `booking_ID` VALUES ('a0000000','b000000000'),('a0000000','b000000001');
/*!40000 ALTER TABLE `booking_ID` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hotel`
--

DROP TABLE IF EXISTS `hotel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hotel` (
  `hotelID` char(10) NOT NULL DEFAULT '',
  `ownerID` char(8) DEFAULT NULL,
  `name` varchar(30) DEFAULT NULL,
  `location` varchar(50) DEFAULT NULL,
  `rating` double DEFAULT NULL,
  `lat` float DEFAULT NULL,
  `lng` float DEFAULT NULL,
  `description` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`hotelID`),
  KEY `ownerID` (`ownerID`),
  CONSTRAINT `hotel_ibfk_1` FOREIGN KEY (`ownerID`) REFERENCES `hotel_owner` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hotel`
--

LOCK TABLES `hotel` WRITE;
/*!40000 ALTER TABLE `hotel` DISABLE KEYS */;
INSERT INTO `hotel` VALUES ('h000000000','a1700000','Bella Hotel Apartments','250 City Road, 3006 Melb, Australia',4.5,NULL,NULL,NULL),('h000000001','a1700000','testhotel',NULL,0,-34.9207,138.61,'It is a very nice hotel indeed'),('h000000002','a1700000','Generic Hotel',NULL,7.5,-34.9265,138.606,'A beautiful hotel within walking distance of the f'),('h000000003','a1700000','Bad Hotel',NULL,0.5,-34.9338,138.616,'This hotel is so bad its average user reviews is b'),('h000000004','a1700000','Friendly Hotel',NULL,7.5,-34.9354,138.589,'This hotel doesn\'t have much to distinguish it fro');
/*!40000 ALTER TABLE `hotel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hotel_owner`
--

DROP TABLE IF EXISTS `hotel_owner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hotel_owner` (
  `userID` char(8) NOT NULL DEFAULT '',
  `email` varchar(30) DEFAULT NULL,
  `username` varchar(30) DEFAULT NULL,
  `password` varchar(10) DEFAULT NULL,
  `first_name` varchar(15) DEFAULT NULL,
  `middle_name` varchar(15) DEFAULT NULL,
  `last_name` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hotel_owner`
--

LOCK TABLES `hotel_owner` WRITE;
/*!40000 ALTER TABLE `hotel_owner` DISABLE KEYS */;
INSERT INTO `hotel_owner` VALUES ('a1700000','rich@gmail.com','owner1','password','rich','richard','richardson');
/*!40000 ALTER TABLE `hotel_owner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `owns`
--

DROP TABLE IF EXISTS `owns`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `owns` (
  `userID` char(8) DEFAULT NULL,
  `hotelID` char(10) DEFAULT NULL,
  `propertyCount` int(3) DEFAULT NULL,
  KEY `userID` (`userID`),
  KEY `hotelID` (`hotelID`),
  CONSTRAINT `owns_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `hotel_owner` (`userID`) ON DELETE SET NULL,
  CONSTRAINT `owns_ibfk_2` FOREIGN KEY (`hotelID`) REFERENCES `hotel` (`hotelID`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `owns`
--

LOCK TABLES `owns` WRITE;
/*!40000 ALTER TABLE `owns` DISABLE KEYS */;
INSERT INTO `owns` VALUES ('a1700000','h000000000',1);
/*!40000 ALTER TABLE `owns` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `review` (
  `userID` char(8) NOT NULL DEFAULT '',
  `bookingID` char(10) NOT NULL DEFAULT '',
  `review` varchar(500) DEFAULT NULL,
  `rating` int(2) DEFAULT NULL,
  PRIMARY KEY (`userID`,`bookingID`),
  CONSTRAINT `review_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `user_account` (`userID`) ON DELETE CASCADE,
  CONSTRAINT `review_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `user_account` (`userID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES ('a0000000','b000000000','It was ok',3),('a0000000','b000000001','It was AMAZING!',10);
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `room` (
  `hotelID` char(10) NOT NULL DEFAULT '',
  `name` varchar(20) NOT NULL DEFAULT '',
  `available` int(4) DEFAULT NULL,
  `price` float DEFAULT NULL,
  PRIMARY KEY (`hotelID`,`name`),
  CONSTRAINT `room_ibfk_1` FOREIGN KEY (`hotelID`) REFERENCES `hotel` (`hotelID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES ('h000000000','royal sapphire suite',30,260),('h000000000','standard suite',100,126),('h000000001','standard test suite',50,40),('h000000002','generic deluxe',75,120),('h000000002','generic single',200,70),('h000000003','BAD room',40,7),('h000000003','No shower',40,5),('h000000003','No toilet',40,10),('h000000004','Friendly balcony',50,70),('h000000004','Friendly single',100,50);
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_account`
--

DROP TABLE IF EXISTS `user_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_account` (
  `userID` char(8) NOT NULL DEFAULT '',
  `email` varchar(30) DEFAULT NULL,
  `username` varchar(30) DEFAULT NULL,
  `password` varchar(10) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `first_name` varchar(15) DEFAULT NULL,
  `middle_name` varchar(15) DEFAULT NULL,
  `last_name` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_account`
--

LOCK TABLES `user_account` WRITE;
/*!40000 ALTER TABLE `user_account` DISABLE KEYS */;
INSERT INTO `user_account` VALUES ('a0000000','test@gmail.com','firstuser','password','2015-01-01','john','smith','citizen'),('a0000001','test@gmail.com','user1','password','2015-01-01','bill','smith','citizen');
/*!40000 ALTER TABLE `user_account` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-28 13:29:46
