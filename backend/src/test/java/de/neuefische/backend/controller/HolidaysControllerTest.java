package de.neuefische.backend.controller;

import de.neuefische.backend.dto.BookedHolidaysDto;
import de.neuefische.backend.dto.HolidaysDto;
import de.neuefische.backend.model.BookedHolidays;
import de.neuefische.backend.model.Holidays;
import de.neuefische.backend.model.User;
import de.neuefische.backend.security.model.AppUser;
import de.neuefische.backend.service.HolidaysService;
import org.junit.jupiter.api.Test;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.containsInAnyOrder;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

class HolidaysControllerTest {
    private final HolidaysService holidaysService = mock(HolidaysService.class);
    private final HolidaysController holidaysController = new HolidaysController(holidaysService);

    @Test
    void getListOfHolidaysShouldReturnAListOfAllHolidays() {
        //GIVEN
        List<Holidays> holidays = List.of(
                Holidays.builder()
                        .name("Sommerferien")
                        .startDate(LocalDate.of(2021, 10, 1))
                        .endDate(LocalDate.of(2022, 11, 17))
                        .build(),
                Holidays.builder()
                        .name("Herbstferien")
                        .startDate(LocalDate.of(2021, 4, 1))
                        .endDate(LocalDate.of(2022, 5, 17))
                        .build());
        when(holidaysService.getListOfHolidays()).thenReturn(holidays);

        //WHEN
        List<Holidays> listOfHolidays = holidaysController.holidayList();

        //THEN
        assertThat(listOfHolidays, containsInAnyOrder(Holidays.builder()
                        .name("Sommerferien")
                        .startDate(LocalDate.of(2021, 10, 1))
                        .endDate(LocalDate.of(2022, 11, 17))
                        .build(),
                Holidays.builder()
                        .name("Herbstferien")
                        .startDate(LocalDate.of(2021, 4, 1))
                        .endDate(LocalDate.of(2022, 5, 17))
                        .build()));

        verify(holidaysService, times(1)).getListOfHolidays();
    }

    @Test
    void getHolidaysByNameShouldReturnHolidaysWithMatchingName() {
        //GIVEN
        when(holidaysService.getHolidaysByName("Sommerferien")).thenReturn(Holidays.builder()
                .name("Sommerferien")
                .startDate(LocalDate.of(2021, 10, 1))
                .endDate(LocalDate.of(2022, 11, 17))
                .build());

        //WHEN
        Holidays holidays = holidaysController.getHolidaysByName("Sommerferien");

        //THEN
        assertThat(holidays, is(Holidays.builder()
                        .name("Sommerferien")
                        .startDate(LocalDate.of(2021, 10, 1))
                        .endDate(LocalDate.of(2022, 11, 17))
                        .build()));
        verify(holidaysService, times(1)).getHolidaysByName("Sommerferien");

    }

    @Test
    void getBookedHolidays() {
        //GIVEN
        ArrayList<Holidays> holidaysArrayList = new ArrayList<>();
        holidaysArrayList.add(Holidays.builder()
                .name("Sommerferien")
                .startDate(LocalDate.of(2021, 10, 1))
                .endDate(LocalDate.of(2022, 11, 17))
                .build());
        when(holidaysService.getBookedHolidays("testuser"))
                .thenReturn(BookedHolidays.builder()
                        .user(User.builder()
                                .appUser(AppUser.builder()
                                        .username("testuser")
                                        .password("")
                                        .build())
                                .build())
                        .holidays(holidaysArrayList)
                        .build());

        //WHEN
        BookedHolidays bookedHolidays = holidaysController.getBookedholidays(() -> "testuser");

        //THEN
        assertThat(bookedHolidays, is(BookedHolidays.builder()
                .user(User.builder()
                        .appUser(AppUser.builder()
                                .username("testuser")
                                .password("")
                                .build())
                        .build())
                .holidays(holidaysArrayList)
                .build()));
        verify(holidaysService, times(1)).getBookedHolidays("testuser");
    }

    @Test
    void setBookedHolidaysShouldAddANewEntryToRepositoryIfNoneEntryMatchesGivenUser() {
        ArrayList<Holidays> holidaysArrayList = new ArrayList<>();
        when(holidaysService.setBookedHolidays(BookedHolidaysDto.builder()
                .holidaysName("Sommerferien")
                .startDateBooking("2020-01-01")
                .endDateBooking("2021-01-01")
                .build(), "testuser"))
                .thenReturn(BookedHolidays.builder()
                        .user(User.builder()
                                .appUser(AppUser.builder()
                                        .username("testuser")
                                        .password("")
                                        .build())
                                .build())
                        .holidays(holidaysArrayList)
                        .build());

        //WHEN
        BookedHolidays bookedHolidays = holidaysController.setBookedHolidays(BookedHolidaysDto.builder()
                .holidaysName("Sommerferien")
                .startDateBooking("2020-01-01")
                .endDateBooking("2021-01-01")
                .build(), (() -> "testuser"));

        //THEN
        assertThat(bookedHolidays, is(BookedHolidays.builder()
                .user(User.builder()
                        .appUser(AppUser.builder()
                                .username("testuser")
                                .password("")
                                .build())
                        .build())
                .holidays(holidaysArrayList)
                .build()));
        verify(holidaysService,times(1)).setBookedHolidays(BookedHolidaysDto.builder()
                .holidaysName("Sommerferien")
                .startDateBooking("2020-01-01")
                .endDateBooking("2021-01-01")
                .build(), "testuser");

    }

    @Test
    void setNewHolidays() {
        HolidaysDto.builder()
                .name("Sommerferien")
                .startDate("2020-01-01")
                .endDate("2021-01-01")
                .build();
        when(holidaysService.setNewHolidays(HolidaysDto.builder()
                    .name("Sommerferien")
                    .startDate("2020-01-01")
                    .endDate("2021-01-01")
                    .build()))
                .thenReturn(Holidays.builder()
                    .name("Sommerferien")
                    .startDate(LocalDate.of(2020, 1,1))
                    .endDate(LocalDate.of(2021, 1,1))
                    .build());

        //WHEN
        Holidays newHolidays = holidaysController.setNewHolidays(HolidaysDto.builder()
                .name("Sommerferien")
                .startDate("2020-01-01")
                .endDate("2021-01-01")
                .build());

        //THEN
        assertThat(newHolidays, is(Holidays.builder()
                .name("Sommerferien")
                .startDate(LocalDate.of(2020, 1,1))
                .endDate(LocalDate.of(2021, 1,1))
                .build()));
        verify(holidaysService, times(1)).setNewHolidays(HolidaysDto.builder()
                .name("Sommerferien")
                .startDate("2020-01-01")
                .endDate("2021-01-01")
                .build());
    }
}
