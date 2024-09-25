const { Router } = require('express')
const { getPronosticoHorario, getPronosticoHorarioHora, getPronosticoDiario } = require('../controllers/pronostico')

const rutas = Router()

rutas.get('/horario/', getPronosticoHorario)
rutas.get('/horario/:hora', getPronosticoHorarioHora)
rutas.get('/diario/', getPronosticoDiario)

module.exports = rutas
