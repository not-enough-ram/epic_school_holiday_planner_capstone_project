package de.neuefische.backend.controller;

import de.neuefische.backend.security.model.AppUser;
import de.neuefische.backend.security.repository.AppUserRepository;
import de.neuefische.backend.security.service.JwtUtilsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("api/auth")
public class LoginController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtilsService jwtService;
    private final AppUserRepository appUserRepository;


    @Autowired
    public LoginController(AuthenticationManager authenticationManager, JwtUtilsService jwtService, AppUserRepository appUserRepository, AppUserRepository appUserRepository1) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.appUserRepository = appUserRepository1;
    }

    @PostMapping("login")
    public String login(@RequestBody AppUser data) {
        try {
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(data.getUsername(), data.getPassword());
            authenticationManager.authenticate(authentication);
            AppUser appUser = appUserRepository.findById(data.getUsername()).get();
            String userRole = appUser.getRole().toString();
            String token = jwtService.createToken(new HashMap<>(Map.of("userRole", userRole)), data.getUsername());
            return token;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "bad login data");
        }
    }
}
