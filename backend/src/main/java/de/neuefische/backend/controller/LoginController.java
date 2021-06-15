package de.neuefische.backend.controller;

import de.neuefische.backend.models.LoginData;
import de.neuefische.backend.security.model.AppUser;
import de.neuefische.backend.security.repository.AppUserRepository;
import de.neuefische.backend.security.service.JwtUtilsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;

@RestController
@RequestMapping("login")
public class LoginController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtilsService jwtService;
    private final AppUserRepository appUserRepository;

    @Autowired
    public LoginController(AuthenticationManager authenticationManager, JwtUtilsService jwtService, AppUserRepository appUserRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.appUserRepository = appUserRepository;
    }

    @GetMapping
    public String getAnswer(LoginData data) {
        System.out.println(data);
        return data.toString();
    }

    @PostMapping("new")
    public void addUser(@RequestBody AppUser data) {
        appUserRepository.save(data);
    }

    @PostMapping
    public String login(@RequestBody AppUser data) {
        try {
            UsernamePasswordAuthenticationToken usernamePasswordData = new UsernamePasswordAuthenticationToken(data.getUsername(), data.getPassword());
            authenticationManager.authenticate(usernamePasswordData);
            String answer = jwtService.createToken(new HashMap<>(), data.getUsername());
            System.out.println("The answer my friend is " + answer);
            return answer;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "bad login data");
        }
    }
}
