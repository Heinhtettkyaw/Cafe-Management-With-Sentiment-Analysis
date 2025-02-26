package com.example.cafe.service;

import com.example.cafe.model.CafeOrder;
import com.example.cafe.model.MenuItem;
import com.example.cafe.model.OrderItem;
import com.example.cafe.model.OrderStatus;
import com.example.cafe.model.User;
import com.example.cafe.repository.CafeOrderRepository;
import com.example.cafe.repository.MenuItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private CafeOrderRepository orderRepository;

    @Autowired
    private MenuItemRepository menuItemRepository; // Added

    public CafeOrder placeOrder(CafeOrder order) {
        order.setOrderDate(new Date());
        order.setStatus(OrderStatus.PENDING);

        List<OrderItem> processedItems = new ArrayList<>();
        for (OrderItem item : order.getItems()) {
            MenuItem menuItem = menuItemRepository.findById(item.getMenuItem().getId())
                    .orElseThrow(() -> new RuntimeException("Menu item not found"));

            OrderItem processedItem = new OrderItem();
            processedItem.setMenuItem(menuItem);
            processedItem.setQuantity(item.getQuantity());
            processedItem.setPrice(menuItem.getPrice()); // Use current price
            processedItem.setOrder(order);
            processedItems.add(processedItem);
        }

        order.setItems(processedItems);
        order.setTotalAmount(processedItems.stream()
                .map(i -> i.getPrice().multiply(BigDecimal.valueOf(i.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add));

        return orderRepository.save(order);
    }

    // Other methods remain unchanged
    public List<CafeOrder> getAllOrders() {
        return orderRepository.findAllWithItems(); // Use the new method
    }

    public List<CafeOrder> getOrdersByUser(User user) {
        return orderRepository.findByUser(user);
    }

    public CafeOrder updateOrderStatus(Long orderId, OrderStatus status) {
        CafeOrder order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(status);
        return orderRepository.save(order);
    }
}
