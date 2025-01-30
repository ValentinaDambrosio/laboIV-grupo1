const axios = require('axios')

const getFoto = (req, res) => {
  const fotoBandera = req.params.fotoBandera
  const url = `https://flagcdn.com/w80/${fotoBandera}.png`
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
          msg: 'No se encontraró foto de la bandera para el país especificado'
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
