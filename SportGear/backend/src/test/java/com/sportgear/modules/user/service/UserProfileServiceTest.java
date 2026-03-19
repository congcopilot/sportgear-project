package com.sportgear.modules.user.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import com.sportgear.modules.user.dto.UpdateProfileRequest;
import com.sportgear.modules.user.entity.User;
import com.sportgear.modules.user.repository.UserRepository;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class UserProfileServiceTest {

    @Mock
    private UserRepository userRepository;

    private UserProfileService userProfileService;

    @BeforeEach
    void setUp() {
        userProfileService = new UserProfileService(userRepository);
    }

    @Test
    void updateProfileShouldPersistChanges() {
        User user = new User();
        user.setId(1L);
        user.setEmail("user@sportgear.vn");
        user.setFullName("Old Name");

        UpdateProfileRequest request = new UpdateProfileRequest();
        request.setFullName("New Name");
        request.setPhone("0987654321");
        request.setAvatarUrl("https://cdn.example.com/avatar.png");

        when(userRepository.findByEmail("user@sportgear.vn")).thenReturn(Optional.of(user));
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        String fullName = userProfileService.updateCurrentProfile("user@sportgear.vn", request).getFullName();

        assertEquals("New Name", fullName);
    }
}
