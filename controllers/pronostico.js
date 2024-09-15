const axios = require('axios')

const getPronostico = (req, res) => {
  const bbLatitude = '-38.7176'
  const bbLongitude = '-62.26545'
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${bbLatitude}&longitude=${bbLongitude}&hourly=temperature_2m,apparent_temperature,precipitation_probability,rain&timezone=America%2FSao_Paulo`
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
  getPronostico
}
