package de.neuefische.backend.service;

import de.neuefische.backend.repository.UserRepository;
import de.neuefische.backend.security.model.AppUser;
import de.neuefische.backend.security.repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final AppUserRepository appUserRepository;
    private final PasswordEncoder encoder;


    @Autowired
    public UserService(UserRepository userRepository, AppUserRepository appUserRepository, PasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.appUserRepository = appUserRepository;
        this.encoder = encoder;
    }

    public AppUser addNewUser(AppUser newUser) {
        appUserRepository.save(AppUser.builder().username(newUser.getUsername()).password(encoder.encode(newUser.getPassword())).build());
        return newUser;
    }
}
