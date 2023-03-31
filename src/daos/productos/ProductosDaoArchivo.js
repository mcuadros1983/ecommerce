import ContenedorArchivo from "../../contenedores/ContenedorArchivo.js";
import fs from "fs";

class ProductosDaoArchivo extends ContenedorArchivo {
    constructor() {
        super("productos");
    }
}

export { ProductosDaoArchivo };