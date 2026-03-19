# Backend

Spring Boot API for SportGear auth/profile/security baseline.

## Requirements

- Java 17+
- Maven 3.9+

## Run

```bash
mvn spring-boot:run
```

App default: `http://localhost:8080`

H2 console: `http://localhost:8080/h2-console`

## Test

```bash
mvn test
```

## Main env variables

- `JWT_SECRET`
- `JWT_ISSUER`
- `JWT_ACCESS_TOKEN_EXPIRY_MINUTES`
- `RESET_TOKEN_EXPIRY_MINUTES`
- `SSL_ENABLED`
- `SSL_KEY_STORE`
- `SSL_KEY_STORE_PASSWORD`
- `CORS_ALLOWED_ORIGINS`
