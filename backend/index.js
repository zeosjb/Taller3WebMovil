const express = require('express')
const dotenv =  require('dotenv')
const cors = require('cors')
const port = process.env.PORT || 5000
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const githubRoute = require('./routes/githubRoute')

dotenv.config()

/**
 * Conecta la aplicación a la base de datos MongoDB utilizando la URI especificada en la variable de entorno MONGO_URI.
 * Si la conexión es exitosa, imprime un mensaje indicando que la conexión se ha establecido correctamente.
 * En caso de error, imprime el error y finaliza el proceso con código de salida 1.
 */
connectDB()

/**
 * Crea una instancia de la aplicación Express.
 */
const app = express()
/**
 * Habilita el uso de CORS para permitir solicitudes desde cualquier origen.
 */
app.use(cors())

/**
 * Middleware para procesar datos JSON en las solicitudes.
 */
app.use(express.json())

/**
 * Middleware para procesar datos de formulario en las solicitudes.
 */
app.use(express.urlencoded({ extended: false }))

/**
 * Rutas para la autenticación de usuarios.
 */
app.use('/auth/user', require('./routes/userRoute'))

/**
 * Rutas relacionadas con la integración con GitHub.
 */
app.use('/github', githubRoute)


/**
 * Middleware de manejo de errores global. Captura errores y envía respuestas de error adecuadas.
 */
app.use(errorHandler)

/**
 * Inicia el servidor Express y escucha en el puerto especificado.
 */
app.listen(port, () => {
    console.log(`Server is running in port ${port}`)
})