package com.sportgear.modules.user.service;

import com.sportgear.common.exception.ResourceNotFoundException;
import com.sportgear.modules.user.dto.UpdateProfileRequest;
import com.sportgear.modules.user.dto.UserProfileResponse;
import com.sportgear.modules.user.entity.User;
import com.sportgear.modules.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserProfileService {

    private final UserRepository userRepository;

    public UserProfileService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public UserProfileResponse getCurrentProfile(String email) {
        User user = findByEmailOrThrow(email);
        return UserProfileResponse.from(user);
    }

    @Transactional
    public UserProfileResponse updateCurrentProfile(String email, UpdateProfileRequest request) {
        User user = findByEmailOrThrow(email);

        if (request.getFullName() != null && !request.getFullName().isBlank()) {
            user.setFullName(request.getFullName().trim());
        }

        user.setPhone(request.getPhone() == null ? "" : request.getPhone().trim());
        user.setAvatarUrl(request.getAvatarUrl() == null ? "" : request.getAvatarUrl().trim());

        return UserProfileResponse.from(userRepository.save(user));
    }

    private User findByEmailOrThrow(String email) {
        return userRepository.findByEmail(email)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
}
