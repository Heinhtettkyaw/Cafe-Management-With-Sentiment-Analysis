package com.example.cafe.controller;

import com.example.cafe.model.CafeOrder;
import com.example.cafe.model.OrderStatus;
import com.example.cafe.model.User;
import com.example.cafe.service.OrderService;
import com.example.cafe.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserRepository userRepository;

    // Customer: Place an order
    @PostMapping("/place")
    public ResponseEntity<CafeOrder> placeOrder(@RequestBody CafeOrder order, Principal principal) {
        User user = userRepository.findByUsername(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        order.setUser(user);
        return ResponseEntity.ok(orderService.placeOrder(order));
    }

    // Customer: View own orders
    @GetMapping("/myorders")
    public ResponseEntity<List<CafeOrder>> getMyOrders(Principal principal) {
        User user = userRepository.findByUsername(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(orderService.getOrdersByUser(user));
    }

    // ADMIN: View all orders
    @GetMapping("/admin/all")
    public ResponseEntity<List<CafeOrder>> getAllOrders() {
        try {
            List<CafeOrder> orders = orderService.getAllOrders();
            return ResponseEntity.ok(orders);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null); // Proper error response
        }
    }

    // ADMIN: Update order status
    @PutMapping("/admin/update/{orderId}")
    public ResponseEntity<CafeOrder> updateOrderStatus(@PathVariable Long orderId, @RequestBody Map<String, String> request) {
        OrderStatus status = OrderStatus.valueOf(request.get("status"));
        return ResponseEntity.ok(orderService.updateOrderStatus(orderId, status));
    }
}
