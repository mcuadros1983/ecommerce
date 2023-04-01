
import productSchema from "../../models/productos.js";
import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js"

class ProductosDaoMongoDb extends ContenedorMongoDb {
    constructor() {
        super('productos', productSchema)
    }

    async getProductsByCategoryName(category_name) {
        try {
            const products = await this.collection.find({ category: category_name });
            return products;
        } catch (err) {
            throw new Error(err?.message);
        }
    }
}
export { ProductosDaoMongoDb };