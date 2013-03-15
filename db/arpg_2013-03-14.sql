# ************************************************************
# Sequel Pro SQL dump
# Version 3408
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.5.9)
# Database: arpg
# Generation Time: 2013-03-15 02:53:55 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table account_activations
# ------------------------------------------------------------

DROP TABLE IF EXISTS `account_activations`;

CREATE TABLE `account_activations` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `account` int(11) NOT NULL,
  `code` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `account_activations` WRITE;
/*!40000 ALTER TABLE `account_activations` DISABLE KEYS */;

INSERT INTO `account_activations` (`id`, `account`, `code`)
VALUES
	(2,2,'612467114'),
	(4,4,'121454919'),
	(8,8,'115869377');

/*!40000 ALTER TABLE `account_activations` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table account_tokens
# ------------------------------------------------------------

DROP TABLE IF EXISTS `account_tokens`;

CREATE TABLE `account_tokens` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `account` int(11) NOT NULL,
  `token` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `account_tokens` WRITE;
/*!40000 ALTER TABLE `account_tokens` DISABLE KEYS */;

INSERT INTO `account_tokens` (`id`, `account`, `token`)
VALUES
	(1,5,'32140.690310406033'),
	(11,6,'70500.7893694269'),
	(12,7,'80211.09740369674'),
	(13,7,'36728.257527010515');

/*!40000 ALTER TABLE `account_tokens` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table accounts
# ------------------------------------------------------------

DROP TABLE IF EXISTS `accounts`;

CREATE TABLE `accounts` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL DEFAULT '',
  `password` varchar(255) NOT NULL DEFAULT '',
  `username` varchar(32) NOT NULL DEFAULT '',
  `activated` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;

INSERT INTO `accounts` (`id`, `email`, `password`, `username`, `activated`)
VALUES
	(6,'tests','tests','',1),
	(7,'pixelparty@gmail.com','test','',1),
	(8,'pixelparty@gmail.com','test','',0);

/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table characters
# ------------------------------------------------------------

DROP TABLE IF EXISTS `characters`;

CREATE TABLE `characters` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `account` int(11) NOT NULL,
  `name` varchar(32) NOT NULL DEFAULT '',
  `xp` int(11) DEFAULT NULL,
  `class` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `characters` WRITE;
/*!40000 ALTER TABLE `characters` DISABLE KEYS */;

INSERT INTO `characters` (`id`, `account`, `name`, `xp`, `class`)
VALUES
	(1,6,'testCharacter',NULL,1),
	(2,7,'test',NULL,NULL);

/*!40000 ALTER TABLE `characters` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
