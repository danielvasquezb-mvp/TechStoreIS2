from domain.entityproducto import Producto, ProductoResponse


class ProductRepository:

    def __init__(self):
        self.productos = []
        self.contador_id = 1

    def get_all(self):
        return self.productos

    def get_one(self, id_producto: int):

        for producto in self.productos:

            if producto.id == id_producto:
                return producto

        return None

    def create(self, producto: Producto):

        producto_response = ProductoResponse(
            id=self.contador_id,
            nombre=producto.nombre,
            descripcion=producto.descripcion,
            categoria=producto.categoria,
            precio=producto.precio,
            cantidad=producto.cantidad,
            estado=producto.estado
        )

        self.productos.append(producto_response)

        self.contador_id += 1

        return producto_response

    def update(self, id_producto: int, producto: Producto):

        for index, item in enumerate(self.productos):

            if item.id == id_producto:

                producto_response = ProductoResponse(
                    id=id_producto,
                    nombre=producto.nombre,
                    descripcion=producto.descripcion,
                    categoria=producto.categoria,
                    precio=producto.precio,
                    cantidad=producto.cantidad,
                    estado=producto.estado
                )

                self.productos[index] = producto_response

                return producto_response

        return None

    def delete(self, id_producto: int):

        for index, item in enumerate(self.productos):

            if item.id == id_producto:
                return self.productos.pop(index)

        return None