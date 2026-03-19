package com.sportgear.security;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.sportgear.config.SecurityProperties;
import com.sportgear.modules.user.entity.User;
import com.sportgear.modules.user.entity.UserRole;
import org.junit.jupiter.api.Test;

class JwtTokenProviderTest {

    @Test
    void shouldGenerateAndValidateToken() {
        SecurityProperties properties = new SecurityProperties();
        properties.getJwt().setIssuer("sportgear-test");
        properties.getJwt().setSecret("change-me-to-a-very-long-secret-at-least-32-bytes");
        properties.getJwt().setAccessTokenExpiryMinutes(30);

        JwtTokenProvider tokenProvider = new JwtTokenProvider(properties);

        User user = new User();
        user.setEmail("user@sportgear.vn");
        user.setRole(UserRole.ROLE_USER);

        String token = tokenProvider.generateAccessToken(user);

        assertTrue(tokenProvider.isTokenValid(token));
        assertEquals("user@sportgear.vn", tokenProvider.extractEmail(token));
    }
}
