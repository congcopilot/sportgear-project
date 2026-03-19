package com.sportgear.modules.auth.service;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.sportgear.common.exception.ApiException;
import com.sportgear.config.SecurityProperties;
import com.sportgear.modules.auth.dto.ForgotPasswordRequest;
import com.sportgear.modules.auth.dto.ResetPasswordRequest;
import com.sportgear.modules.auth.entity.PasswordResetToken;
import com.sportgear.modules.auth.repository.PasswordResetTokenRepository;
import com.sportgear.modules.auth.validator.AuthValidator;
import com.sportgear.modules.user.entity.User;
import com.sportgear.modules.user.repository.UserRepository;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

@ExtendWith(MockitoExtension.class)
class PasswordResetServiceTest {

    @Mock
    private UserRepository userRepository;
    @Mock
    private PasswordResetTokenRepository tokenRepository;
    @Mock
    private AuthValidator authValidator;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private EmailService emailService;

    private PasswordResetService passwordResetService;

    @BeforeEach
    void setUp() {
        SecurityProperties properties = new SecurityProperties();
        properties.getJwt().setResetTokenExpiryMinutes(15);

        passwordResetService = new PasswordResetService(
            userRepository,
            tokenRepository,
            authValidator,
            passwordEncoder,
            properties,
            emailService
        );
    }

    @Test
    void requestResetShouldGenerateTokenForExistingUser() {
        ForgotPasswordRequest request = new ForgotPasswordRequest();
        request.setEmail("user@sportgear.vn");

        User user = new User();
        user.setId(1L);
        user.setEmail("user@sportgear.vn");

        when(userRepository.findByEmail("user@sportgear.vn")).thenReturn(Optional.of(user));

        passwordResetService.requestReset(request);

        verify(tokenRepository).save(any(PasswordResetToken.class));
        verify(emailService).sendPasswordResetToken(any(String.class), any(String.class));
    }

    @Test
    void resetPasswordShouldRejectInvalidToken() {
        ResetPasswordRequest request = new ResetPasswordRequest();
        request.setToken("invalid");
        request.setNewPassword("StrongPass1");
        request.setConfirmPassword("StrongPass1");

        when(tokenRepository.findByToken("invalid")).thenReturn(Optional.empty());

        assertThrows(ApiException.class, () -> passwordResetService.resetPassword(request));
    }
}
