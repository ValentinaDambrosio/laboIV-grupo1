const { Router } = require('express')
const { getCiudad } = require('../controllers/ciudad')

const rutas = Router()

rutas.get('/:ciudad/:pais', getCiudad)

module.exports = rutas
