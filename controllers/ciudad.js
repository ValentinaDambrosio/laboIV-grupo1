const axios = require('axios')

const getCiudad = (req, res) => {
  const { nombre } = req.query
  const url = (nombre === undefined)
    ? 'https://countriesnow.space/api/v0.1/countries'
    : `https://geocoding-api.open-meteo.com/v1/search?name=${nombre}&count=100&language=es&format=json`
  axios
    .get(url)
    .then((response) => {
      if (nombre === undefined) {
        const { data = [] } = response

        res.status(200).json({
          msg: 'ok',
          data
        })
      } else {
        const { results = [] } = response.data

        if (results.length > 0) {
          res.status(200).json({
            msg: 'Ok',
            data: results
          })
        } else {
          res.status(404).json({
            msg: 'No se encontró la ciudad especificada'
          })
        }
      }
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
  getCiudad
}
