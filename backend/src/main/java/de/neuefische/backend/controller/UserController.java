package de.neuefische.backend.controller;


import de.neuefische.backend.dto.AppUserDto;
import de.neuefische.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("new")
    public String addNewUser(@RequestBody AppUserDto newUser) {
        userService.addNewUser(newUser);
        return newUser.getUsername();
    }
}
