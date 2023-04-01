import mongoose from "mongoose";



class ContenedorMongoDb {
    constructor(collectionName, schema) {
        this.collection = mongoose.model(collectionName, schema);
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
            return { status: 'Success', message: `Se obtuvo el elemento con ID ${id} buscado`, payload: object }
        } catch (err) {
            return { status: 'Error', message: `No se encontro el elemento con ID ${id} en la base de datos, ${err}` }
        }
    }

    async getAll() { 
        try {
            let objects = await this.collection.find({});
            return { status: 'Success', message: 'Se obtuvieron los elementos buscados.', payload: objects }
        } catch (err) {
            return { status: 'Error', message: `No se pudo realizar la busqueda ${err}.` }
        }
    }

    async deleteById(id) {
        try {
            let deleted = await this.collection.findOneAndDelete({ _id: id })
            return { status: 'Success', message: `Se elimino correctamente el objeto con ID ${id}`, payload:deleted}
        } catch (err) {
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