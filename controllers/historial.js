const axios = require('axios')
const { convertirNumeroZonaHoraria, estaEntreEnteros } = require('./pronostico')

const getHistorial = (req, res) => {
  const latitude = req.query.latitud
  const longitude = req.query.longitud
  let timezone = req.query.timezone ?? -3
  const PastDays = req.query.dia ?? 50
  const today = new Date()
  const endDay = today.toISOString().split('T')[0]
  today.setDate(today.getDate() - PastDays)
  const startDay = today.toISOString().split('T')[0]

  if (latitude == null) {
    res.status(400).json({
      msg: 'Error',
      error: 'Es necesario ingresar la latitud'
    })
    return
  }
  if (longitude == null) {
    res.status(400).json({
      msg: 'Error',
      error: 'Es necesario ingresar la longitud'
    })
    return
  }
  if (!estaEntreEnteros(timezone, -12, 14)) {
    res.status(400).json({
      msg: 'Error',
      error: 'La zona horario (timezone) debe ser un número entero entre -12 y 14 inclusive'
    })
    return
  }
  if (!estaEntreEnteros(PastDays, 1, 1000)) {
    res.status(400).json({
      msg: 'Error',
      error: 'Solo se pueden recuperar el historial de 1000 días anteriores a la fecha actual'
    })
    return
  }

  timezone = convertirNumeroZonaHoraria(timezone)

  const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${startDay}&end_date=${endDay}&hourly=temperature_2m,apparent_temperature,precipitation_probability,rain,weather_code&timezone=${timezone}`

  axios
    .get(url)
    .then((response) => {
      const { data = [] } = response

      res.status(200).json({
        msg: 'Ok',
        data
      })
    })
    .catch((error) => {
      console.log(error)

      res.status(400).json({
        msg: 'Error',
        error
      })
    })
}

const getHistorialPuntual = (req, res) => {
  const today = new Date()
  const day = req.params.dia.padStart(2, '0')
  const latitude = req.query.latitud
  const longitude = req.query.longitud
  let month = req.query.mes ?? ((today.getMonth() + 1).toString())
  month = month.padStart(2, '0')
  const year = req.query.anio ?? (today.getFullYear().toString())
  let timezone = req.query.timezone ?? -3
  const standardDate = `${year}-${month}-${day}`

  if (latitude == null) {
    res.status(400).json({
      msg: 'Error',
      error: 'Es necesario ingresar la latitud'
    })
    return
  }
  if (longitude == null) {
    res.status(400).json({
      msg: 'Error',
      error: 'Es necesario ingresar la longitud'
    })
    return
  }
  if (!estaEntreEnteros(timezone, -12, 14)) {
    res.status(400).json({
      msg: 'Error',
      error: 'La zona horario (timezone) debe ser un número entero entre -12 y 14 inclusive'
    })
    return
  }
  if (!estaEntreEnteros(day, 1, 1000)) {
    res.status(400).json({
      msg: 'Error',
      error: 'Solo se pueden recuperar el historial de 1000 días anteriores a la fecha actual'
    })
    return
  }
  if (!estaEntreEnteros(month, 1, 12)) {
    res.status(400).json({
      msg: 'Error',
      error: 'Ingrese un mes válido'
    })
    return
  }
  if (!estaEntreEnteros(year, 1940, today.getFullYear().toString())) {
    res.status(400).json({
      msg: 'Error',
      error: 'Ingrese un año válido (mínimo 1940, máximo el año actual)'
    })
    return
  }

  timezone = convertirNumeroZonaHoraria(timezone)

  const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${standardDate}&end_date=${standardDate}&hourly=temperature_2m,apparent_temperature,precipitation_probability,rain,weather_code&timezone=${timezone}`

  axios
    .get(url)
    .then((response) => {
      const { data = [] } = response

      res.status(200).json({
        msg: 'Ok',
        data
      })
    })
    .catch((error) => {
      console.log(error)

      res.status(400).json({
        msg: 'Error',
        error
      })
    })
}

module.exports = {
  getHistorial,
  getHistorialPuntual
}
