import ContenedorMemoria from "../../contenedores/ContenedorMemoria.js";

class ProductosDaoMemoria extends ContenedorMemoria {
    constructor() {
        super("productos");
    }

    createProduct(object) {
        const newId = this.save(object)
        return newId

    }
}

export { ProductosDaoMemoria };



