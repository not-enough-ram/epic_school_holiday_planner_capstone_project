package de.neuefische.backend.controller;

import de.neuefische.backend.dto.BookingByChild;
import de.neuefische.backend.dto.BookingDto;
import de.neuefische.backend.model.Booking;
import de.neuefische.backend.model.Child;
import de.neuefische.backend.model.Holidays;
import de.neuefische.backend.service.HolidaysService;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.*;

class HolidaysControllerTest {
    HolidaysService holidaysService = mock(HolidaysService.class);
    HolidaysController holidaysController = new HolidaysController(holidaysService);

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
        List<Holidays> holidaysList = holidaysController.getListOfHolidays();

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
        Holidays holidays = holidaysController.getHolidaysByName("Sommerferien 2020");

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
        List<Holidays> holidaysList = holidaysController.getUpcomingHolidays();

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
        when(holidaysService.getBookingsByUser("foobar"))
                .thenReturn(List.of(
                        Booking.builder()
                                .holidayName("Sommerferien 2020")
                                .childName("baz")
                                .id("bazSommerferien 2020")
                                .startDate(LocalDate.of(2020, 1, 1))
                                .endDate(LocalDate.of(2021, 1, 1))
                                .build()));

        //WHEN
        List<Booking> bookingList = holidaysController.getBookingsByUser(() -> "foobar");

        //THEN
        assertThat(bookingList, is(List.of(
                Booking.builder()
                        .holidayName("Sommerferien 2020")
                        .childName("baz")
                        .id("bazSommerferien 2020")
                        .startDate(LocalDate.of(2020, 1, 1))
                        .endDate(LocalDate.of(2021, 1, 1))
                        .build())));
        verify(holidaysService, times(1)).getBookingsByUser("foobar");
    }

    @Test
    void addBookedHolidaysStoresBookingInDbAndReturnsSavedBooking() {
        when(holidaysService.addBooking(BookingDto.builder()
                .holidayName("Sommerferien 2020")
                .selectedChild(List.of("baz"))
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
        List<Booking> bookingList = holidaysController.addBookedHolidays(BookingDto.builder()
                .holidayName("Sommerferien 2020")
                .selectedChild(List.of("baz"))
                .startDate(LocalDate.of(2020, 1, 1))
                .endDate(LocalDate.of(2021, 1, 1))
                .build(), () -> "foobar");

        //THEN
        assertThat(bookingList, is(List.of(Booking.builder()
                .holidayName("Sommerferien 2020")
                .childName("baz")
                .id("bazSommerferien 2020")
                .startDate(LocalDate.of(2020, 1, 1))
                .endDate(LocalDate.of(2021, 1, 1))
                .build())));
        verify(holidaysService, times(1)).addBooking(BookingDto.builder()
                .holidayName("Sommerferien 2020")
                .selectedChild(List.of("baz"))
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
        Holidays holidays = holidaysController.addNewHolidays(Holidays.builder()
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

    @Test
    void getBookingByChildReturnsBookingsForAllChildaOfLoggedInUser() {
        //GIVEN
        when(holidaysService.getBookingByChild("foobar")).thenReturn(List.of(
                BookingByChild.builder()
                        .childName("Foo")
                        .booking(List.of(
                                Booking.builder()
                                        .childName("Foo")
                                        .holidayName("Sommerferien")
                                        .startDate(LocalDate.of(2021, 1, 1))
                                        .endDate(LocalDate.of(2022, 1, 1))
                                        .build()
                        )).build()));

        //WHEN
        List<BookingByChild> bookingByChild = holidaysController.getBookingByChild(() -> "foobar");

        //THEN
        assertThat(bookingByChild, is(List.of(
                BookingByChild.builder()
                        .childName("Foo")
                        .booking(List.of(
                                Booking.builder()
                                        .childName("Foo")
                                        .holidayName("Sommerferien")
                                        .startDate(LocalDate.of(2021, 1, 1))
                                        .endDate(LocalDate.of(2022, 1, 1))
                                        .build()
                        )).build())));
        verify(holidaysService, times(1)).getBookingByChild("foobar");
    }

    @Test
    void getChildrenByHolidaysReturnsListOfAllChildrenVisitingGivenHolidays() {
        //GIVEN
        when(holidaysService.getChildrenByHolidays("Sommerferien")).thenReturn(List.of(
                Child.builder()
                        .firstName("Foo")
                        .lastName("Bar")
                        .schoolClass("2a")
                        .notes("Hates insects")
                        .id("42")
                        .build()));
        //WHEN
        List<Child> childList = holidaysController.getChildrenByHolidays("Sommerferien");

        //THEN
        assertThat(childList, is(List.of(
                Child.builder()
                        .firstName("Foo")
                        .lastName("Bar")
                        .schoolClass("2a")
                        .notes("Hates insects")
                        .id("42")
                        .build())));
        verify(holidaysService, times(1)).getChildrenByHolidays("Sommerferien");
    }
}