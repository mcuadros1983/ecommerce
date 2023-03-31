import admin from "firebase-admin";
import config from "../config.js"

admin.initializeApp({
    credential: admin.credential.cert(config.firebase),
});

const db = admin.firestore();

class ContenedorFirebase {
    constructor(collectionName) {
        this.collection = db.collection(collectionName);
        this.FieldValue = admin.firestore.FieldValue
    }

    async save(object) {
        try {
            const newElement = await this.collection.add(object).then(doc => doc.id);
            return { status: 'Success', message: `Un nuevo elemento fue agregado a la base de datos con el ID ${newElement}`, id: newElement }
        } catch (err) {
            return { status: 'Error', message: `No se pudo guardar el documento: ${err}` }
        }
    }

    async getById(id) {
        try {
            //const doc = this.collection.doc(`${id}`);
            const doc = this.collection.doc(id);
            let data = await doc.get();
            let res = data.data();
            //console.log(res)
            if (!res) {
                return { status: 'Error', message: `No se encontro el elemento con ID ${id} en la base de datos` }
            } else {
                return { status: 'Success', message: `Se obtuvo el elemento con ID ${id} buscado`, payload: res }
            }
        } catch (err) {
            return { status: 'Error', message: `No se encontro el elemento con ID ${id} en la base de datos, ${err}` }
        }
    }

    async getAll() {
        try {
            const result = [];
            const snapshot = await this.collection.get();
            snapshot.forEach((doc) => {
                result.push({ id: doc.id, ...doc.data() });
            });
            if (result.length > 0) {
                return { status: 'Success', message: 'Se obtuvieron los elementos buscados.', payload: result };
            } else {
                return { status: 'Error', message: `No se pudo realizar la busqueda.` }
            }
        } catch (err) {
            return { status: 'Error', message: `No se pudo realizar la busqueda ${err}.` }
        }
    }

    async deleteById(id) {
        try {
            const exist = await this.getById(id);
            if (exist.status === 'Error') {
                return { status: 'Error', message: `No se ha podido eliminar el objecto con ID ${id}.` }
            } else {
                const doc = this.collection.doc(id);
                await doc.delete();
                return { status: 'Success', message: `Se elimino correctamente el objeto con ID ${id}` }
            }
        } catch (err) {
            return { status: 'Error', message: `No se ha podido eliminar el objecto con ID ${id}. ${err}` }
        }
    }

    async deleteAll() {
        try {
            const contenido = await this.collection.get().delete()
            return true
        } catch (err) {
            return { status: 'Error', message: `No se pudo ejecutar la tarea` }
            //return null
        }   
    }

    async updateById(id, object) {
        try {
            const doc = this.collection.doc(id);
            await doc.update(object);
            return { status: 'Success', message: `Se actualizo con éxito el objeto con ID ${id}` }
        } catch (err) {
            return { status: 'Error', message: `No se pudo actualizar el documento con ID ${id}, ${err}` }
        }
    }
}

export default ContenedorFirebase;