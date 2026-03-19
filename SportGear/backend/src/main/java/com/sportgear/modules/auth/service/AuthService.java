package com.sportgear.modules.auth.service;

import com.sportgear.common.exception.ApiException;
import com.sportgear.modules.auth.dto.AuthResponse;
import com.sportgear.modules.auth.dto.LoginRequest;
import com.sportgear.modules.auth.dto.RegisterRequest;
import com.sportgear.modules.auth.mapper.AuthMapper;
import com.sportgear.modules.auth.validator.AuthValidator;
import com.sportgear.modules.user.entity.User;
import com.sportgear.modules.user.entity.UserRole;
import com.sportgear.modules.user.repository.UserRepository;
import com.sportgear.security.JwtTokenProvider;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthValidator authValidator;
    private final AuthMapper authMapper;

    public AuthService(
        UserRepository userRepository,
        PasswordEncoder passwordEncoder,
        JwtTokenProvider jwtTokenProvider,
        AuthValidator authValidator,
        AuthMapper authMapper
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
        this.authValidator = authValidator;
        this.authMapper = authMapper;
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        authValidator.validateRegister(request);

        if (userRepository.existsByEmail(request.getEmail().toLowerCase())) {
            throw new ApiException(HttpStatus.CONFLICT, "Email already exists");
        }

        User user = new User();
        user.setEmail(request.getEmail().toLowerCase().trim());
        user.setFullName(request.getFullName().trim());
        user.setPhone(request.getPhone() == null ? "" : request.getPhone().trim());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setRole(UserRole.ROLE_USER);
        user.setAccountLocked(false);

        User saved = userRepository.save(user);
        String token = jwtTokenProvider.generateAccessToken(saved);

        return authMapper.toAuthResponse(saved, token, "Register success");
    }

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail().toLowerCase().trim())
            .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "Invalid email or password"));

        if (user.isAccountLocked()) {
            throw new ApiException(HttpStatus.LOCKED, "Account is locked");
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new ApiException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
        }

        String token = jwtTokenProvider.generateAccessToken(user);
        return authMapper.toAuthResponse(user, token, "Login success");
    }
}
