package com.sportgear.modules.auth.service;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.sportgear.common.exception.ApiException;
import com.sportgear.modules.auth.dto.AuthResponse;
import com.sportgear.modules.auth.dto.LoginRequest;
import com.sportgear.modules.auth.dto.RegisterRequest;
import com.sportgear.modules.auth.mapper.AuthMapper;
import com.sportgear.modules.auth.validator.AuthValidator;
import com.sportgear.modules.user.entity.User;
import com.sportgear.modules.user.repository.UserRepository;
import com.sportgear.security.JwtTokenProvider;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private JwtTokenProvider jwtTokenProvider;
    @Mock
    private AuthValidator authValidator;
    @Mock
    private AuthMapper authMapper;

    private AuthService authService;

    @BeforeEach
    void setUp() {
        authService = new AuthService(
            userRepository,
            passwordEncoder,
            jwtTokenProvider,
            authValidator,
            authMapper
        );
    }

    @Test
    void registerShouldCreateUserWithEncodedPassword() {
        RegisterRequest request = new RegisterRequest();
        request.setEmail("new@sportgear.vn");
        request.setPassword("StrongPass1");
        request.setConfirmPassword("StrongPass1");
        request.setFullName("Sport User");

        User saved = new User();
        saved.setId(1L);
        saved.setEmail("new@sportgear.vn");
        saved.setFullName("Sport User");
        saved.setPasswordHash("encoded");

        when(userRepository.existsByEmail("new@sportgear.vn")).thenReturn(false);
        when(passwordEncoder.encode("StrongPass1")).thenReturn("encoded");
        when(userRepository.save(any(User.class))).thenReturn(saved);
        when(jwtTokenProvider.generateAccessToken(saved)).thenReturn("token");
        when(authMapper.toAuthResponse(saved, "token", "Register success")).thenReturn(new AuthResponse());

        authService.register(request);

        verify(passwordEncoder).encode("StrongPass1");
        verify(userRepository).save(any(User.class));
    }

    @Test
    void loginShouldRejectLockedAccount() {
        LoginRequest request = new LoginRequest();
        request.setEmail("locked@sportgear.vn");
        request.setPassword("StrongPass1");

        User lockedUser = new User();
        lockedUser.setEmail("locked@sportgear.vn");
        lockedUser.setPasswordHash("hash");
        lockedUser.setAccountLocked(true);

        when(userRepository.findByEmail("locked@sportgear.vn")).thenReturn(Optional.of(lockedUser));

        assertThrows(ApiException.class, () -> authService.login(request));
    }
}
