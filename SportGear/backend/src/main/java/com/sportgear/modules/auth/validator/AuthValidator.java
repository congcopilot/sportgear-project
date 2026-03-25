package com.sportgear.modules.auth.validator;

import com.sportgear.common.exception.ApiException;
import com.sportgear.modules.auth.dto.RegisterRequest;
import com.sportgear.modules.auth.dto.ResetPasswordRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@Component
public class AuthValidator {

    private static final String PASSWORD_CONFIRMATION_MISMATCH_MESSAGE =
        "Password confirmation does not match";
    private static final String PASSWORD_STRENGTH_MESSAGE =
        "Password must contain upper-case, lower-case and digit characters";

    public void validateRegister(RegisterRequest request) {
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new ApiException(HttpStatus.BAD_REQUEST, PASSWORD_CONFIRMATION_MISMATCH_MESSAGE);
        }

        ensurePasswordStrong(request.getPassword());
    }

    public void validateResetPassword(ResetPasswordRequest request) {
        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new ApiException(HttpStatus.BAD_REQUEST, PASSWORD_CONFIRMATION_MISMATCH_MESSAGE);
        }

        ensurePasswordStrong(request.getNewPassword());
    }

    private void ensurePasswordStrong(String password) {
        boolean containsUpper = password.chars().anyMatch(Character::isUpperCase);
        boolean containsLower = password.chars().anyMatch(Character::isLowerCase);
        boolean containsDigit = password.chars().anyMatch(Character::isDigit);

        if (!(containsUpper && containsLower && containsDigit)) {
            throw new ApiException(HttpStatus.BAD_REQUEST, PASSWORD_STRENGTH_MESSAGE);
        }
    }
}
