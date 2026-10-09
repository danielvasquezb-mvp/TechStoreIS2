from fastapi import FastAPI

from domain.entityproducto import Producto
from application.productoservice import ProductoService


app = FastAPI(
    title="API TechStore",
    description="API REST para gestión de productos",
    version="1.0.0"
)

service = ProductoService()


@app.get(
    "/",
    summary="Consultar API TechStore",
    description="Consultar estado de la API",
    tags=["TechStore"]
)
async def inicio():
    return {
        "mensaje": "API TechStore funcionando"
    }


# --------------------------------
# GET - Consulta
# --------------------------------

@app.get(
    "/api/productos",
    summary="Consultar Productos",
    description="Consultar todos los productos",
    tags=["Producto"]
)
async def consultar():
    return service.consultar()


# --------------------------------
# GET ONE - Consulta por ID
# --------------------------------

@app.get(
    "/api/productos/{id_producto}",
    summary="Consultar Producto por ID",
    description="Consultar un producto por su identificador",
    tags=["Producto"]
)
async def consultar_por_id(id_producto: int):
    return service.consultar_por_id(id_producto)


# --------------------------------
# POST - Ingreso
# --------------------------------

@app.post(
    "/api/productos",
    summary="Ingresar Producto",
    description="Registrar un nuevo producto",
    tags=["Producto"]
)
async def ingresar(producto: Producto):
    return service.ingresar(producto)


# --------------------------------
# PUT - Modificación
# --------------------------------

@app.put(
    "/api/productos/{id_producto}",
    summary="Modificar Producto",
    description="Modificar un producto existente",
    tags=["Producto"]
)
async def modificar(
    id_producto: int,
    producto: Producto
):
    return service.modificar(
    id_producto,
    producto
    )



# --------------------------------
# DELETE - Eliminación
# --------------------------------

@app.delete(
    "/api/productos/{id_producto}",
    summary="Eliminar Producto",
    description="Eliminar un producto",
    tags=["Producto"]
)
async def eliminar(id_producto: int):
    return service.eliminar(id_producto)