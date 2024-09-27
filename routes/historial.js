const { Router } = require('express')
const { getHistorial, getHistorialPuntual } = require('../controllers/historial')

const rutas = Router()

rutas.get('/', getHistorial)
rutas.get('/:dia', getHistorialPuntual)
module.exports = rutas
