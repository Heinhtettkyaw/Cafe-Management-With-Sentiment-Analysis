// src/main/java/com/example/cafe/controller/FeedbackController.java
package com.example.cafe.controller;

import com.example.cafe.model.Feedback;
import com.example.cafe.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackRepository feedbackRepository;

    // Fetch all feedback submitted by customers
    @GetMapping("/all")
    public ResponseEntity<List<Feedback>> getAllFeedback() {
        try {
            List<Feedback> feedbackList = feedbackRepository.findAll();
            return ResponseEntity.ok(feedbackList);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    // POST request to save feedback (existing functionality)
    @PostMapping("/submit")
    public ResponseEntity<?> submitFeedback(@RequestBody Map<String, String> feedbackData) {
        try {
            String username = feedbackData.get("username");
            String feedbackMessage = feedbackData.get("feedbackMessage");
            String rating = feedbackData.get("rating");

            Feedback feedback = new Feedback();
            feedback.setUsername(username);
            feedback.setFeedbackMessage(feedbackMessage);
            feedback.setRating(rating);
            feedback.setCreatedAt(System.currentTimeMillis());

            feedbackRepository.save(feedback);

            return ResponseEntity.ok(Map.of("message", "Feedback submitted successfully"));

        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Error submitting feedback"));
        }
    }
}
