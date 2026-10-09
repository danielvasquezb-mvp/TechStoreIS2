from pydantic import BaseModel


class Producto(BaseModel):
    nombre: str
    descripcion: str
    categoria: str
    precio: float
    cantidad: int
    estado: bool


class ProductoResponse(BaseModel):
    id: int
    nombre: str
    descripcion: str
    categoria: str
    precio: float
    cantidad: int
    estado: bool