const mongoose = require('mongoose')

/**
 * Schema de mongoDB para la base de datos
 */
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Correo electrónico obligatorio"],
        unique: [true, "Error al ingresar el correo"]
    },
    rut: {
        type: String,
        required: [true, "RUT obligatorio"],
        unique: [true, "Error al ingresar el RUT"]
    },
    birthDate: {
        type: Date,
        required: [true, "La fecha de nacimiento es obligatoria"]
    },
    name: {
        type: String,
        required: [true, "El nombre es obligatorio"]
    },
    password: {
        type: String,
        required: [true, "Contraseña obligatoria"]
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('User', userSchema)