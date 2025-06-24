from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from models import Autor, Usuario, Libro, Resena, Categoria, Base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from pydantic import BaseModel
from typing import List, Optional
from datetime import date, datetime

DATABASE_URL = "mysql+mysqlconnector://Adair:Adair@127.0.0.1:3306/resenas_libros_db"
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

# ------------------- AUTORES -------------------
class AutorSchema(BaseModel):
    nombre: str
    nacionalidad: str
    fecha_nacimiento: date

class AutorOut(AutorSchema):
    id_autor: int
    class Config:
        orm_mode = True

# GET: Listar autores
@app.get("/autores", response_model=List[AutorOut])
def listar_autores(db: Session = Depends(get_db)):
    return db.query(Autor).all()

# GET: Obtener autor por ID
@app.get("/autores/{autor_id}", response_model=AutorOut)
def obtener_autor(autor_id: int, db: Session = Depends(get_db)):
    autor = db.query(Autor).filter(Autor.id_autor == autor_id).first()
    if not autor:
        raise HTTPException(status_code=404, detail="Autor no encontrado")
    return autor

# POST: Crear autor
@app.post("/autores", response_model=AutorOut)
def crear_autor(autor: AutorSchema, db: Session = Depends(get_db)):
    nuevo_autor = Autor(**autor.dict())
    db.add(nuevo_autor)
    db.commit()
    db.refresh(nuevo_autor)
    return nuevo_autor

# PUT: Actualizar autor
@app.put("/autores/{autor_id}", response_model=AutorOut)
def actualizar_autor(autor_id: int, datos: AutorSchema, db: Session = Depends(get_db)):
    autor = db.query(Autor).filter(Autor.id_autor == autor_id).first()
    if not autor:
        raise HTTPException(status_code=404, detail="Autor no encontrado")
    for key, value in datos.dict().items():
        setattr(autor, key, value)
    db.commit()
    db.refresh(autor)
    return autor

# DELETE: Eliminar autor
@app.delete("/autores/{autor_id}")
def eliminar_autor(autor_id: int, db: Session = Depends(get_db)):
    autor = db.query(Autor).filter(Autor.id_autor == autor_id).first()
    if not autor:
        raise HTTPException(status_code=404, detail="Autor no encontrado")
    db.delete(autor)
    db.commit()
    return {"ok": True, "mensaje": "Autor eliminado"}

# ------------------- USUARIOS -------------------
class UsuarioSchema(BaseModel):
    nombre: str
    email: str
    fecha_registro: date
    contrasena: str

class UsuarioOut(UsuarioSchema):
    id_usuario: int
    class Config:
        orm_mode = True

@app.get("/usuarios", response_model=List[UsuarioOut])
def listar_usuarios(db: Session = Depends(get_db)):
    return db.query(Usuario).all()

@app.get("/usuarios/{usuario_id}", response_model=UsuarioOut)
def obtener_usuario(usuario_id: int, db: Session = Depends(get_db)):
    usuario = db.query(Usuario).filter(Usuario.id_usuario == usuario_id).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return usuario

@app.post("/usuarios", response_model=UsuarioOut)
def crear_usuario(usuario: UsuarioSchema, db: Session = Depends(get_db)):
    nuevo_usuario = Usuario(**usuario.dict())
    db.add(nuevo_usuario)
    db.commit()
    db.refresh(nuevo_usuario)
    return nuevo_usuario

@app.put("/usuarios/{usuario_id}", response_model=UsuarioOut)
def actualizar_usuario(usuario_id: int, datos: UsuarioSchema, db: Session = Depends(get_db)):
    usuario = db.query(Usuario).filter(Usuario.id_usuario == usuario_id).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    for key, value in datos.dict().items():
        setattr(usuario, key, value)
    db.commit()
    db.refresh(usuario)
    return usuario

@app.delete("/usuarios/{usuario_id}")
def eliminar_usuario(usuario_id: int, db: Session = Depends(get_db)):
    usuario = db.query(Usuario).filter(Usuario.id_usuario == usuario_id).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    db.delete(usuario)
    db.commit()
    return {"ok": True, "mensaje": "Usuario eliminado"}

# ------------------- LIBROS -------------------
class LibroSchema(BaseModel):
    titulo: str
    fecha_publicacion: date
    isbn: str
    id_autor: int
    id_categoria: int

class LibroOut(LibroSchema):
    id_libro: int
    class Config:
        orm_mode = True

@app.get("/libros", response_model=List[LibroOut])
def listar_libros(db: Session = Depends(get_db)):
    return db.query(Libro).all()

@app.get("/libros/{libro_id}", response_model=LibroOut)
def obtener_libro(libro_id: int, db: Session = Depends(get_db)):
    libro = db.query(Libro).filter(Libro.id_libro == libro_id).first()
    if not libro:
        raise HTTPException(status_code=404, detail="Libro no encontrado")
    return libro

