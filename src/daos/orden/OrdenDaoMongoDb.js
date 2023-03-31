import orderSchema from "../../models/orden.js";
import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js"

class OrdenDaoMongoDb extends ContenedorMongoDb {
    constructor() {
        super('orden', orderSchema)
    }

    async getAllOrdersByBuyerEmail(buyer_email) {
        try {
            const orders = await this.collection.find({ buyer_email });
            return orders
        } catch (err) {
            throw new Error(err?.message);
        }
    }

}
export { OrdenDaoMongoDb };
