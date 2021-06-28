package de.neuefische.backend.controller;


import de.neuefische.backend.dto.AppUserDto;
import de.neuefische.backend.dto.UserDto;
import de.neuefische.backend.model.Child;
import de.neuefische.backend.model.User;
import de.neuefische.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("api/user/")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("new/appuser")
    public String addNewAppUser(@RequestBody AppUserDto newUser) {
        userService.addNewAppUser(newUser);
        return newUser.getUsername();
    }

    @PostMapping("new/user")
    public User addNewAppUser(@RequestBody User newUser) {
        return userService.addNewUser(newUser);
    }

    @PutMapping("update")
    public User updateUser(@RequestBody UserDto user, Principal principal) {
        return userService.updateUser(user, principal.getName());
    }

    @GetMapping("children")
    public List<Child> getChildByUser(Principal user) {
        return userService.getChildByUser(user.getName());
    }

    @PostMapping("children")
    public List<Child> addChildren(@RequestBody List<Child> children, Principal user) {
        return userService.addChildren(children, user.getName());
    }

    @GetMapping
    public User getUser(Principal user) {
        return userService.getUser(user.getName());
    }
}
