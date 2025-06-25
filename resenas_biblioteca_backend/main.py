from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from models import Base, Usuario, Autor, Categoria, Libro, Resena
from pydantic import BaseModel
from typing import List, Optional
import datetime

# Cambia los datos de conexión a los de tu base de datos MySQL
DATABASE_URL = "mysql+pymysql://Adair:Adair@127.0.0.1:3306/resenas_libros_db"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base.metadata.create_all(bind=engine)

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Esquemas Pydantic
class UsuarioSchema(BaseModel):
    idusuarios: Optional[int]
    nombre: str
    email: str
    fechaRegistro: datetime.date
    contrasena: str
    class Config:
        orm_mode = True

class AutorSchema(BaseModel):
    idautores: Optional[int]
    nombre: str
    nacionalidad: str
    fechaNacimiento: datetime.date
    class Config:
        orm_mode = True

class CategoriaSchema(BaseModel):
    idcategorias: Optional[int]
    nombre: str
    descripcion: str
    class Config:
        orm_mode = True

class LibroSchema(BaseModel):
    idlibros: Optional[int]
    titulo: str
    fechaPublicacion: datetime.date
    isbn: str
    autores_idautores: int
    categorias_idcategorias: int
    class Config:
        orm_mode = True

class ResenaSchema(BaseModel):
    idresenas: Optional[int]
    calificacion: int
    comentario: str
    fechaResena: datetime.date
    libros_idlibros: int
    usuarios_idusuarios: int
    class Config:
        orm_mode = True

# CRUD Usuarios
@app.get("/usuarios/", response_model=List[UsuarioSchema])
def get_usuarios(db: Session = Depends(get_db)):
    return db.query(Usuario).all()

@app.post("/usuarios/", response_model=UsuarioSchema)
def create_usuario(usuario: UsuarioSchema, db: Session = Depends(get_db)):
    db_usuario = Usuario(**usuario.dict())
    db.add(db_usuario)
    db.commit()
    db.refresh(db_usuario)
    return db_usuario

@app.put("/usuarios/{usuario_id}", response_model=UsuarioSchema)
def update_usuario(usuario_id: int, usuario: UsuarioSchema, db: Session = Depends(get_db)):
    db_usuario = db.query(Usuario).filter(Usuario.idusuarios == usuario_id).first()
    if not db_usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    for key, value in usuario.dict().items():
        setattr(db_usuario, key, value)
    db.commit()
    db.refresh(db_usuario)
    return db_usuario

@app.delete("/usuarios/{usuario_id}")
def delete_usuario(usuario_id: int, db: Session = Depends(get_db)):
    db_usuario = db.query(Usuario).filter(Usuario.idusuarios == usuario_id).first()
    if not db_usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    db.delete(db_usuario)
    db.commit()
    return {"ok": True}

# CRUD Autores
@app.get("/autores/", response_model=List[AutorSchema])
def get_autores(db: Session = Depends(get_db)):
    return db.query(Autor).all()

@app.post("/autores/", response_model=AutorSchema)
def create_autor(autor: AutorSchema, db: Session = Depends(get_db)):
    db_autor = Autor(**autor.dict())
    db.add(db_autor)
    db.commit()
    db.refresh(db_autor)
    return db_autor

@app.put("/autores/{autor_id}", response_model=AutorSchema)
def update_autor(autor_id: int, autor: AutorSchema, db: Session = Depends(get_db)):
    db_autor = db.query(Autor).filter(Autor.idautores == autor_id).first()
    if not db_autor:
        raise HTTPException(status_code=404, detail="Autor no encontrado")
    for key, value in autor.dict().items():
        setattr(db_autor, key, value)
    db.commit()
    db.refresh(db_autor)
    return db_autor

@app.delete("/autores/{autor_id}")
def delete_autor(autor_id: int, db: Session = Depends(get_db)):
    db_autor = db.query(Autor).filter(Autor.idautores == autor_id).first()
    if not db_autor:
        raise HTTPException(status_code=404, detail="Autor no encontrado")
    db.delete(db_autor)
    db.commit()
    return {"ok": True}

