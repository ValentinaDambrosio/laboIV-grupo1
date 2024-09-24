const { Router } = require('express')
const { getCiudad } = require('../controllers/ciudad')

const rutas = Router()

rutas.get('/', getCiudad)

module.exports = rutas
