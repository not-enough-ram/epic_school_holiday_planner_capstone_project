package de.neuefische.backend.controller;


import de.neuefische.backend.dto.AppUserDto;
import de.neuefische.backend.dto.ChildDto;
import de.neuefische.backend.dto.UserDto;
import de.neuefische.backend.model.Child;
import de.neuefische.backend.model.User;
import de.neuefische.backend.security.model.AppUser;
import de.neuefische.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("api/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("appuser")
    public AppUser addNewAppUser(@RequestBody AppUserDto newUser) {
        return userService.addNewAppUser(newUser);
    }

    @PostMapping()
    public User addNewAppUser(@RequestBody User newUser) {
        return userService.addNewUser(newUser);
    }

    @PostMapping("update")
    public User updateUser(@RequestBody UserDto user, Principal principal) {
        return userService.updateUser(user, principal.getName());
    }

    @GetMapping("children")
    public List<Child> getChildByUser(Principal user) {
        return userService.getChildByUser(user.getName());
    }


    @PostMapping("children")
    public Child addChildren(@RequestBody ChildDto children, Principal user) {
        return userService.addChild(children, user.getName());
    }

    @GetMapping
    public User getUser(Principal user) {
        return userService.getUser(user.getName());
    }

    @GetMapping("allappusers")
    public List<AppUser> getAllAppUsers(Principal user) {
        return userService.getAllAppUsers(user.getName());
    }
}
