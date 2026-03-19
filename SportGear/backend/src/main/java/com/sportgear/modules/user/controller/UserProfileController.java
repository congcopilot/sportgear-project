package com.sportgear.modules.user.controller;

import com.sportgear.modules.user.dto.UpdateProfileRequest;
import com.sportgear.modules.user.dto.UserProfileResponse;
import com.sportgear.modules.user.service.UserProfileService;
import jakarta.validation.Valid;
import java.security.Principal;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users/me")
public class UserProfileController {

    private final UserProfileService userProfileService;

    public UserProfileController(UserProfileService userProfileService) {
        this.userProfileService = userProfileService;
    }

    @GetMapping
    public ResponseEntity<UserProfileResponse> getProfile(Principal principal) {
        return ResponseEntity.ok(userProfileService.getCurrentProfile(principal.getName()));
    }

    @PutMapping
    public ResponseEntity<UserProfileResponse> updateProfile(
        Principal principal,
        @Valid @RequestBody UpdateProfileRequest request
    ) {
        return ResponseEntity.ok(userProfileService.updateCurrentProfile(principal.getName(), request));
    }
}
