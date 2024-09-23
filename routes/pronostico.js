const { Router } = require('express')
const { getPronostico, getPronosticoHora } = require('../controllers/pronostico')

const rutas = Router()

rutas.get('/', getPronostico)
rutas.get('/:hora', getPronosticoHora)

module.exports = rutas
