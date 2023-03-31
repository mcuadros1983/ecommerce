
import userSchema from "../../models/usuario.js";
import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js"

class UsuarioDaoMongoDb extends ContenedorMongoDb {
    constructor() {
        super('usuarios', userSchema)
    }

    async getUserByEmail(email) {
        try {
          const user = await this.collection.findOne({email});
          return user
        } catch (err) {
          throw new Error(err?.message);
        }
      }

}
export { UsuarioDaoMongoDb };