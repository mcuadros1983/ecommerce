import ContenedorFirebase from "../../contenedores/ContenedorFirebase.js";
import { ProductosDaoFirebase } from "../productos/ProductosDaoFirebase.js";
//import { productosDao } from "../index.js"

class CarritosDaoFirebase extends ContenedorFirebase {
    constructor() {
        super("carrito");
        this.product = new ProductosDaoFirebase()
    }

    async addProduct(id, id_prod) {
        try {
            let existProd = await this.product.getById(id_prod).then(e => e.payload);
            if (!existProd) {
                return { status: 'Error', message: `El producto de ID ${id_prod} no existe` };
            }

            let ref = this.collection.doc(id);
            let data = await ref.get().then(doc => doc.exists ? doc.data() : null);
            if (!data) {
                return { status: 'Error', message: `El carrito de ID ${id} no existe` };
            }

            let product = { id: id_prod, ...existProd }

            await this.collection.doc(id).update({
                //productos: this.FieldValue.arrayUnion(id_prod)
                productos: this.FieldValue.arrayUnion(product)
            });

            return { status: 'Success', message: `Se agrego el producto de ID ${id_prod} al carrito de ID ${id}` };
        } catch (err) {
            return { status: 'Error', message: `Hubo un error: ${err}` };
        }
    }

    async deleteProductByIdCart(id, id_prod) {

        try {
            let isProdExist = await this.product.getById(id_prod).then(e => e.payload);
            if (!isProdExist) {
                return { status: 'Error', message: `No se encontro el elemento con ID ${id} en la base de datos` }
            }

            let ref = this.collection.doc(id);
            let data = await ref.get().then(doc => doc.exists ? doc.data() : null);
            if (!data) {
                return { status: 'Error', message: `No se encontro el elemento con ID ${id} en la base de datos` }
            }
            //console.log(data.productos)

            let isProdInCart = data.productos.some((e) => e.id == id_prod);
            if (!isProdInCart) {
                return { status: 'Error', message: `No existe el producto dentro del carrito.` };
            }
            
            let newCart = data.productos.filter((e) => e.id !== id_prod);
            console.log(newCart)
            await this.collection.doc(id).set({
                productos: newCart
            });

            return { status: 'Success', message: `Se elimino el producto de ID ${id_prod} del carrito de ID ${id}`, result: newCart };
        } catch (err) {
            return { status: 'Error', message: `Hubo un error: ${err}` };
        }

    }

}

export { CarritosDaoFirebase };