package org.example.controller;


import org.example.model.User;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class CurrentUserController {


    @GetMapping("")
    public User getUs(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return user;
    }
}
