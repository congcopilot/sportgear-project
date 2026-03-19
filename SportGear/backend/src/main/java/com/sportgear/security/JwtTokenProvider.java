package com.sportgear.security;

import com.sportgear.config.SecurityProperties;
import com.sportgear.modules.user.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Map;
import javax.crypto.SecretKey;
import org.springframework.stereotype.Component;

@Component
public class JwtTokenProvider {

    private final SecurityProperties securityProperties;
    private final SecretKey secretKey;

    public JwtTokenProvider(SecurityProperties securityProperties) {
        this.securityProperties = securityProperties;
        this.secretKey = buildSecretKey(securityProperties.getJwt().getSecret());
    }

    public String generateAccessToken(User user) {
        Instant now = Instant.now();
        Instant expiry = now.plus(securityProperties.getJwt().getAccessTokenExpiryMinutes(), ChronoUnit.MINUTES);

        return Jwts.builder()
            .issuer(securityProperties.getJwt().getIssuer())
            .subject(user.getEmail())
            .claims(Map.of(
                "role", user.getRole().name(),
                "accountLocked", user.isAccountLocked()
            ))
            .issuedAt(Date.from(now))
            .expiration(Date.from(expiry))
            .signWith(secretKey)
            .compact();
    }

    public String extractEmail(String token) {
        return extractClaims(token).getSubject();
    }

    public boolean isTokenValid(String token) {
        try {
            Claims claims = extractClaims(token);
            return claims.getExpiration().after(new Date());
        } catch (Exception ex) {
            return false;
        }
    }

    private Claims extractClaims(String token) {
        return Jwts.parser()
            .verifyWith(secretKey)
            .build()
            .parseSignedClaims(token)
            .getPayload();
    }

    private SecretKey buildSecretKey(String secret) {
        byte[] bytes;
        try {
            bytes = Decoders.BASE64.decode(secret);
        } catch (Exception ignored) {
            bytes = secret.getBytes(StandardCharsets.UTF_8);
        }

        if (bytes.length < 32) {
            byte[] padded = new byte[32];
            for (int i = 0; i < padded.length; i++) {
                padded[i] = bytes[i % bytes.length];
            }
            bytes = padded;
        }

        Key key = Keys.hmacShaKeyFor(bytes);
        return (SecretKey) key;
    }
}
