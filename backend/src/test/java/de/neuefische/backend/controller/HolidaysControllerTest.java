package de.neuefische.backend.controller;

import de.neuefische.backend.dto.BookingDto;
import de.neuefische.backend.model.Booking;
import de.neuefische.backend.model.Holidays;
import de.neuefische.backend.service.HolidaysService;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.*;

class HolidaysControllerTest {
    HolidaysService holidaysService = mock(HolidaysService.class);

    @Test
    void holidayListReturnsAListOfAllHolidays() {
        //GIVEN
        when(holidaysService.getListOfHolidays())
                .thenReturn(List.of(
                        Holidays.builder()
                                .name("Sommerferien 2020")
                                .startDate(LocalDate.of(2020, 1, 1))
                                .endDate(LocalDate.of(2021, 1, 1))
                                .build(),
                        Holidays.builder()
                                .name("Sommerferien 2021")
                                .startDate(LocalDate.of(2021, 1, 1))
                                .endDate(LocalDate.of(2022, 1, 1))
                                .build()));

        //WHEN
        List<Holidays> holidaysList = holidaysService.getListOfHolidays();

        //THEN
        assertThat(holidaysList, is(List.of(
                Holidays.builder()
                        .name("Sommerferien 2020")
                        .startDate(LocalDate.of(2020, 1, 1))
                        .endDate(LocalDate.of(2021, 1, 1))
                        .build(),
                Holidays.builder()
                        .name("Sommerferien 2021")
                        .startDate(LocalDate.of(2021, 1, 1))
                        .endDate(LocalDate.of(2022, 1, 1))
                        .build())));
        verify(holidaysService, times(1)).getListOfHolidays();
    }

    @Test
    void getHolidaysByNameReturnsHolidaysWithNameMatchingGivenString() {
        //GIVEN
        when(holidaysService.getHolidaysByName("Sommerferien 2020")).thenReturn(Holidays.builder()
                .name("Sommerferien 2020")
                .startDate(LocalDate.of(2020, 1, 1))
                .endDate(LocalDate.of(2021, 1, 1))
                .build());

        //WHEN
        Holidays holidays = holidaysService.getHolidaysByName("Sommerferien 2020");

        //THEN
        assertThat(holidays, is(Holidays.builder()
                .name("Sommerferien 2020")
                .startDate(LocalDate.of(2020, 1, 1))
                .endDate(LocalDate.of(2021, 1, 1))
                .build()));
        verify(holidaysService, times(1)).getHolidaysByName("Sommerferien 2020");
    }

    @Test
    void getUpcomingHolidaysReturnsFirstHolidaysSortedByStartDate() {
        //GIVEN
        when(holidaysService.getUpcomingHolidays()).thenReturn(List.of(Holidays.builder()
                .name("Sommerferien 2020")
                .startDate(LocalDate.of(2020, 1, 1))
                .endDate(LocalDate.of(2021, 1, 1))
                .build()));

        //WHEN
        List<Holidays> holidaysList = holidaysService.getUpcomingHolidays();

        //THEN
        assertThat(holidaysList, is(List.of(Holidays.builder()
                .name("Sommerferien 2020")
                .startDate(LocalDate.of(2020, 1, 1))
                .endDate(LocalDate.of(2021, 1, 1))
                .build())));
        verify(holidaysService, times(1)).getUpcomingHolidays();
    }

    @Test
    void getBookedholidaysReturnsListOfAllBookedHolidays() {
        //GIVEN
        when(holidaysService.getBookings("foobar"))
                .thenReturn(List.of(
                        Booking.builder()
                                .holidayName("Sommerferien 2020")
                                .childName("baz")
                                .id("bazSommerferien 2020")
                                .startDate(LocalDate.of(2020, 1, 1))
                                .endDate(LocalDate.of(2021, 1, 1))
                                .build()));

        //WHEN
        List<Booking> bookingList = holidaysService.getBookings("foobar");

        //THEN
        assertThat(bookingList, is(List.of(
                Booking.builder()
                        .holidayName("Sommerferien 2020")
                        .childName("baz")
                        .id("bazSommerferien 2020")
                        .startDate(LocalDate.of(2020, 1, 1))
                        .endDate(LocalDate.of(2021, 1, 1))
                        .build())));
        verify(holidaysService, times(1)).getBookings("foobar");
    }

    @Test
    void addBookedHolidaysStoresBookingInDbAndReturnsSavedBooking() {
        when(holidaysService.addBookedHolidays(BookingDto.builder()
                .holidaysName("Sommerferien 2020")
                .children(new String[]{"baz"})
                .startDate(LocalDate.of(2020, 1, 1))
                .endDate(LocalDate.of(2021, 1, 1))
                .build(), "foobar"))
                .thenReturn(List.of(Booking.builder()
                        .holidayName("Sommerferien 2020")
                        .childName("baz")
                        .id("bazSommerferien 2020")
                        .startDate(LocalDate.of(2020, 1, 1))
                        .endDate(LocalDate.of(2021, 1, 1))
                        .build()));
        //WHEN
        List<Booking> bookingList = holidaysService.addBookedHolidays(BookingDto.builder()
                .holidaysName("Sommerferien 2020")
                .children(new String[]{"baz"})
                .startDate(LocalDate.of(2020, 1, 1))
                .endDate(LocalDate.of(2021, 1, 1))
                .build(), "foobar");

        //THEN
        assertThat(bookingList, is(List.of(Booking.builder()
                .holidayName("Sommerferien 2020")
                .childName("baz")
                .id("bazSommerferien 2020")
                .startDate(LocalDate.of(2020, 1, 1))
                .endDate(LocalDate.of(2021, 1, 1))
                .build())));
        verify(holidaysService, times(1)).addBookedHolidays(BookingDto.builder()
                .holidaysName("Sommerferien 2020")
                .children(new String[]{"baz"})
                .startDate(LocalDate.of(2020, 1, 1))
                .endDate(LocalDate.of(2021, 1, 1))
                .build(), "foobar");
    }

    @Test
    void addNewHolidaysSavesNewHolidaysInDbAndReturnsSavedHolidays() {
        //GIVEN
        when(holidaysService.addNewHolidays(Holidays.builder()
                .name("Sommerferien 2020")
                .startDate(LocalDate.of(2020, 1, 1))
                .endDate(LocalDate.of(2021, 1, 1))
                .build()))
                .thenReturn(Holidays.builder()
                        .name("Sommerferien 2020")
                        .startDate(LocalDate.of(2020, 1, 1))
                        .endDate(LocalDate.of(2021, 1, 1))
                        .build());
        //WHEN
        Holidays holidays = holidaysService.addNewHolidays(Holidays.builder()
                .name("Sommerferien 2020")
                .startDate(LocalDate.of(2020, 1, 1))
                .endDate(LocalDate.of(2021, 1, 1))
                .build());
        //THEN
        assertThat(holidays, is(Holidays.builder()
                .name("Sommerferien 2020")
                .startDate(LocalDate.of(2020, 1, 1))
                .endDate(LocalDate.of(2021, 1, 1))
                .build()));
        verify(holidaysService, times(1)).addNewHolidays(Holidays.builder()
                .name("Sommerferien 2020")
                .startDate(LocalDate.of(2020, 1, 1))
                .endDate(LocalDate.of(2021, 1, 1))
                .build());
    }
}