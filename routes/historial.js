const { Router } = require('express')
const { getHistorial } = require('../controllers/historial')

const rutas = Router()

rutas.get('/', getHistorial)

module.exports = rutas
