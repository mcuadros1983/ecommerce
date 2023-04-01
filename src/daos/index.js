import { config } from "dotenv";
config();

// Archivo
import { ProductosDaoArchivo } from "./productos/ProductosDaoArchivo.js";
import { CarritosDaoArchivo } from "./carritos/CarritosDaoArchivo.js";

// Memoria
import { ProductosDaoMemoria } from "./productos/ProductosDaoMemoria.js";
import { CarritosDaoMemoria } from "./carritos/CarritosDaoMemoria.js";

// Firebase
import { connectFirebase } from "../db/firebaseConnect.js";
import { ProductosDaoFirebase } from "./productos/ProductosDaoFirebase.js";
import { CarritosDaoFirebase } from "./carritos/CarritosDaoFirebase.js";

// MongoDb
import { connectMongo } from "../db/mongoConnect.js";
import { ProductosDaoMongoDb } from "./productos/ProductosDaoMongoDb.js";
import { CarritosDaoMongoDb } from "./carritos/CarritosDaoMongoDb.js"
import { UsuarioDaoMongoDb } from "./usuario/UsuarioDaoMongoDb.js";
import { OrdenDaoMongoDb } from "./orden/OrdenDaoMongoDb.js";
import { CategoriaDaoMongoDb } from "./categorias/CategoriasDaoMongoDb.js";


let productosDao;
let carritosDao;
let usuariosDao;
let ordenDao;
let categoriasDao;

const PERS = process.env.PERS || "mongoDb";

switch (PERS) {
  case "archivo":
    productosDao = new ProductosDaoArchivo();
    carritosDao = new CarritosDaoArchivo();
    break;

  case "memoria":
    productosDao = new ProductosDaoMemoria();
    carritosDao = new CarritosDaoMemoria();
    break;

  case "firebase":
    productosDao = new ProductosDaoFirebase();
    carritosDao = new CarritosDaoFirebase();
    break;

  case "mongoDb":
    connectMongo();
    productosDao = new ProductosDaoMongoDb();
    carritosDao = new CarritosDaoMongoDb();
    usuariosDao = new UsuarioDaoMongoDb();
    ordenDao = new OrdenDaoMongoDb();
    categoriasDao = new CategoriaDaoMongoDb();

    break;
}

export { productosDao, carritosDao, usuariosDao, ordenDao, categoriasDao };