package com.sportgear.modules.auth.service;

public interface EmailService {

    void sendPasswordResetToken(String email, String token);
}
