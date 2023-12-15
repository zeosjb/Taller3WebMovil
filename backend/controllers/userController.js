const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' })
}

const isValidRut = (rut) => {
    const cleanRut = rut.replace(/[.-]/g, '')
    const dv = cleanRut.slice(-1)
    const rutNumbers = cleanRut.slice(0, -1)
    const reversedRut = rutNumbers.split('').reverse().map(Number)
    const factor = [2, 3, 4, 5, 6, 7]
    let sum = 0

    for (let i = 0; i < reversedRut.length; i++) {
        sum += reversedRut[i] * factor[i % factor.length]
    }

    const expectedDv = 11 - (sum % 11)
    const calculatedDv = expectedDv === 11 ? 0 : expectedDv === 10 ? 'K' : expectedDv

    return dv === String(calculatedDv)
}

const isValidUCNEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

    const allowedDomains = ['ucn.cl', 'alumnos.ucn.cl', 'disc.ucn.cl', 'ce.ucn.cl']

    return emailRegex.test(email) && allowedDomains.includes(email.split('@')[1])
};

const registerUser = asyncHandler(async (req, res) => {
    const { email, rut, birthDate, name } = req.body
    if (!email || !rut || !birthDate || !name) {
        res.status(400)
        throw new Error('Complete todos los campos')
    }

    if (!isValidRut(rut)) {
        res.status(400)
        throw new Error('El RUT no es válido')
    }

    if (!isValidUCNEmail(email)) {
        res.status(400);
        throw new Error('Correo electrónico no es válido o no pertenece a los dominios permitidos');
    }

    const password = rut.replace(/[.-]/g, '')

    const userExists = await User.findOne({ email, rut })

    if (userExists){
        res.status(400)
        throw new Error('')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        email,
        rut,
        birthDate,
        name,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            email: user.email,
            rut: user.rut,
            birthDate: user.birthDate,
            name: user.name,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Datos no válidos')
    }

    res.json({ message: 'Usuario registrado' })
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            email: user.email,
            rut: user.rut,
            birthDate: user.birthDate,
            name: user.name,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Credenciales no válidas')
    }

    res.json({ message: `Usuario: ${name} inicio sesión`})
})

const editProfile = asyncHandler(async (req, res) => {
    const { email, name, birthDate } = req.body

    try {
        if (!email) {
            res.status(400)
            throw new Error('El correo electrónico es obligatorio')
        }

        const existingEmail = await User.findOne({ email, _id: { $ne: req.params.id } })
        if (existingEmail) {
            res.status(400).json({ error: 'Error al ingresar correo electrónico' })
            return
        }

        if (!isValidUCNEmail(email)) {
            res.status(400);
            throw new Error('Correo electrónico no es válido o no pertenece a los dominios permitidos');
        }

        const user = await User.findById(req.params.id)

        if (!user) {
            res.status(404)
            throw new Error('Usuario no encontrado')
        }

        user.email = email || user.email
        user.name = name || user.name
        user.birthDate = birthDate || user.birthDate

        const updateUser = await user.save()

        res.status(200).json({
            email: updateUser.email,
            rut: updateUser.rut,
            name: updateUser.name,
            birthDate: updateUser.birthDate
        })
    } catch (error) {
        res.status(400);
        throw new Error(`Error al actualizar el perfil: ${error.message}`)
    }
})


const updatePassword = asyncHandler(async (req, res) => {
    const { password } = req.body
    const userId = req.params.id

    try {
        if (!password) {
            return res.status(400).json({ error: 'La nueva contraseña es obligatoria' })
        }

        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        user.password = hashedPassword
        await user.save()

        return res.json({ message: 'Contraseña actualizada exitosamente' })
    } catch (error) {
        return res.status(400).json({ error: `Error al actualizar la contraseña: ${error.message}` })
    }
})

module.exports = {
    registerUser,
    loginUser,
    editProfile,
    updatePassword
}