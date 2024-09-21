const axios = require('axios')

const getFoto = (req, res) => {
  const apiKEY = 'OzJDnTlHXbFakYV5Dy590mg6YKlmltIFlZTh_9UGkbg'
  const fotoClima = req.params.fotoClima
  const url = `https://api.unsplash.com/search/photos?query=${fotoClima}&client_id=${apiKEY}&content_filter=high`
  axios
    .get(url)
    .then((response) => {
      const { results = [] } = response.data

      if (results.length > 0) {
        const fotoData = results[0].urls.thumb

        res.status(200).json({
          msg: 'Ok',
          data: fotoData
        })
      } else {
        res.status(404).json({
          msg: 'No se encontraron fotos para la ciudad especificada'
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
  getFoto
}
