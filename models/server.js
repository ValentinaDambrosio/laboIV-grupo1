const express = require('express')

class Server {
  constructor () {
    this.app = express()
    this.port = process.env.PORT || 3000
    this.middleware()
    this.rutas()
  }

  middleware () {
    this.app.use(express.static('public'))
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept')
      next()
    })
  }

  rutas () {
    this.app.use(
      process.env.API_URL + 'pronostico',
      require('../routes/pronostico')
    )

    this.app.use(
      process.env.API_URL + 'historial',
      require('../routes/historial')
    )

    this.app.use(
      process.env.API_URL + 'ciudad',
      require('../routes/ciudad'))

    this.app.use(
      process.env.API_URL + 'foto',
      require('../routes/foto'))
  }

  listen () {
    this.app.listen(this.port, () => {
      console.log(`La API esta escuchando en el puerto ${this.port}`)
    })
  }
}

module.exports = Server
