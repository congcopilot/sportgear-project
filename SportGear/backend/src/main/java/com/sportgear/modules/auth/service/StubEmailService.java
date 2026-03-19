package com.sportgear.modules.auth.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class StubEmailService implements EmailService {

    private static final Logger LOGGER = LoggerFactory.getLogger(StubEmailService.class);

    @Override
    public void sendPasswordResetToken(String email, String token) {
        LOGGER.info("[STUB EMAIL] password reset token for {} -> {}", email, token);
    }
}
