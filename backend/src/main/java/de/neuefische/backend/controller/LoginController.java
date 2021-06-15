package de.neuefische.backend.controller;

import de.neuefische.backend.models.LoginData;
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

@RestController
@RequestMapping("login")
public class LoginController {

    private final AuthenticationManager authenticationManager;
    private final de.neuefische.backend.security.service.JwtUtilsService jwtService;

    @Autowired
    public LoginController(AuthenticationManager authenticationManager, JwtUtilsService jwtService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @PostMapping
    public String login(@RequestBody LoginData data){
        try {
            UsernamePasswordAuthenticationToken usernamePasswordData = new UsernamePasswordAuthenticationToken(data.getUsername(), data.getPassword());
            authenticationManager.authenticate(usernamePasswordData);
            return jwtService.createToken(new HashMap<>(), data.getUsername());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "bad login data");
        }
    }
}
