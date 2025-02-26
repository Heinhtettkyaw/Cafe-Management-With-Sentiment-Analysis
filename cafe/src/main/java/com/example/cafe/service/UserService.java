package com.example.cafe.service;

import com.example.cafe.model.User;
import com.example.cafe.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Method to update user profile
    public void updateUserProfile(User currentUser, User updatedUser) {
        currentUser.setFullName(updatedUser.getFullName());
        currentUser.setEmail(updatedUser.getEmail());
        currentUser.setPhone(updatedUser.getPhone());
        currentUser.setGender(updatedUser.getGender());
        userRepository.save(currentUser);
    }

    // Method to change user password
    public void changePassword(User user, String oldPassword, String newPassword) throws Exception {
        if (passwordEncoder.matches(oldPassword, user.getPassword())) {
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
        } else {
            throw new Exception("Old password is incorrect");
        }
    }
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
