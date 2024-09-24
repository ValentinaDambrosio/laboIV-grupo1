# TP Labo IV - Grupo 1

## Endpoints

Todos los endpoints deben usar el prefijo `/api/v1/`

### /pronostico/horario

Obten el prónostico en horas para los próximos días.

El resultado contiene la temperatura, sensación térmica, probabilidad de precipitaciones, de lluvias y código de clima.

| Query Param | Formato           | Obligatorio | Default | Descripcion                                  |
|-------------|-------------------|-------------|---------|----------------------------------------------|
| latitud     | número            | si          |         | Latitud de la ciudad a buscar el pronóstico  |
| longitud    | número            | si          |         | Longitud de la ciudad a buscar el pronóstico |
| timezone    | entero (-12 - 14) | no          | -3      | Zona horario de los resultados               |
| dias        | entero (0 - 16)   | no          | 7       | Cantidad de días de pronóstico               |

<details>
<summary>Ejemplo de respuesta</summary>
`/api/v1/pronostico/horario?longitud=10&latitud=80&dias=1`

```json
{
  "msg": "Ok",
  "data": {
    "latitude": 80,
    "longitude": 10,
    "generationtime_ms": 7.7279806137085,
    "utc_offset_seconds": -10800,
    "timezone": "Etc/GMT+3",
    "timezone_abbreviation": "-03",
    "elevation": 0,
    "hourly_units": {
      "time": "iso8601",
      "temperature_2m": "°C",
      "apparent_temperature": "°C",
      "precipitation_probability": "%",
      "rain": "mm",
      "weather_code": "wmo code"
    },
    "hourly": {
      "time": [
        "2024-09-23T00:00",
        "2024-09-23T01:00",
        "2024-09-23T02:00",
        "2024-09-23T03:00",
        "2024-09-23T04:00",
        "2024-09-23T05:00",
        "2024-09-23T06:00",
        "2024-09-23T07:00",
        "2024-09-23T08:00",
        "2024-09-23T09:00",
        "2024-09-23T10:00",
        "2024-09-23T11:00",
        "2024-09-23T12:00",
        "2024-09-23T13:00",
        "2024-09-23T14:00",
        "2024-09-23T15:00",
        "2024-09-23T16:00",
        "2024-09-23T17:00",
        "2024-09-23T18:00",
        "2024-09-23T19:00",
        "2024-09-23T20:00",
        "2024-09-23T21:00",
        "2024-09-23T22:00",
        "2024-09-23T23:00"
      ],
      "temperature_2m": [2.2, 2.3, 2.5, 2.7, 3.2, 2.9, 2.8, 2.8, 2.8, 3.1, 3.2, 3.2, 3.2, 3, 3, 3.1, 3, 3.1, 3, 3.1, 3.2, 3.1, 3.3, 3.3],
      "apparent_temperature": [-4.6, -4.6, -4.7, -4.7, -4.4, -4.6, -4.8, -5, -5, -4.5, -4.5, -4.6, -4.4, -4.6, -4.6, -4.5, -4.6, -4.4, -4.5, -4.3, -4.1, -4.3, -3.9, -3.4],
      "precipitation_probability": [15, 15, 13, 28, 35, 33, 35, 43, 43, 50, 40, 58, 53, 50, 50, 50, 38, 30, 33, 30, 38, 45, 48, 53],
      "rain": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.1],
      "weather_code": [2, 2, 2, 3, 3, 2, 2, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 85]
    }
  }
}
```
</details>

### /pronostico/horario/[hora]

Obten el prónostico para una hora determinada del día.

> [!IMPORTANT]
> La hora debe ser un número entero entre 0 y 23.

El resultado contiene la temperatura, sensación térmica, probabilidad de precipitaciones, de lluvias y código de clima.

| Query Param | Formato           | Obligatorio | Default | Descripcion                                  |
|-------------|-------------------|-------------|---------|----------------------------------------------|
| latitud     | número            | si          |         | Latitud de la ciudad a buscar el pronóstico  |
| longitud    | número            | si          |         | Longitud de la ciudad a buscar el pronóstico |
| timezone    | entero (-12 - 14) | no          | -3      | Zona horario de los resultados               |

<details>
<summary>Ejemplo de respuesta</summary>
`/api/v1/pronostico/horario/23?longitud=10&latitud=80`

```json
{
  "msg": "Ok",
  "data": {
    "latitude": 80,
    "longitude": 10,
    "generationtime_ms": 0.043034553527832,
    "utc_offset_seconds": -10800,
    "timezone": "Etc/GMT+3",
    "timezone_abbreviation": "-03",
    "elevation": 0,
    "hourly_units": {
      "time": "iso8601",
      "temperature_2m": "°C",
      "apparent_temperature": "°C",
      "precipitation_probability": "%",
      "rain": "mm"
    },
    "hourly": {
      "time": "2024-09-23T23:00",
      "temperature_2m": 3.3,
      "apparent_temperature": -3.4,
      "precipitation_probability": 53,
      "rain": 0.1,
      "weather_code": 85
    }
  }
}
```
</details>

### /pronostico/diario

Obten el prónostico diario para los próximos días.

El resultado contiene la temperatura máxima y mínima, sensación térmica máxima y mínima, hora de salida y puesta de sol probabilidad máxima de precipitaciones, horas de lluvia y código de clima.

| Query Param | Formato           | Obligatorio | Default | Descripcion                                  |
|-------------|-------------------|-------------|---------|----------------------------------------------|
| latitud     | número            | si          |         | Latitud de la ciudad a buscar el pronóstico  |
| longitud    | número            | si          |         | Longitud de la ciudad a buscar el pronóstico |
| timezone    | entero (-12 - 14) | no          | -3      | Zona horario de los resultados               |
| dias        | entero (0 - 16)   | no          | 7       | Cantidad de días de pronóstico               |

<details>
<summary>Ejemplo de respuesta</summary>
`/api/v1/pronostico/diario?longitud=10&latitud=80&dias=1`

```json
{
  "msg": "Ok",
  "data": {
    "latitude": 80,
    "longitude": 10,
    "generationtime_ms": 0.0979900360107422,
    "utc_offset_seconds": -10800,
    "timezone": "Etc/GMT+3",
    "timezone_abbreviation": "-03",
    "elevation": 0,
    "daily_units": {
      "time": "iso8601",
      "weather_code": "wmo code",
      "temperature_2m_max": "°C",
      "temperature_2m_min": "°C",
      "apparent_temperature_max": "°C",
      "apparent_temperature_min": "°C",
      "sunrise": "iso8601",
      "sunset": "iso8601",
      "precipitation_hours": "h",
      "precipitation_probability_max": "%"
    },
    "daily": {
      "time": [
        "2024-09-24"
      ],
      "weather_code": [80],
      "temperature_2m_max": [3.5],
      "temperature_2m_min": [-2],
      "apparent_temperature_max": [-0.2],
      "apparent_temperature_min": [-9.1],
      "sunrise": [
        "2024-09-24T02:10"
      ],
      "sunset": [
        "2024-09-24T14:13"
      ],
      "precipitation_hours": [13],
      "precipitation_probability_max": [78]
    }
  }
}
```
</details>