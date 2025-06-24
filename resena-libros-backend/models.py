from sqlalchemy import Column, Integer, String, Date, DateTime, Text, ForeignKey
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Usuario(Base):
    __tablename__ = "usuarios"
    id_usuario = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100))
    email = Column(String(100))
    fecha_registro = Column(Date)
    contrasena = Column(String(255))

class Autor(Base):
    __tablename__ = "autores"
    id_autor = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100))
    nacionalidad = Column(String(50))
    fecha_nacimiento = Column(Date)

class Categoria(Base):
    __tablename__ = "categorias"
    id_categoria = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(50))
    descripcion = Column(Text)

class Libro(Base):
    __tablename__ = "libros"
    id_libro = Column(Integer, primary_key=True, index=True)
    titulo = Column(String(150))
    fecha_publicacion = Column(Date)
    isbn = Column(String(13))
    id_autor = Column(Integer, ForeignKey("autores.id_autor"))
    id_categoria = Column(Integer, ForeignKey("categorias.id_categoria"))

class Resena(Base):
    __tablename__ = "resenas"
    id_resena = Column(Integer, primary_key=True, index=True)
    calificacion = Column(Integer)
    comentario = Column(Text)
    fecha_resena = Column(DateTime)
    id_usuario = Column(Integer, ForeignKey("usuarios.id_usuario"))
    id_libro = Column(Integer, ForeignKey("libros.id_libro"))