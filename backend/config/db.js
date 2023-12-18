const mongoose = require('mongoose')

/**
 * Conecta a la base de datos MongoDB utilizando la URI proporcionada en las variables de entorno.
 * Imprime un mensaje en la consola indicando el éxito de la conexión o, en caso de error, imprime el error y termina el proceso.
 */
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB