# Security Transport (NFR-03)

## Goal

Prepare backend for HTTPS and secure data transport between frontend and backend.

## Current implementation

- SSL is configurable via environment variables in `application.yml`.
- CORS allowed origins are externalized via `CORS_ALLOWED_ORIGINS`.
- JWT bearer token is required on secured endpoints.

## HTTPS-ready configuration

Set the following environment variables when enabling SSL in local/prod:

```bash
SSL_ENABLED=true
SSL_KEY_STORE=/path/to/keystore.p12
SSL_KEY_STORE_PASSWORD=your-password
SSL_KEY_STORE_TYPE=PKCS12
```

## Local development recommendation

- Keep `SSL_ENABLED=false` for local backend unless you have local certificates.
- Use HTTPS in production behind reverse proxy/load balancer.
- Ensure proxy forwards `X-Forwarded-*` headers.

## Endpoint safety notes

- Public auth endpoints are limited to:
  - `POST /api/auth/register`
  - `POST /api/auth/login`
  - `POST /api/auth/forgot-password`
  - `POST /api/auth/reset-password`
- User profile and checkout endpoints require JWT authentication.
