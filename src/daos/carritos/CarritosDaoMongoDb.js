
import { carritoSchema } from "../../models/carritos.js";
import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js"
import { ProductosDaoMongoDb } from "../productos/ProductosDaoMongoDb.js";

class CarritosDaoMongoDb extends ContenedorMongoDb {
    constructor() {
        super('carritos', carritoSchema)
        this.product = new ProductosDaoMongoDb()
    }

    async createProductOfACart(cart_id, product, total) {
        try {
            const { products } = await this.collection.findOne(
                { _id: cart_id },
                {
                    products: { $elemMatch: { _id: product._id } },
                }
            );
            if (products.length > 0) {
                await this.deleteProductByCartId(cart_id, product._id);
            }
            return await this.collection.findByIdAndUpdate(
                { _id: cart_id },
                { $push: { products: product }, total }
            );
        } catch (err) {
            throw new Error(err?.message);
        }
    }

    async deleteCartById(cart_id) {
        try {
          const cart = await this.getById(cart_id);
          await this.collection.updateOne(
            { _id: cart_id },
            { $set: { products: [], total: 0 } }
          );
          return cart;
        } catch (err) {
          throw new Error(err?.message);
        }
      }

    async deleteProductByCartId(cart_id, product_id) {
        try {
            const { products } = await this.collection.findOne(
                { _id: cart_id },
                {
                    products: { $elemMatch: { _id: product_id } },
                }
            );
            let { total } = await this.getById(cart_id);
            const newTotal = total - products[0].price * products[0].in_cart;
            await this.collection.updateOne(
                { _id: cart_id },
                {
                    $pull: { products: { _id: product_id } },
                    $set: { total: newTotal },
                }
            );
            return products[0];
        } catch (err) {
            throw new Error(err?.message);
        }
    }

    async deleteProductOfAllCartsById(product_id) {
        try {
          const product = await ProductosDaoMongoDb.findById(product_id);
          await this.collection.updateMany({ $pull: { products: { _id: product_id } } });
          return product;
        } catch (err) {
          throw new Error(err?.message);
        }
      }
}
export { CarritosDaoMongoDb };