# CRUD Categorias
@app.get("/categorias/", response_model=List[CategoriaSchema])
def get_categorias(db: Session = Depends(get_db)):
    return db.query(Categoria).all()

@app.post("/categorias/", response_model=CategoriaSchema)
def create_categoria(categoria: CategoriaSchema, db: Session = Depends(get_db)):
    db_categoria = Categoria(**categoria.dict())
    db.add(db_categoria)
    db.commit()
    db.refresh(db_categoria)
    return db_categoria

@app.put("/categorias/{categoria_id}", response_model=CategoriaSchema)
def update_categoria(categoria_id: int, categoria: CategoriaSchema, db: Session = Depends(get_db)):
    db_categoria = db.query(Categoria).filter(Categoria.idcategorias == categoria_id).first()
    if not db_categoria:
        raise HTTPException(status_code=404, detail="Categoria no encontrada")
    for key, value in categoria.dict().items():
        setattr(db_categoria, key, value)
    db.commit()
    db.refresh(db_categoria)
    return db_categoria

@app.delete("/categorias/{categoria_id}")
def delete_categoria(categoria_id: int, db: Session = Depends(get_db)):
    db_categoria = db.query(Categoria).filter(Categoria.idcategorias == categoria_id).first()
    if not db_categoria:
        raise HTTPException(status_code=404, detail="Categoria no encontrada")
    db.delete(db_categoria)
    db.commit()
    return {"ok": True}

# CRUD Libros
@app.get("/libros/", response_model=List[LibroSchema])
def get_libros(db: Session = Depends(get_db)):
    return db.query(Libro).all()

@app.post("/libros/", response_model=LibroSchema)
def create_libro(libro: LibroSchema, db: Session = Depends(get_db)):
    db_libro = Libro(**libro.dict())
    db.add(db_libro)
    db.commit()
    db.refresh(db_libro)
    return db_libro

@app.put("/libros/{libro_id}", response_model=LibroSchema)
def update_libro(libro_id: int, libro: LibroSchema, db: Session = Depends(get_db)):
    db_libro = db.query(Libro).filter(Libro.idlibros == libro_id).first()
    if not db_libro:
        raise HTTPException(status_code=404, detail="Libro no encontrado")
    for key, value in libro.dict().items():
        setattr(db_libro, key, value)
    db.commit()
    db.refresh(db_libro)
    return db_libro

@app.delete("/libros/{libro_id}")
def delete_libro(libro_id: int, db: Session = Depends(get_db)):
    db_libro = db.query(Libro).filter(Libro.idlibros == libro_id).first()
    if not db_libro:
        raise HTTPException(status_code=404, detail="Libro no encontrado")
    db.delete(db_libro)
    db.commit()
    return {"ok": True}

# CRUD Reseñas
@app.get("/resenas/", response_model=List[ResenaSchema])
def get_resenas(db: Session = Depends(get_db)):
    return db.query(Resena).all()

@app.post("/resenas/", response_model=ResenaSchema)
def create_resena(resena: ResenaSchema, db: Session = Depends(get_db)):
    db_resena = Resena(**resena.dict())
    db.add(db_resena)
    db.commit()
    db.refresh(db_resena)
    return db_resena

@app.put("/resenas/{resena_id}", response_model=ResenaSchema)
def update_resena(resena_id: int, resena: ResenaSchema, db: Session = Depends(get_db)):
    db_resena = db.query(Resena).filter(Resena.idresenas == resena_id).first()
    if not db_resena:
        raise HTTPException(status_code=404, detail="Reseña no encontrada")
    for key, value in resena.dict().items():
        setattr(db_resena, key, value)
    db.commit()
    db.refresh(db_resena)
    return db_resena

@app.delete("/resenas/{resena_id}")
def delete_resena(resena_id: int, db: Session = Depends(get_db)):
    db_resena = db.query(Resena).filter(Resena.idresenas == resena_id).first()
    if not db_resena:
        raise HTTPException(status_code=404, detail="Reseña no encontrada")
    db.delete(db_resena)
    db.commit()
    return {"ok": True}