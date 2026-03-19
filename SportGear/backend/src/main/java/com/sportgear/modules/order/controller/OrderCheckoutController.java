package com.sportgear.modules.order.controller;

import com.sportgear.common.dto.ApiMessageResponse;
import com.sportgear.modules.order.dto.CheckoutRequest;
import com.sportgear.modules.order.service.OrderAccessGuardService;
import jakarta.validation.Valid;
import java.security.Principal;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/orders")
public class OrderCheckoutController {

    private final OrderAccessGuardService orderAccessGuardService;

    public OrderCheckoutController(OrderAccessGuardService orderAccessGuardService) {
        this.orderAccessGuardService = orderAccessGuardService;
    }

    @PostMapping("/checkout")
    public ResponseEntity<ApiMessageResponse> checkout(
        Principal principal,
        @Valid @RequestBody CheckoutRequest request
    ) {
        orderAccessGuardService.ensureAccountCanCheckout(principal.getName());
        return ResponseEntity.ok(new ApiMessageResponse("Checkout request accepted"));
    }
}
