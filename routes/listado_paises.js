const { Router } = require('express')
const { getListadoPaises } = require('../controllers/listado_paises')

const rutas = Router()

rutas.get('/', getListadoPaises)

module.exports = rutas
