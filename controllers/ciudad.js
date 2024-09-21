const axios = require('axios')

const getCiudad = (req, res) => {
  const nombreCiudad = req.params.ciudad
  const pais = req.params.pais
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${nombreCiudad}&count=1&language=es&format=json`
  axios
    .get(url)
    .then((response) => {
      const { results = [] } = response.data

      const newArray = results.filter(item => item.country.toUpperCase() === pais.toString().toUpperCase())

      res.status(200).json({
        msg: 'Ok',
        data: newArray
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
  getCiudad
}
