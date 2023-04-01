import CategorySchema from "../../models/categoria.js";
import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js"

class CategoriaDaoMongoDb extends ContenedorMongoDb {
    constructor() {
        super('categorias', CategorySchema)
    }
}
export { CategoriaDaoMongoDb };
