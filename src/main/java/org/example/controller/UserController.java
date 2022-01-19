package org.example.controller;

import org.example.model.User;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/user")
public class UserController {

    @GetMapping("")
    public User getUs(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return user;
    }
}

