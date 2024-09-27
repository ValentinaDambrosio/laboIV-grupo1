const axios = require('axios')
const { convertirNumeroZonaHoraria, estaEntreEnteros } = require('./pronostico')

const convertirFechaAString = (day, month, year) => {
  const date = `${year}-${month}-${day}`
  return date
}

const formatValue = (number) => {
  return number.toString().padStart(2, '0')
}

const validateDate = (day, month, year) => {
  day = Number(day)
  month = Number(month)
  year = Number(year)

  const month31 = [1, 3, 5, 7, 8, 10, 12]
  const month30 = [4, 6, 9, 11]

  if (month31.includes(month)) {
    return day <= 31
  }

  if (month30.includes(month)) {
    return day <= 30
  }

  if (month === 2) {
    const esBisiesto = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)
    return esBisiesto ? day <= 29 : day <= 28
  }

  return false
}

const fecha1MenorFecha2 = (fecha1, fecha2) => {
  return new Date(fecha1) < new Date(fecha2)
}

const getHistorial = (req, res) => {
  const today = new Date()
  const fiftyDaysBefore = new Date(today.getTime() - 50 * 24 * 60 * 60 * 1000)
  const latitude = req.query.latitud
  const longitude = req.query.longitud
  let timezone = req.query.timezone ?? -3
  let startDay = req.query.diaInicio ?? (fiftyDaysBefore.getDate().toString())
  startDay = formatValue(startDay)
  let startMonth = req.query.mesInicio ?? ((fiftyDaysBefore.getMonth() + 1).toString())
  startMonth = formatValue(startMonth)
  const startYear = req.query.anioInicio ?? (fiftyDaysBefore.getFullYear().toString())
  const startDate = convertirFechaAString(startDay, startMonth, startYear)
  let endDay = req.query.diaFin ?? (today.getDate().toString())
  endDay = formatValue(endDay)
  let endMonth = req.query.mesFin ?? ((today.getMonth() + 1).toString())
  endMonth = formatValue(endMonth)
  const endYear = req.query.anioFin ?? (today.getFullYear().toString())
  const endDate = convertirFechaAString(endDay, endMonth, endYear)

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
      error: 'La zona horario (timezone) debe ser un número entero entre -12 y 14 (inclusive)'
    })
    return
  }
  if (!estaEntreEnteros(startDay, 1, 31) && !estaEntreEnteros(endDay, 1, 31)) {
    res.status(400).json({
      msg: 'Error',
      error: 'El día debe ser un número entre 1 y 31 (inclusive)'
    })
    return
  }
  if (!estaEntreEnteros(startMonth, 1, 12) && !estaEntreEnteros(endMonth, 1, 12)) {
    res.status(400).json({
      msg: 'Error',
      error: 'El mes debe ser un número entre 1 y 12 (inclusive)'
    })
    return
  }
  if (startYear < 2010 || endYear < 2010) {
    res.status(400).json({
      msg: 'Error',
      error: 'Solo se puede buscar datos hasta el año 2010 (inclusive)'
    })
    return
  }
  if (!validateDate(startDay, startMonth, startYear)) {
    res.status(400).json({
      msg: 'Error',
      error: 'La fecha de inicio es inválida'
    })
    return
  }
  if (!validateDate(endDay, endMonth, endYear)) {
    res.status(400).json({
      msg: 'Error',
      error: 'La fecha de fin es inválida'
    })
    return
  }
  if (!fecha1MenorFecha2(startDate, endDate)) {
    res.status(400).json({
      msg: 'Error',
      error: 'La fecha de inicio debe ser menor a la fecha de fin'
    })
    return
  }

  timezone = convertirNumeroZonaHoraria(timezone)

  const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${startDate}&end_date=${endDate}&hourly=temperature_2m,apparent_temperature,precipitation_probability,rain,weather_code&timezone=${timezone}`

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
  let day = req.params.dia
  day = formatValue(day)
  const latitude = req.query.latitud
  const longitude = req.query.longitud
  let month = req.query.mes ?? ((today.getMonth() + 1).toString())
  month = formatValue(month)
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
  if (!estaEntreEnteros(day, 1, 31)) {
    res.status(400).json({
      msg: 'Error',
      error: 'El día debe ser un número entre 1 y 31 (inclusive)'
    })
    return
  }
  if (!estaEntreEnteros(month, 1, 12)) {
    res.status(400).json({
      msg: 'Error',
      error: 'El mes debe ser un número entre 1 y 12 (inclusive)'
    })
    return
  }
  if (year < 1940) {
    res.status(400).json({
      msg: 'Error',
      error: 'Solo se puede buscar datos hasta el año 1940 (inclusive)'
    })
    return
  }
  if (!validateDate(day, month, year)) {
    res.status(400).json({
      msg: 'Error',
      error: 'La fecha es inválida'
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
