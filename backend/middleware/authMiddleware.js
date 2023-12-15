const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const Admin = require('../models/adminModel')

/**
 * La función `protect` es una función de middleware que se utiliza para proteger rutas en una aplicación
 * Express. Verifica la presencia de un JWT (Token Web JSON) en las cabeceras de la solicitud y verifica su
 * autenticidad utilizando la biblioteca `jsonwebtoken`.
 */
const protect = asyncHandler(async (req, res, next) => {
    let token 

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.admin = await Admin.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('No autorizado')
        }
    }

    if(!token){
        res.status(401)
            throw new Error('No autorizado, token no encontrado')
    }
})

module.exports = { protect }