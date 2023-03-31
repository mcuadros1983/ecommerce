import mongoose from "mongoose"
import config from "../config.js"

export const connectMongo = () => {
    console.log("connecting mongo")
    mongoose.connect(config.mongoDb.connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.info('Connection to mongoDB successful'))
        .catch((error) => console.error("error in connection to mongoDB", error))
}
