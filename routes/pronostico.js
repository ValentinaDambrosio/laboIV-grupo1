const { Router } = require('express')
const { getPronostico } = require('../controllers/pronostico')

const rutas = Router()

rutas.get('/', getPronostico)

module.exports = rutas
