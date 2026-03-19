package com.sportgear.modules.order.service;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import com.sportgear.common.exception.ApiException;
import com.sportgear.modules.user.entity.User;
import com.sportgear.modules.user.repository.UserRepository;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class OrderAccessGuardServiceTest {

    @Mock
    private UserRepository userRepository;

    private OrderAccessGuardService orderAccessGuardService;

    @BeforeEach
    void setUp() {
        orderAccessGuardService = new OrderAccessGuardService(userRepository);
    }

    @Test
    void shouldRejectLockedAccount() {
        User user = new User();
        user.setEmail("locked@sportgear.vn");
        user.setAccountLocked(true);

        when(userRepository.findByEmail("locked@sportgear.vn")).thenReturn(Optional.of(user));

        assertThrows(
            ApiException.class,
            () -> orderAccessGuardService.ensureAccountCanCheckout("locked@sportgear.vn")
        );
    }
}
