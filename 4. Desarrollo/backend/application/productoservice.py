from domain.entityproducto import Producto
from infrastructure.productorepository import ProductRepository


class ProductoService:

    def __init__(self):
        self.repository = ProductRepository()

    def consultar(self):

        datos = self.repository.get_all()

        return {
            "operacion": "Consulta realizada",
            "payload": datos
        }

    def consultar_por_id(self, id_producto: int):

        entityproducto = self.repository.get_one(id_producto)

        if entityproducto is None:
            return {
                "operacion": "Consulta realizada",
                "mensaje": "Producto no encontrado",
                "payload": None
            }

        return {
            "operacion": "Consulta realizada",
            "payload": entityproducto
        }

    def ingresar(self, producto: Producto):

        resultado = self.repository.create(producto)

        return {
            "operacion": "Ingreso realizado",
            "payload": resultado
        }

    def modificar(
        self,
        id_producto: int,
        producto: Producto
    ):

        resultado = self.repository.update(
            id_producto,
            producto
        )

        if resultado is None:

            return {
                "operacion": "Modificación realizada",
                "mensaje": "Producto no encontrado",
                "payload": None
            }

        return {
            "operacion": "Modificación realizada",
            "payload": resultado
        }

    def eliminar(self, id_producto: int):

        resultado = self.repository.delete(id_producto)

        if resultado is None:

            return {
                "operacion": "Eliminación realizada",
                "mensaje": "Producto no encontrado",
                "payload": None
            }

        return {
            "operacion": "Eliminación realizada",
            "payload": resultado
        }