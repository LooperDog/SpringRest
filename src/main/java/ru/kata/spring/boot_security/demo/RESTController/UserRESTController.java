package ru.kata.spring.boot_security.demo.RESTController;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.kata.spring.boot_security.demo.entities.User;
import ru.kata.spring.boot_security.demo.repository.UserRepository;

import java.security.Principal;

@RestController
@RequestMapping("/api/users")
public class UserRESTController {


    private final UserRepository userRepository;

    public UserRESTController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/current_user")
    public ResponseEntity<User> currentUser(Principal principal) {
        return ResponseEntity.ok(userRepository.findByUsername(principal.getName()));
    }

}
