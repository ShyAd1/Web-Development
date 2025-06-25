from sqlalchemy import Column, Integer, String, Date, Text, ForeignKey
from sqlalchemy.orm import relationship, declarative_base

Base = declarative_base()

class Usuario(Base):
    __tablename__ = "usuarios"
    idusuarios = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100))
    email = Column(String(100), unique=True)
    fechaRegistro = Column(Date)
    contrasena = Column(String(255))
    resenas = relationship("Resena", back_populates="usuario")

class Autor(Base):
    __tablename__ = "autores"
    idautores = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100))
    nacionalidad = Column(String(50))
    fechaNacimiento = Column(Date)
    libros = relationship("Libro", back_populates="autor")

class Categoria(Base):
    __tablename__ = "categorias"
    idcategorias = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(45))
    descripcion = Column(Text)
    libros = relationship("Libro", back_populates="categoria")

class Libro(Base):
    __tablename__ = "libros"
    idlibros = Column(Integer, primary_key=True, index=True)
    titulo = Column(String(150))
    fechaPublicacion = Column(Date)
    isbn = Column(String(13))
    autores_idautores = Column(Integer, ForeignKey("autores.idautores"))
    categorias_idcategorias = Column(Integer, ForeignKey("categorias.idcategorias"))
    autor = relationship("Autor", back_populates="libros")
    categoria = relationship("Categoria", back_populates="libros")
    resenas = relationship("Resena", back_populates="libro")

class Resena(Base):
    __tablename__ = "resenas"
    idresenas = Column(Integer, primary_key=True, index=True)
    calificacion = Column(Integer)
    comentario = Column(Text)
    fechaResena = Column(Date)
    libros_idlibros = Column(Integer, ForeignKey("libros.idlibros"))
    usuarios_idusuarios = Column(Integer, ForeignKey("usuarios.idusuarios"))
    libro = relationship("Libro", back_populates="resenas")
    usuario = relationship("Usuario", back_populates="resenas")