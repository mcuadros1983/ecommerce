import ContenedorArchivo from "../../contenedores/ContenedorArchivo.js";
import { ProductosDaoArchivo } from "../productos/ProductosDaoArchivo.js";
import fs from "fs";

class CarritosDaoArchivo extends ContenedorArchivo {
    constructor() {
        super("carrito");
        this.product = new ProductosDaoArchivo()
    }

    async addProduct(id, id_prod) {
        try {
            //Obtengo todos los carritos
            let carts = await this.getAll();
            if (!carts) {
                return { status: 'Error', message: `No existen carritos creados` };
            }

            //Obtengo el carrito del id en especifico
            let cart = await carts.find(cart => cart.id == id)
            //console.log(carts)
            //console.log(cart)
            if (!cart) {
                return { status: 'Error', message: `El carrito de ID ${id} no existe` };
            }

            //Obtengo el producto del id en especifico
            let productById = await this.product.getById(id_prod)
            console.log(productById)
            if (productById.status == "Error") {
                return { status: 'Error', message: `El producto de ID ${id_prod} no existe` };
            };

            cart.productos.push(productById.payload)
            await this.write(carts, "Producto agregado exitosamente");
            return { status: 'Success', message: `Se agrego el producto de ID ${id_prod} al carrito de ID ${id}` };
        } catch (err) {
            return { status: 'Error', message: `Hubo un error: ${err}` };
        }
    }

    async deleteProductByIdCart(id, id_prod) {
        try {
            const array = await this.getAll()
            const carrito = array.find(cart => cart.id == Number(id));
            if (carrito == undefined) {
                return { status: 'Error', message: `No se encontro el elemento con ID ${id} en la base de datos` }
            }
            const producto = carrito.productos.find(product => product.id == Number(id_prod));
            if (producto == undefined) {
                return { status: 'Error', message: `No se encontro el elemento con ID ${id_prod} en la base de datos` }
            }

            

            let newArray = carrito.productos.filter((item) => item.id !== Number(id_prod));
            carrito.productos = newArray
            const newData = JSON.stringify(newArray)
            await this.write(array)
            return { status: 'Success', message: `Se elimino el producto de ID ${id_prod} del carrito de ID ${id}`, result: newData };
        } catch (err) {
            return { status: 'Error', message: `Hubo un error: ${err}` };
        }
    }
}

export { CarritosDaoArchivo };