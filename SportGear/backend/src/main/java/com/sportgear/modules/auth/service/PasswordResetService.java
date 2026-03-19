package com.sportgear.modules.auth.service;

import com.sportgear.common.dto.ApiMessageResponse;
import com.sportgear.common.exception.ApiException;
import com.sportgear.config.SecurityProperties;
import com.sportgear.modules.auth.dto.ForgotPasswordRequest;
import com.sportgear.modules.auth.dto.ResetPasswordRequest;
import com.sportgear.modules.auth.entity.PasswordResetToken;
import com.sportgear.modules.auth.repository.PasswordResetTokenRepository;
import com.sportgear.modules.auth.validator.AuthValidator;
import com.sportgear.modules.user.entity.User;
import com.sportgear.modules.user.repository.UserRepository;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PasswordResetService {

    private final UserRepository userRepository;
    private final PasswordResetTokenRepository tokenRepository;
    private final AuthValidator authValidator;
    private final org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;
    private final SecurityProperties securityProperties;
    private final EmailService emailService;

    public PasswordResetService(
        UserRepository userRepository,
        PasswordResetTokenRepository tokenRepository,
        AuthValidator authValidator,
        org.springframework.security.crypto.password.PasswordEncoder passwordEncoder,
        SecurityProperties securityProperties,
        EmailService emailService
    ) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
        this.authValidator = authValidator;
        this.passwordEncoder = passwordEncoder;
        this.securityProperties = securityProperties;
        this.emailService = emailService;
    }

    @Transactional
    public ApiMessageResponse requestReset(ForgotPasswordRequest request) {
        String email = request.getEmail().toLowerCase().trim();
        User user = userRepository.findByEmail(email).orElse(null);

        if (user == null) {
            return new ApiMessageResponse("If account exists, reset instructions have been sent");
        }

        tokenRepository.deleteByUserId(user.getId());

        String token = UUID.randomUUID().toString().replace("-", "");
        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(token);
        resetToken.setUser(user);
        resetToken.setExpiresAt(
            Instant.now().plus(securityProperties.getJwt().getResetTokenExpiryMinutes(), ChronoUnit.MINUTES)
        );

        tokenRepository.save(resetToken);
        emailService.sendPasswordResetToken(email, token);

        return new ApiMessageResponse("If account exists, reset instructions have been sent");
    }

    @Transactional
    public ApiMessageResponse resetPassword(ResetPasswordRequest request) {
        authValidator.validateResetPassword(request);

        PasswordResetToken token = tokenRepository.findByToken(request.getToken().trim())
            .orElseThrow(() -> new ApiException(HttpStatus.BAD_REQUEST, "Reset token is invalid"));

        if (token.getExpiresAt().isBefore(Instant.now())) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Reset token is expired");
        }

        User user = token.getUser();
        user.setPasswordHash(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
        tokenRepository.delete(token);

        return new ApiMessageResponse("Password reset successful");
    }
}
