const axios = require('axios')

const getListadoPaises = (req, res) => {
  const url = 'https://countriesnow.space/api/v0.1/countries'
  axios
    .get(url)
    .then((response) => {
      const { data = [] } = response

      res.status(200).json({
        msg: 'ok',
        data
      })
    })
    .catch((error) => {
      console.log(error)

        .res.status(400).json({
          msg: 'Error',
          error
        })
    })
}

module.exports = {
  getListadoPaises
}
