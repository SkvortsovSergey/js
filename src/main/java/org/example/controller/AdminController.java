package org.example.controller;

import org.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AdminController {

    private UserService userService;


    @Autowired
    public AdminController (UserService userService) {
        this.userService = userService;

    }

    @GetMapping("/admin")
    public String getAllUsers (Model model) {
        model.addAttribute("users", userService.getAllUsers());
        return "admin";
    }
}

