package ru.kata.spring.boot_security.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MyController {

    @GetMapping("/")
    public String homePage() {

        return "redirect:/users";
    }

    @GetMapping("/admin")
    public String adminPage() {

        return "all_users";
    }

    @GetMapping("/users")
    public String userPage() {

        return "current_user";
    }
}
