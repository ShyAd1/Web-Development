-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema resenas_libros_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `resenas_libros_db` DEFAULT CHARACTER SET utf8mb3 ;
USE `resenas_libros_db` ;

-- -----------------------------------------------------
-- Table `resenas_libros_db`.`autores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `resenas_libros_db`.`autores` (
  `id_autor` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `nacionalidad` VARCHAR(50) NULL DEFAULT '---',
  `fecha_nacimiento` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`id_autor`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `resenas_libros_db`.`categorias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `resenas_libros_db`.`categorias` (
  `id_categoria` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL,
  `descripcion` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id_categoria`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `resenas_libros_db`.`libros`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `resenas_libros_db`.`libros` (
  `id_libro` INT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(150) NOT NULL,
  `fecha_publicacion` DATE NULL DEFAULT NULL,
  `isbn` VARCHAR(13) NULL DEFAULT NULL,
  `id_autor` INT NOT NULL,
  `id_categoria` INT NOT NULL,
  PRIMARY KEY (`id_libro`),
  UNIQUE INDEX `isbn_UNIQUE` (`isbn` ASC) VISIBLE,
  INDEX `fk_libros_autores1_idx` (`id_autor` ASC) VISIBLE,
  INDEX `fk_libros_categorias1_idx` (`id_categoria` ASC) VISIBLE,
  CONSTRAINT `fk_libros_autores1`
    FOREIGN KEY (`id_autor`)
    REFERENCES `resenas_libros_db`.`autores` (`id_autor`),
  CONSTRAINT `fk_libros_categorias1`
    FOREIGN KEY (`id_categoria`)
    REFERENCES `resenas_libros_db`.`categorias` (`id_categoria`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `resenas_libros_db`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `resenas_libros_db`.`usuarios` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `fecha_registro` DATE NOT NULL,
  `contrasena` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `resenas_libros_db`.`resenas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `resenas_libros_db`.`resenas` (
  `id_resena` INT NOT NULL AUTO_INCREMENT,
  `calificacion` INT NOT NULL,
  `comentario` TEXT NULL DEFAULT NULL,
  `fecha_resena` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_usuario` INT NOT NULL,
  `id_libro` INT NOT NULL,
  PRIMARY KEY (`id_resena`),
  INDEX `fk_resenas_usuarios_idx` (`id_usuario` ASC) VISIBLE,
  INDEX `fk_resenas_libros1_idx` (`id_libro` ASC) VISIBLE,
  CONSTRAINT `fk_resenas_libros1`
    FOREIGN KEY (`id_libro`)
    REFERENCES `resenas_libros_db`.`libros` (`id_libro`),
  CONSTRAINT `fk_resenas_usuarios`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `resenas_libros_db`.`usuarios` (`id_usuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3
KEY_BLOCK_SIZE = 1;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

SELECT * FROM AUTORES;

