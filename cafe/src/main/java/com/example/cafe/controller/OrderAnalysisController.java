// OrderAnalysisController.java
package com.example.cafe.controller;

import com.example.cafe.model.MenuItem;
import com.example.cafe.model.OrderItem;
import com.example.cafe.repository.OrderItemRepository;
import com.example.cafe.repository.MenuItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
public class OrderAnalysisController {

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private MenuItemRepository menuItemRepository;

    @GetMapping("/best-selling-products")
    public ResponseEntity<Map<String, Integer>> getBestSellingProducts() {
        try {
            List<OrderItem> orderItems = orderItemRepository.findAll();

            // Create a map to store product counts
            Map<String, Integer> productCounts = new HashMap<>();

            for (OrderItem item : orderItems) {
                String productName = item.getMenuItem().getName();
                productCounts.put(productName, productCounts.getOrDefault(productName, 0) + item.getQuantity());
            }

            return ResponseEntity.ok(productCounts);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }
}