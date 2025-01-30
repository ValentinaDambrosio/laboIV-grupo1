const axios = require('axios')

const getFoto = async (req, res) => {
  const fotoBandera = req.params.fotoBandera
  const url = `https://flagcdn.com/w80/${fotoBandera}.png`

  try {
    const response = await axios.get(url, {
      responseType: 'arraybuffer'
    })

    res.setHeader('Content-Type', 'image/png')
    res.send(response.data)
  } catch (error) {
    console.error('Error al obtener la imagen:', error.message)
    res.status(404).send('No se encontró la imagen de la bandera.')
  }
}

module.exports = {
  getFoto
}
