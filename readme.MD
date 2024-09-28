# ⛅ TP Labo IV - Grupo 1 - API del clima ⛅

## 📋 Descripción del proyecto

Esta es la primera parte de un proyecto realizado para la materia "Laboratorio IV" de la Tecnicatura Universitaria en Programación, dictada en la UTN-FRBB. Dicho proyecto consiste en la creación de una API donde cada integrante del grupo debe cubrir los siguietnes endpoints/request:
- Listado de registros en formato json que muestre 50 o más registros.
- Visualización de un registro en particular (param id).
- Agregar query params al listado del punto “1” para filtrar la información por algún campo relevante.

## 🛠 Tecnologías utilizadas

- 🟢 Node Js
- 🚂 Express Js
- 🟨 JavaScript
- ☁️ Open-Meteo API
- 📸 Unplash Image API
- 🌎 Countries & Cities API

## 🔗 Endpoints

Todos los endpoints deben usar el prefijo `/api/v1/`

> [!IMPORTANT]
> Si lanza un error "ETIMEDOUT" al querer ejecutar un endpoint, pruebe nuevamente.

### /pronostico/horario

Obten el prónostico en horas para los próximos días.

El resultado contiene la temperatura, sensación térmica, probabilidad de precipitaciones, de lluvias y código de clima.

| Query Param | Formato           | Obligatorio | Default | Descripcion                                              |
|-------------|-------------------|-------------|---------|----------------------------------------------------------|
| latitud     | número            | si          |         | Latitud de la ciudad a buscar el pronóstico              |
| longitud    | número            | si          |         | Longitud de la ciudad a buscar el pronóstico             |
| timezone    | entero (-12 - 14) | no          | -3      | Zona horario de los resultados                           |
| dias        | entero (1 - 16)   | no          | 7       | Cantidad de días de pronóstico (1 es solo el día actual) |

<details>
<summary>✅ Ejemplo de respuesta</summary>
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
<summary>✅ Ejemplo de respuesta</summary>
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

| Query Param | Formato           | Obligatorio | Default | Descripcion                                              |
|-------------|-------------------|-------------|---------|----------------------------------------------------------|
| latitud     | número            | si          |         | Latitud de la ciudad a buscar el pronóstico              |
| longitud    | número            | si          |         | Longitud de la ciudad a buscar el pronóstico             |
| timezone    | entero (-12 - 14) | no          | -3      | Zona horario de los resultados                           |
| dias        | entero (1 - 16)   | no          | 7       | Cantidad de días de pronóstico (1 es solo el día actual) |

<details>
<summary>✅ Ejemplo de respuesta</summary>
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

### /ciudad

Obtén una lista de todas las ciudades del mundo.

El resultado contiene el país, dos abreviaturas del país y una lista de ciudades de ese país.

| Query Params | Formato | Obligatorio | Descripción                                 |
|--------------|---------|-------------|---------------------------------------------|
| nombre       | String  | No          | Filtra ciudades con el nombre proporcionado |

<details>
<summary>✅ Ejemplo de respuesta</summary>
`api/v1/ciudad`

```json
{
  "msg": "ok",
  "data": {
    "error": false,
    "msg": "countries and cities retrieved",
    "data": [
      {
        "iso2": "AF",
        "iso3": "AFG",
        "country": "Afghanistan",
        "cities": [
          "Herat",
          "Kabul",
          "Kandahar",
          "Molah",
          "Rana",
          "Shar",
          "Sharif",
          "Wazir Akbar Khan"
        ]
      },
      {
        "iso2": "AL",
        "iso3": "ALB",
        "country": "Albania",
        "cities": [
          "Elbasan",
          "Petran",
          "Pogradec",
          "Shkoder",
          "Tirana",
          "Ura Vajgurore"
        ]
      },
      ...
    ]
  }
}
```

</details>

<details>
<summary>✅ Ejemplo de respuesta con Query Params</summary>
`api/v1/ciudad?nombre=Bahia%20Blanca`

```json
{
  "msg": "Ok",
  "data": [
    {
      "id": 3865086,
      "name": "Bahía Blanca",
      "latitude": -38.71959,
      "longitude": -62.27243,
      "elevation": 24,
      "feature_code": "PPLA2",
      "country_code": "AR",
      "admin1_id": 3435907,
      "admin2_id": 3865084,
      "timezone": "America/Argentina/Buenos_Aires",
      "population": 276546,
      "country_id": 3865483,
      "country": "Argentina",
      "admin1": "Buenos Aires",
      "admin2": "Partido de Bahía Blanca"
    },
    {
      "id": 3923420,
      "name": "Bahía Blanca",
      "latitude": -14.43333,
      "longitude": -62.3,
      "elevation": 195,
      "feature_code": "PPL",
      "country_code": "BO",
      "admin1_id": 3904907,
      "timezone": "America/La_Paz",
      "country_id": 3923057,
      "country": "Bolivia",
      "admin1": "Santa Cruz"
    },
    ...
  ]
}
```

