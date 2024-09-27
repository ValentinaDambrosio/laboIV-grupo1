const convertirNumeroZonaHoraria = (timezone) => {
  const signo = timezone > 0 ? '-' : '+'
  return encodeURIComponent(`Etc/GMT${signo}${Math.abs(timezone)}`)
}

const estaEntreEnteros = (value, min, max) => {
  return Number.isInteger(+value) && value <= max && value >= min
}

module.exports = {
  convertirNumeroZonaHoraria,
  estaEntreEnteros
}
