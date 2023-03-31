import admin from "firebase-admin";
import config from "../config.js";

export const connectFirebase  = async() => {
    await admin.initializeApp({
        credential: admin.credential.cert(config.firebase),
    }).then(() => {

        if (connectFirebase.__extended) {
            console.log('Connection to firebase successful')
        } else {
            console.error("error in connection to firebase", error)
        }
    })
}