const { Router } = require('express')
const { getFoto } = require('../controllers/foto')

const rutas = Router()

rutas.get('/:fotoClima', getFoto)

module.exports = rutas
