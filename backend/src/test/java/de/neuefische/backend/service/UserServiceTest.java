package de.neuefische.backend.service;

import de.neuefische.backend.dto.AppUserDto;
import de.neuefische.backend.model.User;
import de.neuefische.backend.repository.ChildRepository;
import de.neuefische.backend.repository.UserRepository;
import de.neuefische.backend.security.model.AppUser;
import de.neuefische.backend.security.model.Role;
import de.neuefische.backend.security.repository.AppUserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.*;

class UserServiceTest {
    AppUserRepository appUserRepository = mock(AppUserRepository.class);
    PasswordEncoder encoder = mock(PasswordEncoder.class);
    UserRepository userRepository = mock(UserRepository.class);
    ChildRepository childRepository = mock(ChildRepository.class);
    MongoTemplate mongoTemplate = mock(MongoTemplate.class);
    UserService userService = new UserService(appUserRepository, encoder, userRepository, childRepository, mongoTemplate);

    @Test
    void addNewAppUser() {
        //GIVEN
        when(encoder.encode("fooobaaar")).thenReturn("fooobaaar");
        when(appUserRepository.save(AppUser.builder()
                .username("foo")
                .password("fooobaaar")
                .role(Role.USER)
                .build()))
                .thenReturn(AppUser.builder()
                        .username("foo")
                        .password("fooobaaar")
                        .role(Role.USER)
                        .build());
        //WHEN
        AppUser appUser = userService.addNewAppUser(AppUserDto.builder()
                .login("foo")
                .password("fooobaaar")
                .role("user")
                .build());
        //THEN
        assertThat(appUser, is(AppUser.builder()
                .username("foo")
                .password("fooobaaar")
                .role(Role.USER)
                .build()));
        verify(appUserRepository, times(1)).save(AppUser.builder()
                .username("foo")
                .password("fooobaaar")
                .role(Role.USER)
                .build());
        verify(encoder, times(1)).encode("fooobaaar");
    }

    @Test
    void getUser() {
        //GIVEN
        when(userRepository.findById("foobar"))
                .thenReturn(Optional.of(
                        User.builder()
                                .login("foobar")
                                .firstName("Jim")
                                .lastName("Carrey")
                                .phone("123123")
                                .notes("Ace Ventura!")
                                .build()));
        //WHEN
        User user = userService.getUserById("foobar");

        //THEN
        assertThat(user, is(User.builder()
                .login("foobar")
                .firstName("Jim")
                .lastName("Carrey")
                .phone("123123")
                .notes("Ace Ventura!")
                .build()));
        verify(userRepository, times(2)).findById("foobar");
    }

    @Test
    void updateUser() {
    }

    @Test
    void addNewUser() {
    }

    @Test
    void addChild() {
    }

    @Test
    void getChildByUser() {
    }

    @Test
    void getAllAppUsers() {
    }
}