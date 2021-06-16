package de.neuefische.backend.controller;

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
@RequestMapping("api/auth")
public class LoginController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtilsService jwtService;


    @Autowired
    public LoginController(AuthenticationManager authenticationManager, JwtUtilsService jwtService, AppUserRepository appUserRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @GetMapping
    public String getAnswer(AppUser data) {
        System.out.println(data);
        return data.toString();
    }

    @PostMapping("login")
    public String login(@RequestBody AppUser data) {
        try {
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(data.getUsername(), data.getPassword());
            authenticationManager.authenticate(authentication);
            // SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = jwtService.createToken(new HashMap<>(), data.getUsername());
            System.out.println("The answer my friend is " + token);
            return token;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "bad login data");
        }
    }
}
