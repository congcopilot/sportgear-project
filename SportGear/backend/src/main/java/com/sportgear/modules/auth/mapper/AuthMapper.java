package com.sportgear.modules.auth.mapper;

import com.sportgear.modules.auth.dto.AuthResponse;
import com.sportgear.modules.user.entity.User;
import org.springframework.stereotype.Component;

@Component
public class AuthMapper {

    public AuthResponse toAuthResponse(User user, String token, String message) {
        AuthResponse response = new AuthResponse();
        response.setMessage(message);
        response.setAccessToken(token);

        AuthResponse.UserSummary summary = new AuthResponse.UserSummary();
        summary.setId(user.getId());
        summary.setEmail(user.getEmail());
        summary.setFullName(user.getFullName());
        summary.setPhone(user.getPhone());
        summary.setAvatarUrl(user.getAvatarUrl());
        summary.setRole(user.getRole().name());

        response.setUser(summary);
        return response;
    }
}
