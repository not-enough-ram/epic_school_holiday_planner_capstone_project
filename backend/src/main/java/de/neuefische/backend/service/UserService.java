package de.neuefische.backend.service;

import de.neuefische.backend.dto.AppUserDto;
import de.neuefische.backend.dto.UserDto;
import de.neuefische.backend.model.Child;
import de.neuefische.backend.model.User;
import de.neuefische.backend.repository.ChildRepository;
import de.neuefische.backend.repository.UserRepository;
import de.neuefische.backend.security.model.AppUser;
import de.neuefische.backend.security.model.Role;
import de.neuefische.backend.security.repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class UserService {
    private final AppUserRepository appUserRepository;
    private final PasswordEncoder encoder;
    private final UserRepository userRepository;
    private final ChildRepository childRepository;


    @Autowired
    public UserService(AppUserRepository appUserRepository, PasswordEncoder encoder, UserRepository userRepository, ChildRepository childRepository) {
        this.appUserRepository = appUserRepository;
        this.encoder = encoder;
        this.userRepository = userRepository;
        this.childRepository = childRepository;
    }

    public String addNewAppUser(AppUserDto newUser) {
        AppUser newAppUser = AppUser.builder()
                .username(newUser.getUsername())
                .password(encoder.encode(newUser.getPassword()))
                .role(castDtoToModel(newUser.getRole()))
                .build();
        appUserRepository.save(newAppUser);
        return newAppUser.getUsername();
    }

    public Role castDtoToModel(String role){
        switch (role){
            case "user":
                return Role.USER;
            case "employee":
                return Role.EMPLOYEE;
            case "manager":
                return Role.MANAGER;
            case "admin":
                return Role.ADMIN;
            default:
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "no such user role");
        }
    }

    public User getUser(String user) {
        if (userRepository.findById(user).isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
        return userRepository.findById(user).get();
    }

    public User updateUser(UserDto user, String login) {
        System.out.println(user);
        if (userRepository.findById(login).isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found!!!!!!!");
        }
        User userToUpdate = userRepository.findById(login).get();
        if (!user.getFirstName().isBlank()) {
            userToUpdate.setFirstName(user.getFirstName());
        }
        if (!user.getLastName().isBlank()) {
            userToUpdate.setLastName(user.getLastName());
        }
        if (!user.getPhone().isBlank()) {
            userToUpdate.setPhone(user.getPhone());
        }
        if (!user.getNotes().isBlank()) {
            userToUpdate.setNotes(user.getNotes());
        }

        return userRepository.save(userToUpdate);
    }

    public User addNewUser(User newUser) {
        return userRepository.save(User.builder()
                .login(newUser.getLogin())
                .firstName(newUser.getFirstName())
                .lastName(newUser.getLastName())
                .phone(newUser.getPhone())
                .notes(newUser.getNotes())
                .build());
    }

    public List<Child> addChildren(List<Child> children, String login) {
        return childRepository.saveAll(children);
    }
}
