package de.neuefische.backend.controller;

import de.neuefische.backend.dto.AppUserDto;
import de.neuefische.backend.dto.ChildDto;
import de.neuefische.backend.dto.UserDto;
import de.neuefische.backend.model.Child;
import de.neuefische.backend.model.User;
import de.neuefische.backend.security.model.AppUser;
import de.neuefische.backend.security.model.Role;
import de.neuefische.backend.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.*;

class UserControllerTest {
    UserService userService = mock(UserService.class);
    UserController userController = new UserController(userService);
    BCryptPasswordEncoder encoder = mock(BCryptPasswordEncoder.class);

    @Test
    void addNewAppUser() {
        // GIVEN
        when(userService.addNewAppUser(AppUserDto.builder()
                .login("foobar")
                .password("fooobaaar")
                .role("user")
                .build()))
                .thenReturn(AppUser.builder()
                        .username("foobar")
                        .password("encoded password")
                        .role(Role.USER)
                        .build());
        //WHEN
        AppUser appUser = userController.addNewAppUser(AppUserDto.builder()
                .login("foobar")
                .password("fooobaaar")
                .role("user")
                .build());

        //THEN
        assertThat(appUser, is(AppUser.builder()
                .username("foobar")
                .password("encoded password")
                .role(Role.USER)
                .build()));
        verify(userService, times(1)).addNewAppUser(AppUserDto.builder()
                .login("foobar")
                .password("fooobaaar")
                .role("user")
                .build());
    }

    @Test
    void updateUser() {
        //GIVEN
        when(userService.updateUser(UserDto.builder()
                .firstName("Lars")
                .lastName("")
                .phone("123123")
                .notes("")
                .build(), "foobar"))
                .thenReturn(User.builder()
                        .login("foobar")
                        .firstName("Lars")
                        .lastName("Eisbär")
                        .phone("123123")
                        .notes("Hallo Welt")
                        .build());
        //WHEN
        User user = userController.updateUser(UserDto.builder()
                .firstName("Lars")
                .lastName("")
                .phone("123123")
                .notes("")
                .build(), () -> "foobar");
        //THEN
        assertThat(user, is(User.builder()
                .login("foobar")
                .firstName("Lars")
                .lastName("Eisbär")
                .phone("123123")
                .notes("Hallo Welt")
                .build()));
        verify(userService, times(1)).updateUser(UserDto.builder()
                .firstName("Lars")
                .lastName("")
                .phone("123123")
                .notes("")
                .build(), "foobar");
    }

    @Test
    void testAddNewUser() {
        //GIVEN
        when(userService.addNewUser(User.builder()
                .login("foobar")
                .firstName("Doug")
                .lastName("Heffernan")
                .phone("123123")
                .notes("Arthur Arthur Arthur").build()))
                .thenReturn(User.builder()
                        .login("foobar")
                        .firstName("Doug")
                        .lastName("Heffernan")
                        .phone("123123")
                        .notes("Arthur Arthur Arthur")
                        .build());
        //WHEN
        User user = userController.addNewUser(User.builder()
                .login("foobar")
                .firstName("Doug")
                .lastName("Heffernan")
                .phone("123123")
                .notes("Arthur Arthur Arthur").build());

        //THEN
        assertThat(user, is(User.builder()
                .login("foobar")
                .firstName("Doug")
                .lastName("Heffernan")
                .phone("123123")
                .notes("Arthur Arthur Arthur").build()));
        verify(userService, times(1)).addNewUser(User.builder()
                .login("foobar")
                .firstName("Doug")
                .lastName("Heffernan")
                .phone("123123")
                .notes("Arthur Arthur Arthur").build());
    }

    @Test
    void getChildByUser() {
        when(userService.getChildByUser("foobar")).thenReturn(List.of(
                Child.builder()
                        .login("foobar")
                        .firstName("foo")
                        .lastName("bar")
                        .schoolClass("1a")
                        .build()));
        //WHEN
        List<Child> childList = userController.getChildByUser(() -> "foobar");

        //THEN
        assertThat(childList, is(List.of(
                Child.builder()
                        .login("foobar")
                        .firstName("foo")
                        .lastName("bar")
                        .schoolClass("1a")
                        .build())));
        verify(userService, times(1)).getChildByUser("foobar");
    }

    @Test
    void addChildren() {
        //GIVEN
        when(userService.addChild(ChildDto.builder()
                .firstName("Foo")
                .lastName("Bar")
                .schoolClass("1a")
                .notes("Otter")
                .build(), "Foobar"))
                .thenReturn(Child.builder()
                        .login("Foobar")
                        .firstName("Foo")
                        .lastName("Bar")
                        .schoolClass("1a")
                        .notes("Otter")
                        .build());
        //WHEN
        Child child = userController.addChildren(ChildDto.builder()
                .firstName("Foo")
                .lastName("Bar")
                .schoolClass("1a")
                .notes("Otter")
                .build(), () -> "Foobar");

        //THEN
        assertThat(child, is(Child.builder()
                .login("Foobar")
                .firstName("Foo")
                .lastName("Bar")
                .schoolClass("1a")
                .notes("Otter")
                .build()));
        verify(userService, times(1)).addChild(ChildDto.builder()
                .firstName("Foo")
                .lastName("Bar")
                .schoolClass("1a")
                .notes("Otter")
                .build(), "Foobar");
    }

    @Test
    void getUser() {
        //GIVEN
        when(userService.getUser("foobar")).thenReturn(User.builder()
                .login("foobar")
                .firstName("Jeffrey")
                .lastName("Lebowski")
                .phone("1234")
                .notes("White Russian")
                .build());
        //WHEN
        User user = userController.getUser(() -> "foobar");

        //THEN
        assertThat(user, is(User.builder()
                .login("foobar")
                .firstName("Jeffrey")
                .lastName("Lebowski")
                .phone("1234")
                .notes("White Russian")
                .build()));
        verify(userService, times(1)).getUser("foobar");
    }

    @Test
    void getAllAppUsers() {
        //GIVEN
        when(userService.getAllAppUsers("foobar"))
                .thenReturn(List.of(
                        AppUser.builder()
                                .username("foobar")
                                .password("encrypted password")
                                .role(Role.ADMIN)
                                .build(),
                        AppUser.builder()
                                .username("foobar")
                                .password("encrypted password")
                                .role(Role.ADMIN)
                                .build()));
        //WHEN
        List<AppUser> appUserList = userController.getAllAppUsers(() -> "foobar");

        //THEN
        assertThat(appUserList, is(List.of(
                AppUser.builder()
                        .username("foobar")
                        .password("encrypted password")
                        .role(Role.ADMIN)
                        .build(),
                AppUser.builder()
                        .username("foobar")
                        .password("encrypted password")
                        .role(Role.ADMIN)
                        .build())));
        verify(userService, times(1)).getAllAppUsers("foobar");
    }
}