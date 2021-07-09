package de.neuefische.backend.service;

import de.neuefische.backend.dto.AppUserDto;
import de.neuefische.backend.dto.ChildDto;
import de.neuefische.backend.dto.UserDto;
import de.neuefische.backend.model.Child;
import de.neuefische.backend.model.User;
import de.neuefische.backend.repository.ChildRepository;
import de.neuefische.backend.repository.UserRepository;
import de.neuefische.backend.security.model.AppUser;
import de.neuefische.backend.security.model.Role;
import de.neuefische.backend.security.repository.AppUserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
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
        //GIVEN
        when(userRepository.save(User.builder()
                .login("foobar")
                .firstName("Jim")
                .lastName("Carrey")
                .phone("123123")
                .notes("Ace Ventura!")
                .build()))
                .thenReturn(User.builder()
                        .login("foobar")
                        .firstName("Jim")
                        .lastName("Carrey")
                        .phone("123123")
                        .notes("Ace Ventura!")
                        .build());
        when(userRepository.findById("foobar")).thenReturn(Optional.of(User.builder()
                .login("foobar")
                .firstName("John")
                .lastName("Carrey")
                .phone("999999")
                .notes("Ace Ventura!")
                .build()));

        //WHEN
        User user = userService.updateUser(UserDto.builder()
                .firstName("Jim")
                .lastName("")
                .phone("123123")
                .notes("")
                .build(), "foobar");

        //THEN
        assertThat(user, is(User.builder()
                .login("foobar")
                .firstName("Jim")
                .lastName("Carrey")
                .phone("123123")
                .notes("Ace Ventura!")
                .build()));
        verify(userRepository, times(2)).findById("foobar");
        verify(userRepository, times(1)).save(User.builder()
                .login("foobar")
                .firstName("Jim")
                .lastName("Carrey")
                .phone("123123")
                .notes("Ace Ventura!")
                .build());

    }

    @Test
    void addNewUser() {
        //GIVEN
        when(userRepository.save(User.builder()
                .login("foobar")
                .firstName("Jim")
                .lastName("Carrey")
                .phone("123123")
                .notes("Ace Ventura!")
                .build()))
                .thenReturn(User.builder()
                        .login("foobar")
                        .firstName("Jim")
                        .lastName("Carrey")
                        .phone("123123")
                        .notes("Ace Ventura!")
                        .build());

        //WHEN
        User user = userService.addNewUser(User.builder()
                .login("foobar")
                .firstName("Jim")
                .lastName("Carrey")
                .phone("123123")
                .notes("Ace Ventura!")
                .build());

        //THEN
        assertThat(user, is(User.builder()
                .login("foobar")
                .firstName("Jim")
                .lastName("Carrey")
                .phone("123123")
                .notes("Ace Ventura!")
                .build()));
        verify(userRepository, times(1)).save(User.builder()
                .login("foobar")
                .firstName("Jim")
                .lastName("Carrey")
                .phone("123123")
                .notes("Ace Ventura!")
                .build());
    }

    @Test
    void addChild() {
        when(childRepository.save(Child.builder()
                .login("foobar")
                .firstName("Rick")
                .lastName("Astley")
                .schoolClass("1a")
                .notes("Never gonna give you up")
                .id("foobarRick")
                .build()))
                .thenReturn(Child.builder()
                        .login("foobar")
                        .firstName("Rick")
                        .lastName("Astley")
                        .schoolClass("1a")
                        .notes("Never gonna give you up")
                        .id("foobarRick")
                        .build());

        //WHEN
        Child child = userService.addChild(ChildDto.builder()
                .firstName("Rick")
                .lastName("Astley")
                .schoolClass("1a")
                .notes("Never gonna give you up")
                .build(), "foobar");

        //THEN
        assertThat(child, is(Child.builder()
                .login("foobar")
                .firstName("Rick")
                .lastName("Astley")
                .schoolClass("1a")
                .notes("Never gonna give you up")
                .id("foobarRick")
                .build()));
        verify(childRepository, times(1)).save(Child.builder()
                .login("foobar")
                .firstName("Rick")
                .lastName("Astley")
                .schoolClass("1a")
                .notes("Never gonna give you up")
                .id("foobarRick")
                .build());
    }

    @Test
    void getChildByUser() {
        //GIVEN
        String login = "foobar";
        Query query = new Query()
                .addCriteria(Criteria.where("login").is(login));
        when(mongoTemplate.find(query, Child.class)).thenReturn(List.of(
                Child.builder()
                        .login("foobar")
                        .firstName("Rick")
                        .lastName("Astley")
                        .schoolClass("1a")
                        .notes("Never gonna give you up")
                        .id("foobarRick")
                        .build()));
        //WHEN
        List<Child> childList = userService.getChildByUser("foobar");

        //THEN
        assertThat(childList, is(List.of(
                Child.builder()
                        .login("foobar")
                        .firstName("Rick")
                        .lastName("Astley")
                        .schoolClass("1a")
                        .notes("Never gonna give you up")
                        .id("foobarRick")
                        .build())));
        verify(mongoTemplate, times(1)).find(query, Child.class);
    }

    @Test
    void getAllAppUsers() {
        //GIVEN
        when(appUserRepository.findById("foobar"))
                .thenReturn(Optional.of(
                        AppUser.builder()
                                .username("foobar")
                                .password("encrypted password")
                                .role(Role.ADMIN)
                                .build()));
        when(appUserRepository.findAll()).thenReturn(List.of(
                AppUser.builder()
                        .username("foobar")
                        .password("encrypted password")
                        .role(Role.ADMIN)
                        .build(),
                AppUser.builder()
                        .username("baz")
                        .password("encrypted password")
                        .role(Role.USER)
                        .build()));
        //WHEN
        List<AppUser> appUserList = userService.getAllAppUsers("foobar");

        //THEN
        assertThat(appUserList, is(List.of(
                AppUser.builder()
                        .username("foobar")
                        .password("encrypted password")
                        .role(Role.ADMIN)
                        .build(),
                AppUser.builder()
                        .username("baz")
                        .password("encrypted password")
                        .role(Role.USER)
                        .build())));
        verify(appUserRepository, times(2)).findById("foobar");
        verify(appUserRepository, times(1)).findAll();

    }
}