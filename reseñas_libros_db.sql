-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema resenas_libros_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema resenas_libros_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `resenas_libros_db` DEFAULT CHARACTER SET utf8 ;
USE `resenas_libros_db` ;

-- -----------------------------------------------------
-- Table `resenas_libros_db`.`autores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `resenas_libros_db`.`autores` (
  `idautores` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `nacionalidad` VARCHAR(50) NULL,
  `fechaNacimiento` DATE NULL,
  PRIMARY KEY (`idautores`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `resenas_libros_db`.`categorias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `resenas_libros_db`.`categorias` (
  `idcategorias` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `descripcion` TEXT NULL,
  PRIMARY KEY (`idcategorias`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `resenas_libros_db`.`libros`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `resenas_libros_db`.`libros` (
  `idlibros` INT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(150) NOT NULL,
  `fechaPublicacion` DATE NULL,
  `isbn` VARCHAR(13) NULL,
  `autores_idautores` INT NOT NULL,
  `categorias_idcategorias` INT NOT NULL,
  PRIMARY KEY (`idlibros`),
  INDEX `fk_libros_autores_idx` (`autores_idautores` ASC) VISIBLE,
  INDEX `fk_libros_categorias1_idx` (`categorias_idcategorias` ASC) VISIBLE,
  CONSTRAINT `fk_libros_autores`
    FOREIGN KEY (`autores_idautores`)
    REFERENCES `resenas_libros_db`.`autores` (`idautores`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_libros_categorias1`
    FOREIGN KEY (`categorias_idcategorias`)
    REFERENCES `resenas_libros_db`.`categorias` (`idcategorias`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `resenas_libros_db`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `resenas_libros_db`.`usuarios` (
  `idusuarios` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `fechaRegistro` DATE NOT NULL,
  `contrasena` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`idusuarios`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `resenas_libros_db`.`resenas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `resenas_libros_db`.`resenas` (
  `idresenas` INT NOT NULL AUTO_INCREMENT,
  `calificacion` INT NOT NULL,
  `comentario` TEXT NULL,
  `fechaResena` DATE NOT NULL,
  `libros_idlibros` INT NOT NULL,
  `usuarios_idusuarios` INT NOT NULL,
  PRIMARY KEY (`idresenas`),
  INDEX `fk_resenas_libros1_idx` (`libros_idlibros` ASC) VISIBLE,
  INDEX `fk_resenas_usuarios1_idx` (`usuarios_idusuarios` ASC) VISIBLE,
  CONSTRAINT `fk_resenas_libros1`
    FOREIGN KEY (`libros_idlibros`)
    REFERENCES `resenas_libros_db`.`libros` (`idlibros`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_resenas_usuarios1`
    FOREIGN KEY (`usuarios_idusuarios`)
    REFERENCES `resenas_libros_db`.`usuarios` (`idusuarios`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

USE `resenas_libros_db` ;

-- Usuarios
INSERT INTO usuarios (idusuarios, nombre, email, fechaRegistro, contrasena) VALUES
(1, 'Juan Perez', 'juan@example.com', '2024-01-01', 'hashedpassword1'),
(2, 'Ana Gomez', 'ana@example.com', '2024-02-15', 'hashedpassword2');

-- Autores
INSERT INTO autores (idautores, nombre, nacionalidad, fechaNacimiento) VALUES
(1, 'Gabriel García Márquez', 'Colombiana', '1927-03-06'),
(2, 'Isabel Allende', 'Chilena', '1942-08-02');

-- Categorías
INSERT INTO categorias (idcategorias, nombre, descripcion) VALUES
(1, 'Novela', 'Narrativa de ficción'),
(2, 'Cuento', 'Relato breve');

-- Libros
INSERT INTO libros (idlibros, titulo, fechaPublicacion, isbn, autores_idautores, categorias_idcategorias) VALUES
(1, 'Cien años de soledad', '1967-05-30', '9780307474728', 1, 1),
(2, 'La casa de los espíritus', '1982-01-01', '9780553383805', 2, 1);

-- Reseñas
INSERT INTO resenas (idresenas, calificacion, comentario, fechaResena, usuarios_idusuarios, libros_idlibros) VALUES
(1, 5, 'Obra maestra', '2024-06-01', 1, 1),
(2, 4, 'Muy bueno', '2024-06-02', 2, 2);

