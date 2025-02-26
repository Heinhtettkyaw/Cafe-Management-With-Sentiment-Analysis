package com.example.cafe.controller;

import com.example.cafe.model.MenuItem;
import com.example.cafe.repository.MenuItemRepository;
import com.example.cafe.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/menu")
public class MenuController {

    @Autowired
    private MenuService menuService;
    @Autowired
    private MenuItemRepository menuItemRepository;

    // Public: Browse menu items
    @GetMapping
    public ResponseEntity<List<MenuItem>> getMenuItems() {
        return ResponseEntity.ok(menuService.getAllMenuItems());
    }

    // ADMIN: Add a new menu item
    @PostMapping("/admin/add")
    public ResponseEntity<MenuItem> addMenuItem(@RequestBody MenuItem item) {
        return ResponseEntity.ok(menuService.addMenuItem(item));
    }

    // ADMIN: Update an existing menu item
    @PutMapping("/admin/update/{id}")
    public ResponseEntity<MenuItem> updateMenuItem(@PathVariable Long id, @RequestBody MenuItem item) {
        return ResponseEntity.ok(menuService.updateMenuItem(id, item));
    }

    // ADMIN: Delete a menu item
    @DeleteMapping("/admin/delete/{id}")
    public ResponseEntity<?> deleteMenuItem(@PathVariable Long id) {
        MenuItem menuItem = menuItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Menu item not found"));
        menuItemRepository.delete(menuItem);  // This triggers the @SQLDelete
        return ResponseEntity.ok("Menu item soft deleted successfully");
    }
    //ADMIN: Item Availability
    @PutMapping("/admin/toggle-available/{id}")
    public ResponseEntity<?> toggleMenuItemAvailability(@PathVariable Long id) {
        menuService.toggleMenuItemAvailability(id);
        return ResponseEntity.ok().build();
    }
}