@app.post("/libros", response_model=LibroOut)
def crear_libro(libro: LibroSchema, db: Session = Depends(get_db)):
    nuevo_libro = Libro(**libro.dict())
    db.add(nuevo_libro)
    db.commit()
    db.refresh(nuevo_libro)
    return nuevo_libro

@app.put("/libros/{libro_id}", response_model=LibroOut)
def actualizar_libro(libro_id: int, datos: LibroSchema, db: Session = Depends(get_db)):
    libro = db.query(Libro).filter(Libro.id_libro == libro_id).first()
    if not libro:
        raise HTTPException(status_code=404, detail="Libro no encontrado")
    for key, value in datos.dict().items():
        setattr(libro, key, value)
    db.commit()
    db.refresh(libro)
    return libro

@app.delete("/libros/{libro_id}")
def eliminar_libro(libro_id: int, db: Session = Depends(get_db)):
    libro = db.query(Libro).filter(Libro.id_libro == libro_id).first()
    if not libro:
        raise HTTPException(status_code=404, detail="Libro no encontrado")
    db.delete(libro)
    db.commit()
    return {"ok": True, "mensaje": "Libro eliminado"}

# ------------------- RESEÑAS -------------------
class ResenaSchema(BaseModel):
    calificacion: int
    comentario: str
    fecha_resena: datetime
    id_usuario: int
    id_libro: int

class ResenaOut(ResenaSchema):
    id_resena: int
    class Config:
        orm_mode = True

@app.get("/resenas", response_model=List[ResenaOut])
def listar_resenas(db: Session = Depends(get_db)):
    return db.query(Resena).all()

@app.get("/resenas/{resena_id}", response_model=ResenaOut)
def obtener_resena(resena_id: int, db: Session = Depends(get_db)):
    resena = db.query(Resena).filter(Resena.id_resena == resena_id).first()
    if not resena:
        raise HTTPException(status_code=404, detail="Reseña no encontrada")
    return resena

@app.post("/resenas", response_model=ResenaOut)
def crear_resena(resena: ResenaSchema, db: Session = Depends(get_db)):
    nueva_resena = Resena(**resena.dict())
    db.add(nueva_resena)
    db.commit()
    db.refresh(nueva_resena)
    return nueva_resena

@app.put("/resenas/{resena_id}", response_model=ResenaOut)
def actualizar_resena(resena_id: int, datos: ResenaSchema, db: Session = Depends(get_db)):
    resena = db.query(Resena).filter(Resena.id_resena == resena_id).first()
    if not resena:
        raise HTTPException(status_code=404, detail="Reseña no encontrada")
    for key, value in datos.dict().items():
        setattr(resena, key, value)
    db.commit()
    db.refresh(resena)
    return resena

@app.delete("/resenas/{resena_id}")
def eliminar_resena(resena_id: int, db: Session = Depends(get_db)):
    resena = db.query(Resena).filter(Resena.id_resena == resena_id).first()
    if not resena:
        raise HTTPException(status_code=404, detail="Reseña no encontrada")
    db.delete(resena)
    db.commit()
    return {"ok": True, "mensaje": "Reseña eliminada"}

# ------------------- CATEGORIAS -------------------
class CategoriaSchema(BaseModel):
    nombre: str
    descripcion: Optional[str] = None

class CategoriaOut(CategoriaSchema):
    id_categoria: int
    class Config:
        orm_mode = True

@app.get("/categorias", response_model=List[CategoriaOut])
def listar_categorias(db: Session = Depends(get_db)):
    return db.query(Categoria).all()

@app.get("/categorias/{categoria_id}", response_model=CategoriaOut)
def obtener_categoria(categoria_id: int, db: Session = Depends(get_db)):
    categoria = db.query(Categoria).filter(Categoria.id_categoria == categoria_id).first()
    if not categoria:
        raise HTTPException(status_code=404, detail="Categoría no encontrada")
    return categoria

@app.post("/categorias", response_model=CategoriaOut)
def crear_categoria(categoria: CategoriaSchema, db: Session = Depends(get_db)):
    nueva_categoria = Categoria(**categoria.dict())
    db.add(nueva_categoria)
    db.commit()
    db.refresh(nueva_categoria)
    return nueva_categoria

@app.put("/categorias/{categoria_id}", response_model=CategoriaOut)
def actualizar_categoria(categoria_id: int, datos: CategoriaSchema, db: Session = Depends(get_db)):
    categoria = db.query(Categoria).filter(Categoria.id_categoria == categoria_id).first()
    if not categoria:
        raise HTTPException(status_code=404, detail="Categoría no encontrada")
    for key, value in datos.dict().items():
        setattr(categoria, key, value)
    db.commit()
    db.refresh(categoria)
    return categoria

@app.delete("/categorias/{categoria_id}")
def eliminar_categoria(categoria_id: int, db: Session = Depends(get_db)):
    categoria = db.query(Categoria).filter(Categoria.id_categoria == categoria_id).first()
    if not categoria:
        raise HTTPException(status_code=404, detail="Categoría no encontrada")
    db.delete(categoria)
    db.commit()
    return {"ok": True, "mensaje": "Categoría eliminada"}