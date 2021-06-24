package de.neuefische.backend.controller;

import de.neuefische.backend.dto.BookingDto;
import de.neuefische.backend.dto.HolidaysDto;
import de.neuefische.backend.model.Booking;
import de.neuefische.backend.model.Holidays;
import de.neuefische.backend.service.HolidaysService;
import org.junit.jupiter.api.Test;

import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.*;

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
        ArrayList<BookingDto> holidaysArrayList = new ArrayList<>();
        holidaysArrayList.add(BookingDto.builder()
                .holidaysName("Sommerferien")
                .startDate(LocalDate.of(2021, 10, 1).toString())
                .endDate(LocalDate.of(2022, 11, 17).toString())
                .build());
        when(holidaysService.getBookedHolidays("testuser"))
                .thenReturn(Booking.builder()
                        .userLogin("testuser")
                        .holidays(holidaysArrayList)
                        .build());

        //WHEN
        Booking booking = holidaysController.getBookedholidays(() -> "testuser");

        //THEN
        assertThat(booking, is(Booking.builder()
                .userLogin("testuser")
                .holidays(holidaysArrayList)
                .build()));
        verify(holidaysService, times(1)).getBookedHolidays("testuser");
    }

    @Test
    void getUpcomingHolidaysShouldReturnHolidaysWhichAreClosestToNow() {
        //GIVEN
        when(holidaysService.getUpcomingHolidays()).thenReturn(Holidays.builder()
                .name("Herbstferien")
                .startDate(LocalDate.of(2021, 4, 1))
                .endDate(LocalDate.of(2022, 5, 17))
                .build());
        //WHEN
        Holidays upcomingHolidays = holidaysController.getUpcomingHolidays();

        //THEN
        assertThat(upcomingHolidays, is(Holidays.builder()
                .name("Herbstferien")
                .startDate(LocalDate.of(2021, 4, 1))
                .endDate(LocalDate.of(2022, 5, 17))
                .build()));
        verify(holidaysService, times(1)).getUpcomingHolidays();
    }

    @Test
    void addBookedHolidaysShouldAddANewEntryToRepositoryIfNoneEntryMatchesGivenUser() {
        ArrayList<BookingDto> holidaysArrayList = new ArrayList<>();
        when(holidaysService.updateBookedHolidays(BookingDto.builder()
                .holidaysName("Sommerferien")
                .startDate(LocalDate.of(2020,1,1))
                .endDate(LocalDate.of(2021,1,1))
                .children(new String[]{"foo"})
                .build(), "testuser"))
                .thenReturn(Booking.builder()
                        .userLogin("testuser")
                        .holidayName("Sommerferien")
                        .startDate(LocalDate.of(2020,1,1))
                        .endDate(LocalDate.of(2021,1,1))
                        .childName("foo")
                        .build());

        //WHEN
        Booking booking = holidaysController.addBookedHolidays(BookingDto.builder()
                .holidaysName("Sommerferien")
                .startDate(LocalDate.of(2020, 1, 1))
                .endDate(LocalDate.of(2021, 1, 1))
                .build(), (() -> "testuser"));

        //THEN
        assertThat(booking, is(Booking.builder()
                .userLogin("testuser")
                .holidayName("Sommerferien")
                .startDate(LocalDate.of(2020,1,1))
                .endDate(LocalDate.of(2021,1,1))
                .childName("foo")
                .build()));
        verify(holidaysService, times(1)).updateBookedHolidays(BookingDto.builder()
                .holidaysName("Sommerferien")
                .startDate(LocalDate.of(2020,1,1))
                .endDate(LocalDate.of(2021,1,1))
                .children(new String[]{"foo"})
                .build(), "testuser");

    }

    @Test
    void updateBookedHolidaysShouldUpdateBookedHolidaysWithSameId(){
        //GIVEN
        ArrayList<BookingDto> holidaysArrayList = new ArrayList<>();
        holidaysArrayList.add(BookingDto.builder()
                .holidaysName("Sommerferien")
                .startDate(LocalDate.of(2021, 10, 1))
                .endDate(LocalDate.of(2022, 11, 17))
                .build());
        when(holidaysService.updateBookedHolidays(BookingDto.builder()
                .holidaysName("Sommerferien")
                .startDate(LocalDate.of(2021, 10, 1))
                .endDate(LocalDate.of(2022, 11, 17))
                .build(),"testuser"))
                .thenReturn(Booking.builder()
                        .userLogin("testuser")
                        .holidays(holidaysArrayList)
                        .build());
        //WHEN
        Booking updatedHolidays = holidaysController.updateBookedHolidays(BookingDto.builder()
                .holidaysName("Sommerferien")
                .startDate(LocalDate.of(2021, 10, 1).toString())
                .endDate(LocalDate.of(2022, 11, 17).toString())
                .build(), ()->"testuser");
        //THEN
        assertThat(updatedHolidays, is(Booking.builder()
                .userLogin("testuser")
                .holidays(holidaysArrayList)
                .build()));
        verify(holidaysService, times(1)).updateBookedHolidays(BookingDto.builder()
                .holidaysName("Sommerferien")
                .startDate(LocalDate.of(2021, 10, 1).toString())
                .endDate(LocalDate.of(2022, 11, 17).toString())
                .build(), "testuser");
    }

    @Test
    void setNewHolidays() {
        HolidaysDto.builder()
                .name("Sommerferien")
                .startDate("2020-01-01")
                .endDate("2021-01-01")
                .build();
        when(holidaysService.addNewHolidays(HolidaysDto.builder()
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
        Holidays newHolidays = holidaysController.addNewHolidays(HolidaysDto.builder()
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
        verify(holidaysService, times(1)).addNewHolidays(HolidaysDto.builder()
                .name("Sommerferien")
                .startDate("2020-01-01")
                .endDate("2021-01-01")
                .build());
    }
}
