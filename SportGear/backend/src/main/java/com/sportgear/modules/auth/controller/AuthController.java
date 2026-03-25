package com.sportgear.modules.auth.controller;

import com.sportgear.common.dto.ApiMessageResponse;
import com.sportgear.modules.auth.dto.AuthResponse;
import com.sportgear.modules.auth.dto.ForgotPasswordRequest;
import com.sportgear.modules.auth.dto.LoginRequest;
import com.sportgear.modules.auth.dto.RegisterRequest;
import com.sportgear.modules.auth.dto.ResetPasswordRequest;
import com.sportgear.modules.auth.service.AuthService;
import com.sportgear.modules.auth.service.PasswordResetService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final PasswordResetService passwordResetService;

    public AuthController(AuthService authService, PasswordResetService passwordResetService) {
        this.authService = authService;
        this.passwordResetService = passwordResetService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ApiMessageResponse> forgotPassword(
        @Valid @RequestBody ForgotPasswordRequest request
    ) {
        return ResponseEntity.ok(passwordResetService.requestReset(request));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ApiMessageResponse> resetPassword(
        @Valid @RequestBody ResetPasswordRequest request
    ) {
        return ResponseEntity.ok(passwordResetService.resetPassword(request)); // Returns success message if reset is successful
    }
}
