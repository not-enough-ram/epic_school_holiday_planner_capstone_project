package de.neuefische.backend.service;

import de.neuefische.backend.dto.AppUserDto;
import de.neuefische.backend.model.User;
import de.neuefische.backend.repository.UserRepository;
import de.neuefische.backend.security.model.AppUser;
import de.neuefische.backend.security.model.UserRole;
import de.neuefische.backend.security.repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final AppUserRepository appUserRepository;
    private final PasswordEncoder encoder;


    @Autowired
    public UserService(UserRepository userRepository, AppUserRepository appUserRepository, PasswordEncoder encoder) {
        this.appUserRepository = appUserRepository;
        this.encoder = encoder;
    }

    public AppUser addNewUser(AppUserDto newUser) {
        AppUser newAppUser = AppUser.builder()
                .username(newUser.getUsername())
                .password(encoder.encode(newUser.getPassword()))
                .userRole(castDtoToModel(newUser.getUserRole()))
                .build();
        return appUserRepository.save(newAppUser);
    }

    public UserRole castDtoToModel(String userRole){
        switch (userRole){
            case "USER":
                return UserRole.USER;
            case "EMPLOYEE":
                return UserRole.EMPLOYEE;
            case "MANAGER":
                return UserRole.MANAGER;
            case "ADMIN":
                return UserRole.ADMIN;
            default:
                return UserRole.FORBIDDEN;
        }
    }
}
