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
  }

  rutas () {
    this.app.use(process.env.API_URL + 'pronostico',
      require('../routes/pronostico')
    )
    this.app.use(
      process.env.API_URL + 'historial',
      require('../routes/historial')
    )
  }

  listen () {
    this.app.listen(this.port, () => {
      console.log(`La API esta escuchando en el puerto ${this.port}`)
    })
  }
}

module.exports = Server
