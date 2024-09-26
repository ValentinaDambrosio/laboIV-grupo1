const axios = require('axios')
const { convertirNumeroZonaHoraria } = require('./pronostico')

const getHistorial = (req, res) => {
  const latitude = req.query.latitud
  const longitude = req.query.longitud
  let timezone = req.query.timezone ?? -3
  const days = req.query.dia ?? 50
  const today = new Date()
  const endDay = today.toISOString().split('T')[0]
  today.setDate(today.getDate() - days)
  const startDay = today.toISOString().split('T')[0]

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
/* corroborar que no sea fecha futura */
const getHistorialPuntual = (req, res) => {
  const today = new Date()
  const day = req.params.dia.padStart(2, '0')
  const latitude = req.query.latitud
  const longitude = req.query.longitud
  const month = req.query.mes ?? (today.getMonth() + 1).toString()
  setMonth(month)
  const year = req.query.anio ?? (today.getFullYear().toString())
  let timezone = req.query.timezone ?? -3
  const standardDate = `${year}-${month}-${day}`

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

const setMonth = (month) => {
  month.padStart(2, '0')
  return month
}

module.exports = {
  getHistorial,
  getHistorialPuntual
}
