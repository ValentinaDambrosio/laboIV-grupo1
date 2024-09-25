const axios = require('axios')

const getCiudad = (req, res) => {
  const { name } = req.query
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=100&language=es&format=json`
  axios
    .get(url)
    .then((response) => {
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
