// src/main/java/com/example/cafe/model/Feedback.java
package com.example.cafe.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "feedback")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String feedbackMessage;

    @Column(nullable = true)
    private Double rating;  // You can store rating as a string, or use an enum

    @Column(nullable = false)
    private Long createdAt;

    // New field to store sentiment analysis result (e.g., "Positive", "Negative", "Neutral")
    @Column(nullable = true)
    private String sentiment;
}
