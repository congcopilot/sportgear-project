package com.sportgear.modules.order.service;

import com.sportgear.common.exception.ApiException;
import com.sportgear.modules.user.entity.User;
import com.sportgear.modules.user.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class OrderAccessGuardService {

    private final UserRepository userRepository;

    public OrderAccessGuardService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void ensureAccountCanCheckout(String email) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "User not found"));

        if (user.isAccountLocked()) {
            throw new ApiException(HttpStatus.FORBIDDEN, "Account is locked. Checkout is not allowed.");
        }
    }
}