</details>

### /foto/[fotoClima]

Obtén una foto del clima.

El resultado contiene la url de la foto.

| Path Params | Formato | Obligatorio | Descripción      |
|-------------|---------|-------------|------------------|
| fotoClima   | String  | Si          | Término a buscar |

<details>
<summary>✅ Ejemplo de respuesta</summary>
`api/v1/foto/windy`

```json
{
  "msg": "Ok",
  "data": "https://images.unsplash.com/photo-1470176519524-3c2f481c8c9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NTc4ODl8MHwxfHNlYXJjaHwxfHx3aW5keXxlbnwxfHx8fDE3MjcyOTg5OTl8MA&ixlib=rb-4.0.3&q=80&w=200"
}
```

</details>

### /historial

Obtén el historial del clima de días pasados.

> [!IMPORTANT]
> Si no se aclara algún query de la fecha de inicio del periodo que desea buscar, se tomará por default el valor correspondiente a 50 días anteriores a la fecha actual.

El resultado contiene la temperatura, sensación térmica, probabilidad de precipitaciones, de lluvias y código de clima.

| Query Param | Formato           | Obligatorio | Default | Descripcion                                              |
|-------------|-------------------|-------------|---------|----------------------------------------------------------|
| latitud     | número            | si          |         | Latitud de la ciudad a buscar el historial              |
| longitud    | número            | si          |         | Longitud de la ciudad a buscar el historial             |
| timezone    | entero (-12 - 14) | no          | -3      | Zona horaria de los resultados                           |
| diaInicio        | entero (1 - 31)   | no          | ver important       | Día de inicio del periodo que desea buscar|
| mesInicio        | entero (1 - 12)   | no          | ver important       | Mes de inicio del periodo que desea buscar|
| anioInicio        | entero (1940 - año actual)   | no          | ver important       | Año de inicio del periodo que desea buscar|
| diaFin        | entero (1 - 31)   | no          | día actual       | Día de fin del periodo que desea buscar|
| mesFin        | entero (1 - 12)   | no          | mes actual       | Mes de fin del periodo que desea buscar|
| anioFin        | entero (1940 - año actual)   | no          | año actual       | Año de fin del periodo que desea buscar|

<details>
<summary>✅ Ejemplo de respuesta</summary>
`api/v1/historial/?longitud=12&latitud=12&diaInicio=25&mesInicio=9&diaFin27&mesFin=9`

```json
{
    "msg": "Ok",
    "data": {
        "latitude": 11.98594,
        "longitude": 12.037702,
        "generationtime_ms": 0.38301944732666016,
        "utc_offset_seconds": -10800,
        "timezone": "Etc/GMT+3",
        "timezone_abbreviation": "-03",
        "elevation": 369,
        "hourly_units": {
            "time": "iso8601",
            "temperature_2m": "°C",
            "apparent_temperature": "°C",
            "precipitation_probability": "undefined",
            "rain": "mm",
            "weather_code": "wmo code"
        },
        "hourly": {
            "time": [
                "2024-09-25T00:00",
                "2024-09-25T01:00",
                "2024-09-25T02:00",
                "2024-09-25T03:00",
                "2024-09-25T04:00",
                "2024-09-25T05:00",
                "2024-09-25T06:00",
                "2024-09-25T07:00",
                "2024-09-25T08:00",
                "2024-09-25T09:00",
                "2024-09-25T10:00",
                "2024-09-25T11:00",
                "2024-09-25T12:00",
                "2024-09-25T13:00",
                "2024-09-25T14:00",
                "2024-09-25T15:00",
                "2024-09-25T16:00",
                "2024-09-25T17:00",
                "2024-09-25T18:00",
                "2024-09-25T19:00",
                "2024-09-25T20:00",
                "2024-09-25T21:00",
                "2024-09-25T22:00",
                "2024-09-25T23:00",
                ...
            ],
            "temperature_2m": [
                22.5,
                22.2,
                21.8,
                23.4,
                25.9,
                28,
                29.5,
                30.7,
                31.3,
                31.3,
                32.2,
                32.1,
                31.8,
                30.6,
                28.3,
                26.6,
                25.8,
                26.4,
                26.8,
                24.9,
                24.1,
                23.9,
                ...
            ],
            "apparent_temperature": [
                26.1,
                25.8,
                25.4,
                27.1,
                30.3,
                31.8,
                33.4,
                35.5,
                36,
                35.2,
                36.7,
                35.7,
                34.4,
                34.3,
                31.5,
                29.9,
                29.5,
                30.1,
                30.6,
                28.7,
                27.8,
                27.4,
                ...
            ],
            "precipitation_probability": [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                ...
            ],
            "rain": [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                ...
            ],
            "weather_code": [
                0,
                0,
                0,
                0,
                0,
                1,
                1,
                3,
                3,
                2,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                0,
                0,
                0,
                ...
            ]
        }
    }
}
```

