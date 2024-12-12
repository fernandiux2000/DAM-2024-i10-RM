-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS `DAM`;
USE `DAM`;

-- Crear la tabla Electrovalvulas primero
CREATE TABLE `Electrovalvulas` (
  `electrovalvulaId` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) DEFAULT NULL,
  PRIMARY KEY (`electrovalvulaId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Crear la tabla Dispositivos después
CREATE TABLE `Dispositivos` (
  `dispositivoId` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(200) DEFAULT NULL,
  `ubicacion` VARCHAR(200) DEFAULT NULL,
  `electrovalvulaId` INT(11) NOT NULL,
  PRIMARY KEY (`dispositivoId`),
  KEY `fk_Dispositivos_Electrovalvulas1_idx` (`electrovalvulaId`),
  CONSTRAINT `fk_Dispositivos_Electrovalvulas1` FOREIGN KEY (`electrovalvulaId`) REFERENCES `Electrovalvulas` (`electrovalvulaId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Crear las tablas restantes
CREATE TABLE `Log_Riegos` (
  `logRiegoId` INT(11) NOT NULL AUTO_INCREMENT,
  `apertura` TINYINT(4) DEFAULT NULL,
  `fecha` DATETIME DEFAULT NULL,
  `electrovalvulaId` INT(11) NOT NULL,
  PRIMARY KEY (`logRiegoId`),
  KEY `fk_Log_Riegos_Electrovalvulas1_idx` (`electrovalvulaId`),
  CONSTRAINT `fk_Log_Riegos_Electrovalvulas1` FOREIGN KEY (`electrovalvulaId`) REFERENCES `Electrovalvulas` (`electrovalvulaId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `Mediciones` (
  `medicionId` INT(11) NOT NULL AUTO_INCREMENT,
  `fecha` DATETIME DEFAULT NULL,
  `valor` VARCHAR(100) DEFAULT NULL,
  `dispositivoId` INT(11) NOT NULL,
  PRIMARY KEY (`medicionId`),
  KEY `fk_Mediciones_Dispositivos_idx` (`dispositivoId`),
  CONSTRAINT `fk_Mediciones_Dispositivos` FOREIGN KEY (`dispositivoId`) REFERENCES `Dispositivos` (`dispositivoId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Insertar datos en Electrovalvulas
INSERT INTO `Electrovalvulas` (`electrovalvulaId`, `nombre`) VALUES
(1, 'eLPatio'),
(2, 'eLCocina'),
(3, 'eLJardinDelantero'),
(4, 'eLLiving'),
(5, 'eLHabitacion1'),
(6, 'eLHabitacion2');

-- Insertar datos en Dispositivos
INSERT INTO `Dispositivos` (`dispositivoId`, `nombre`, `ubicacion`, `electrovalvulaId`) VALUES
(1, 'Sensor 1', 'Patio', 1),
(2, 'Sensor 2', 'Cocina', 2),
(3, 'Sensor 3', 'Jardin Delantero', 3),
(4, 'Sensor 4', 'Living', 4),
(5, 'Sensor 5', 'Habitacion 1', 5),
(6, 'Sensor 6', 'Habitacion 2', 6);

-- Insertar datos en Mediciones
INSERT INTO `Mediciones` (`medicionId`, `fecha`, `valor`, `dispositivoId`) VALUES
(1, '2020-11-26 21:19:41', '60', 1),
(2, '2020-11-26 21:19:41', '40', 1),
(3, '2020-11-26 21:19:41', '30', 2),
(4, '2020-11-26 21:19:41', '50', 3),
(5, '2020-11-26 21:19:41', '33', 5),
(6, '2020-11-26 21:19:41', '17', 4),
(7, '2020-11-26 21:19:41', '29', 6),
(8, '2020-11-26 21:19:41', '20', 1),
(9, '2020-11-26 21:19:41', '44', 4),
(10, '2020-11-26 21:19:41', '61', 5),
(11, '2020-11-26 21:19:41', '12', 2);