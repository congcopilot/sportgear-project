package com.sportgear.modules.user.dto;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class UpdateProfileRequest {

    @Size(min = 2, max = 120, message = "Full name must be between 2 and 120 characters")
    private String fullName;

    @Pattern(
        regexp = "^$|^[0-9+\\-\\s]{9,15}$",
        message = "Phone number format is invalid"
    )
    private String phone;

    @Pattern(
        regexp = "^$|^https?://.*",
        message = "Avatar URL must start with http:// or https://"
    )
    private String avatarUrl;

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }
}
