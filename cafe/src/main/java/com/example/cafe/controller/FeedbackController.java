package com.example.cafe.controller;

import com.example.cafe.model.Feedback;
import com.example.cafe.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private RestTemplate restTemplate;

    // Enable CORS for this specific method
    @CrossOrigin(origins = "http://localhost:3000") // Frontend URL
    @PostMapping("/submit")
    public ResponseEntity<?> submitFeedback(@RequestBody Map<String, String> feedbackData) {
        try {
            String username = feedbackData.get("username");
            String feedbackMessage = feedbackData.get("feedbackMessage");
            String rating = feedbackData.get("rating");

            // Call the Python microservice to get sentiment analysis
            Map<String, String> requestBody = Map.of("review", feedbackMessage);
            ResponseEntity<Map> response = restTemplate.postForEntity("http://localhost:5000/predict", requestBody, Map.class);
            String sentiment = "Unknown";
            if(response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                sentiment = (String) response.getBody().get("sentiment");
            }

            Feedback feedback = new Feedback();
            feedback.setUsername(username);
            feedback.setFeedbackMessage(feedbackMessage);
            feedback.setRating(rating);
            feedback.setCreatedAt(System.currentTimeMillis());
            feedback.setSentiment(sentiment);

            feedbackRepository.save(feedback);

            return ResponseEntity.ok(Map.of("message", "Feedback submitted successfully", "sentiment", sentiment));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", "Error submitting feedback", "message", e.getMessage()));
        }
    }

    // Get all feedback (global CORS applied)
    @GetMapping("/all")
    public ResponseEntity<List<Feedback>> getAllFeedback() {
        try {
            List<Feedback> feedbackList = feedbackRepository.findAll();
            return ResponseEntity.ok(feedbackList);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }
}
