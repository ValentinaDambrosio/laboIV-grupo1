const axios = require('axios')

const convertirNumeroZonaHoraria = (timezone) => {
  const signo = timezone > 0 ? '-' : '+'
  return encodeURIComponent(`Etc/GMT${signo}${Math.abs(timezone)}`)
}

const getPronostico = (req, res) => {
  const latitude = req.query.latitud
  const longitude = req.query.longitud
  let timezone = req.query.timezone ?? -3
  timezone = convertirNumeroZonaHoraria(timezone)
  const days = req.query.dias ?? 7
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

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,apparent_temperature,precipitation_probability,rain,weather_code&timezone=${timezone}&forecast_days=${days}`

  axios
    .get(url)
    .then((response) => {
      const { data = [] } = response

      if (data.length === 0) {
        res.status(404).json({
          msg: 'Error',
          error: 'No hay datos disponibles'
        })
      }

      res.status(200).json({
        msg: 'Ok',
        data
      })
    })
    .catch((error) => {
      console.log(error)

      res.status(500).json({
        msg: 'Error',
        error
      })
    })
}

const getPronosticoHora = (req, res) => {
  const latitude = req.query.latitud
  const longitude = req.query.longitud
  let timezone = req.query.timezone ?? -3
  timezone = convertirNumeroZonaHoraria(timezone)
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

  const hora = req.params.hora
  if (!Number.isInteger(+hora) || hora > 23 || hora < 0) {
    res.status(400).json({
      msg: 'Error',
      error: 'La hora debe ser un número entero entre 0 y 23 inclusive'
    })
    return
  }

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,apparent_temperature,precipitation_probability,rain,weather_code&timezone=${timezone}&forecast_days=1`

  axios
    .get(url)
    .then((response) => {
      const { data = [] } = response

      if (data.length === 0) {
        res.status(404).json({
          msg: 'Error',
          error: 'No hay datos disponibles'
        })
        return
      }

      const horaPadded = hora.padStart(2, '0')
      const index = data.hourly.time.findIndex(time => time.includes('T' + horaPadded))
      if (index === -1) {
        res.status(400).json({
          msg: 'Error',
          error: 'La hora debe ser un número entero entre 0 y 23 inclusive'
        })
        return
      }
      for (const dato in data.hourly) {
        data.hourly[dato] = data.hourly[dato][index]
      }

      res.status(200).json({
        msg: 'Ok',
        data
      })
    })
    .catch((error) => {
      console.log(error)

      res.status(500).json({
        msg: 'Error',
        error
      })
    })
}

module.exports = {
  getPronostico,
  getPronosticoHora
}
