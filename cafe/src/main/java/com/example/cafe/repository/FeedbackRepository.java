// src/main/java/com/example/cafe/repository/FeedbackRepository.java
package com.example.cafe.repository;

import com.example.cafe.model.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
}
