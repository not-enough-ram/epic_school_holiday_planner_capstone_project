package de.neuefische.backend.service;

import de.neuefische.backend.dto.AppUserDto;
import de.neuefische.backend.repository.UserRepository;
import de.neuefische.backend.security.model.AppUser;
import de.neuefische.backend.security.model.Role;
import de.neuefische.backend.security.repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UserService {
    private final AppUserRepository appUserRepository;
    private final PasswordEncoder encoder;


    @Autowired
    public UserService(UserRepository userRepository, AppUserRepository appUserRepository, PasswordEncoder encoder) {
        this.appUserRepository = appUserRepository;
        this.encoder = encoder;
    }

    public String addNewUser(AppUserDto newUser) {
        AppUser newAppUser = AppUser.builder()
                .username(newUser.getUsername())
                .password(encoder.encode(newUser.getPassword()))
                .role(castDtoToModel(newUser.getUserRole()))
                .build();
        return newAppUser.getUsername();
    }

    public Role castDtoToModel(String role){
        switch (role){
            case "USER":
                return Role.USER;
            case "EMPLOYEE":
                return Role.EMPLOYEE;
            case "MANAGER":
                return Role.MANAGER;
            case "ADMIN":
                return Role.ADMIN;
            default:
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"no such user role");
        }
    }
}