</details>

### /historial/[dia]

Obtén el historial del clima de un día en específico.

> [!IMPORTANT]
> El día debe ser un número entero entre 1 y 31.

El resultado contiene la temperatura, sensación térmica, probabilidad de precipitaciones, de lluvias y código de clima.

| Query Param | Formato           | Obligatorio | Default | Descripcion                                              |
|-------------|-------------------|-------------|---------|----------------------------------------------------------|
| latitud     | número            | si          |         | Latitud de la ciudad a buscar el historial              |
| longitud    | número            | si          |         | Longitud de la ciudad a buscar el historial             |
| timezone    | entero (-12 - 14) | no          | -3      | Zona horaria de los resultados                           |
| mes       | entero (1 - 12)   | no          | mes actual       | Mes de la fecha que desea buscar|
| anio       | entero (1940 - año actual)   | no          | año actual       | Año de la fecha que desea buscar|

<details>
<summary>✅ Ejemplo de respuesta</summary>
`api/v1/historial/2?longitud=12&latitud=12`

```json
{
    "msg": "Ok",
    "data": {
        "latitude": 11.98594,
        "longitude": 12.037702,
        "generationtime_ms": 0.14197826385498047,
        "utc_offset_seconds": -10800,
        "timezone": "Etc/GMT+3",
        "timezone_abbreviation": "-03",
        "elevation": 369,
        "hourly_units": {
            "time": "iso8601",
            "temperature_2m": "°C",
            "apparent_temperature": "°C",
            "precipitation_probability": "undefined",
            "rain": "mm",
            "weather_code": "wmo code"
        },
        "hourly": {
            "time": [
                "2024-09-02T00:00",
                "2024-09-02T01:00",
                "2024-09-02T02:00",
                "2024-09-02T03:00",
                "2024-09-02T04:00",
                "2024-09-02T05:00",
                "2024-09-02T06:00",
                "2024-09-02T07:00",
                "2024-09-02T08:00",
                "2024-09-02T09:00",
                "2024-09-02T10:00",
                "2024-09-02T11:00",
                "2024-09-02T12:00",
                "2024-09-02T13:00",
                "2024-09-02T14:00",
                "2024-09-02T15:00",
                "2024-09-02T16:00",
                "2024-09-02T17:00",
                "2024-09-02T18:00",
                "2024-09-02T19:00",
                "2024-09-02T20:00",
                "2024-09-02T21:00",
                "2024-09-02T22:00",
                "2024-09-02T23:00"
            ],
            "temperature_2m": [
                24.4,
                24.1,
                23.8,
                24.3,
                25.3,
                26.2,
                27.5,
                28,
                28.6,
                28.9,
                29.4,
                29.4,
                28.5,
                28.1,
                26.9,
                25.7,
                25.2,
                25.1,
                24.6,
                24.3,
                23.9,
                23.4,
                23.1,
                22.8
            ],
            "apparent_temperature": [
                27.3,
                26.9,
                26.2,
                26.8,
                28.2,
                29.1,
                30.6,
                31,
                31.8,
                32.1,
                31.8,
                31.2,
                31.2,
                31.7,
                31.1,
                30.2,
                30.2,
                30.9,
                29.9,
                28.7,
                27.9,
                27.9,
                27.4,
                26.7
            ],
            "precipitation_probability": [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ],
            "rain": [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0.1,
                0.1,
                0.1,
                0,
                0,
                0.1,
                0,
                0,
                0.2,
                0.5,
                0.6,
                0.7,
                0.8,
                0.5,
                1,
                0.8,
                2.2
            ],
            "weather_code": [
                0,
                1,
                1,
                2,
                3,
                1,
                1,
                51,
                51,
                51,
                1,
                1,
                51,
                1,
                1,
                51,
                53,
                53,
                53,
                53,
                53,
                55,
                53,
                61
            ]
        }
    }
}
```

</details>

## 👥 Autores

- Abraham Mateo
- Dambrosio Valentina
- Fell Sebastián