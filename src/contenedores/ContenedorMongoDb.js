import mongoose from "mongoose";
// import config from "../config.js"

//Conexión a MongoDB
// mongoose.connect(config.mongoDb.connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.info('Connection to mongoDB successful'))
//     .catch((error) => console.error("error in connection to mongoDB", error))


class ContenedorMongoDb {
    constructor(collectionName, schema) {
        //constructor(model) {
        this.collection = mongoose.model(collectionName, schema);
        // this.model = model;
    }

    async save(object) {
        try {
            const newElement = await this.collection.create(object)
            return { status: 'Success', message: `Un nuevo elemento fue agregado a la base de datos con el ID ${newElement._id}`, id: newElement._id, payload:newElement }
        } catch (err) {
            return { status: 'Error', message: `No se pudo guardar el documento: ${err}` }
        }
    }

    async getById(id) {
        try {
            let object = await this.collection.findById(id);
            // if (producto) {
            return { status: 'Success', message: `Se obtuvo el elemento con ID ${id} buscado`, payload: object }
            // }
        } catch (err) {
            //return { status: 'Err', message: `No se pudo obtener el documento solicitado: ${err}` }
            return { status: 'Error', message: `No se encontro el elemento con ID ${id} en la base de datos, ${err}` }
        }
    }

    async getAll() { 
        try {
            //return await this.collection.find({});
            let objects = await this.collection.find({});
            //console.log(objects)
            return { status: 'Success', message: 'Se obtuvieron los elementos buscados.', payload: objects }
        } catch (err) {
            return { status: 'Error', message: `No se pudo realizar la busqueda ${err}.` }
        }
    }

    async deleteById(id) {
        try {
            //const element = await this.collection.findOneAndDelete({ _id: id })
            // console.log(element)
            // if (element) {
            let deleted = await this.collection.findOneAndDelete({ _id: id })
            return { status: 'Success', message: `Se elimino correctamente el objeto con ID ${id}`, payload:deleted}
            // } else {
            //     return { status: 'Error', message: `No existe el elemento que desea eliminar con ID: ${id}.` }
            // }
            //let data = await this.getAll();
        } catch (err) {
            //console.log(id)
            return { status: 'Error', message: `No se ha podido eliminar el objeto con ID ${id}, ${err}` }
        }
    }

    async deleteAll() {
        try {
            const contenido = await this.collection.find().delete()
            return
        } catch (err) {
            return { status: 'Error', message: `No se pudo realizar la operacion ${err}.` }
        }
    }

    async updateById(id, object) {
        try {
            const element = await this.collection.findByIdAndUpdate(id, object);
            console.log(element)
            return { status: 'Success', message: `Se actualizo con éxito el objeto con ID ${id}`, payload:element }
        } catch (err) {
            console.log(err)
            return { status: 'Error', message: `No se pudo actualizar el documento con ID ${id}, ${err}` }
        }
    }
}
export default ContenedorMongoDb;