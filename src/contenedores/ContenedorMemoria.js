class ContenedorMemoria {
    constructor() {
        this.array = [];
    }

    async write(datos) {
        try {
            this.array.push(datos)
            return { status: 'Success', message: `Un nuevo elemento fue agregado a la base de datos` }
        } catch (err) {
            return { status: 'Error', message: `No se pudo guardar el documento: ${err}` }
        }
    }

    async save(objeto) {
        try {
            let newId = 1
            const array = await this.getAll()
            if (array.length !== 0) {
                newId = array[array.length - 1].id + 1
                console.log(newId)
            } else {
                newId
            }
            const data = { id: newId, ...objeto }
            this.array.push(data)
            console.log(this.array)
            return { status: 'Success', message: `Un nuevo elemento fue agregado a la base de datos con el ID ${newId}`, id: newId }
        } catch (error) {
            return { status: 'Error', message: `No se pudo guardar el documento: ${err}` }
        }

    }


    async getById(id) {
        try {
            const producto = this.array.find((item) => item.id == id);
            if (!producto) {
                return { status: 'Error', message: `No se encontro el elemento con ID ${id} en la base de datos` }
            } else {
                return { status: 'Success', message: `Se obtuvo el elemento con ID ${id} buscado`, payload: producto }
            }
        } catch (err) {
            return { status: 'Error', message: `No se encontro el elemento con ID ${id} en la base de datos, ${err}` }
        }
    }

    async getAll() {
        if (this.array.length > 0) {
            return { status: 'Success', message: 'Se obtuvieron los elementos buscados.', payload: [...this.array] };
        } else {
            return { status: 'Error', message: `No se pudo realizar la busqueda.` }
        }
    }

    async deleteById(id) {
        const element = await this.getById(id);
        //console.log(element.payload.id)
        if (element.status == "Error") {
            return { status: 'Error', message: `No se ha podido eliminar el objecto con ID ${id}.` }
        }
        let data = await this.getAll();
        //console.log(data)
        if (data.length == 0) {
            return { status: 'Error', message: `No se ha podido eliminar el objecto con ID ${id}.` }
        }
        try {
            this.array = data.filter((item) => item.id !== element.payload.id);
            return { status: 'Success', message: `Se elimino correctamente el objeto con ID ${id}` }
        } catch (err) {
            return { status: 'Error', message: `No se ha podido eliminar el objecto con ID ${id}. ${err}` }
        }
    }

    async deleteAll() {
        try {
            if (this.array.length > 0) {
                this.array = [];
                return true
            } else {
                return null;
            }
        } catch (err) {
            return { status: 'Error', message: `No se pudo realizar la busqueda ${err}.` }
        }

    }

    async updateById(id, object) {
        try {
            const array = await this.getAll();
            const encontrado = array.find(el => el.id == Number(id))
            console.log(object)

            if (encontrado) {
                const newArray = array.map(elem => {
                    if (elem.id === Number(id)) {

                        return {
                            id, ...object
                        }
                    }
                    return elem
                })
                this.array = newArray
                return { status: 'Success', message: `Se actualizo con éxito el objeto con ID ${id}` }
            } else {
                return { status: 'Error', message: `No se pudo actualizar el documento con ID ${id}` }
            }
        } catch (err) {
            return { status: 'Error', message: `No se pudo actualizar el documento con ID ${id}, ${err}` }
        }

    }
}

export default ContenedorMemoria;