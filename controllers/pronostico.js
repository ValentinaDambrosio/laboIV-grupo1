const axios = require('axios')

const getPronostico = (req, res) => {
  const latitude = req.query.latitud
  const longitude = req.query.longitud
  if (latitude == null) {
    res.status(400).json({
      msg: 'Error',
      error: 'Es necesario ingresar la latitud'
    })
  }
  if (longitude == null) {
    res.status(400).json({
      msg: 'Error',
      error: 'Es necesario ingresar la longitud'
    })
  }
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,apparent_temperature,precipitation_probability,rain&timezone=America%2FSao_Paulo&forecast_days=16`
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

module.exports = {
  getPronostico
}
