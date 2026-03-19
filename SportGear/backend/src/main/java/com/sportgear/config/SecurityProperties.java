package com.sportgear.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app")
public class SecurityProperties {

    private final Jwt jwt = new Jwt();
    private final Cors cors = new Cors();

    public Jwt getJwt() {
        return jwt;
    }

    public Cors getCors() {
        return cors;
    }

    public static class Jwt {
        private String issuer;
        private String secret;
        private long accessTokenExpiryMinutes;
        private long resetTokenExpiryMinutes;

        public String getIssuer() {
            return issuer;
        }

        public void setIssuer(String issuer) {
            this.issuer = issuer;
        }

        public String getSecret() {
            return secret;
        }

        public void setSecret(String secret) {
            this.secret = secret;
        }

        public long getAccessTokenExpiryMinutes() {
            return accessTokenExpiryMinutes;
        }

        public void setAccessTokenExpiryMinutes(long accessTokenExpiryMinutes) {
            this.accessTokenExpiryMinutes = accessTokenExpiryMinutes;
        }

        public long getResetTokenExpiryMinutes() {
            return resetTokenExpiryMinutes;
        }

        public void setResetTokenExpiryMinutes(long resetTokenExpiryMinutes) {
            this.resetTokenExpiryMinutes = resetTokenExpiryMinutes;
        }
    }

    public static class Cors {
        private String allowedOrigins;

        public String getAllowedOrigins() {
            return allowedOrigins;
        }

        public void setAllowedOrigins(String allowedOrigins) {
            this.allowedOrigins = allowedOrigins;
        }
    }
}
