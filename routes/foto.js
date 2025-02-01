const { Router } = require('express')
const { getFoto } = require('../controllers/foto')

const rutas = Router()

rutas.get('/:fotoBandera', getFoto)

module.exports = rutas
