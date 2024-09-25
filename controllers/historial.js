const axios = require('axios')

const getHistorial = (req, res) => {
  const bbLatitude = '-38.7176'
  const bbLongitude = '-62.26545'
  const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${bbLatitude}&longitude=${bbLongitude}&start_date=2024-09-04&end_date=2024-09-18&hourly=temperature_2m,relative_humidity_2m,precipitation`
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
  getHistorial
}
