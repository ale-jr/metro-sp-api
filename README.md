# Status Metro (API)

Just a simple API to get the last status from all subway lines (Metrô, CPTM, Via Quatro, and Via Mobilidade) in São Paulo

## Usage

`GET https://metro-sp-api.herokuapp.com/subway-lines/status`

### Response example:

```json
[
    {
        "updatedAt": "2020-11-19T23:02:00.000Z",
        "description": null //This field is only defined when there is a failure,
        "status": "normal",
        "statusDescription": "Operação Normal",
        "line": {
            "number": "1",
            "name": "Linha 1 - Azul",
            "color": "blue",
            "company": "Metro"
        }
    },
    ...
]
```

### Available Statuses

- normal: All fine (Operação Normal)
- reduced_speed: Trains are going slow on this line (Velocidade reduzida)
- closed: Line is closed (out of operation hours) (Operação encerrada)
- paralyzed: All trains are stopped on this line (Operação paralizada)
