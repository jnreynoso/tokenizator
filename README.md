# Tokenización de Tarjetas

Este proyecto se encarga de simular la tokenización de tarjetas de crédito/débito para su uso en pasarelas de pago.

## Tecnologías utilizadas

- Backend: TypeScript, Node.js
- Servicio AWS: EKS
- Base de datos no relacional: Redis, MongoDB, DynamoDB, DocumentDB
- Test: Jest, Postman

## Instrucciones de uso

1. Clona el repositorio y navega a la carpeta del proyecto.
2. Ejecuta `npm install` para instalar las dependencias.
3. Ejecuta `npm run build` para compilar TypeScript y generar el build de la aplicación.

## Endpoints

### Generar Token

- URL: http://localhost:3000/token
- Método: POST
- Headers: Authorization: Bearer Token: "Bearer pk_test_LsRBKejzCOEEWOsw"
- Body JSON:

  ```json
  {
      "email": "jreynoso.mena@gmail.com",
      "card_number": "4517750267827101",
      "cvv": "123",
      "expiration_year": "2025",
      "expiration_month": "10"
  }
  
### Información de la tarjeta

- URL: http://localhost:3000/card?token=<token>
- Método: GET
- Response:

```json
{
    "email": "jreynoso.mena@gmail.com",
    "number": "4517750267827101",
    "expirationYear": "2025",
    "expirationMonth": "10"
}
```



