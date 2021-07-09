package de.neuefische.backend.service;

import de.neuefische.backend.dto.BookingByChild;
import de.neuefische.backend.dto.BookingDto;
import de.neuefische.backend.model.Booking;
import de.neuefische.backend.model.Child;
import de.neuefische.backend.model.Holidays;
import de.neuefische.backend.repository.BookingRepository;
import de.neuefische.backend.repository.ChildRepository;
import de.neuefische.backend.repository.HolidaysRepository;
import org.junit.jupiter.api.Test;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.*;

class HolidaysServiceTest {
    HolidaysRepository holidaysRepository = mock(HolidaysRepository.class);
    BookingRepository bookingRepository = mock(BookingRepository.class);
    ChildRepository childRepository = mock(ChildRepository.class);
    MongoTemplate mongoTemplate = mock(MongoTemplate.class);
    HolidaysService holidaysService = new HolidaysService(holidaysRepository, bookingRepository, childRepository, mongoTemplate);

    @Test
    void getListOfHolidaysReturnsAListOfAllHolidays() {
        //GIVEN
        when(holidaysRepository.findAll()).thenReturn(List.of(Holidays.builder()
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

        assertThat(holidaysList, is(List.of(Holidays.builder()
                        .name("Sommerferien 2020")
                        .startDate(LocalDate.of(2020, 1, 1))
                        .endDate(LocalDate.of(2021, 1, 1))
                        .build(),
                Holidays.builder()
                        .name("Sommerferien 2021")
                        .startDate(LocalDate.of(2021, 1, 1))
                        .endDate(LocalDate.of(2022, 1, 1))
                        .build())));
        verify(holidaysRepository, times(1)).findAll();
    }

    @Test
    void addNewHolidaysAddsNewHolidaysToDatabase() {
        //GIVEN
        when(holidaysRepository.save(Holidays.builder()
                .name("Sommerferien 2020")
                .startDate(LocalDate.of(2020, 1, 1))
                .endDate(LocalDate.of(2021, 1, 1))
                .build())).thenReturn(Holidays.builder()
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
        verify(holidaysRepository, times(1)).save(Holidays.builder()
                .name("Sommerferien 2020")
                .startDate(LocalDate.of(2020, 1, 1))
                .endDate(LocalDate.of(2021, 1, 1))
                .build());
    }

    @Test
    void getBookingsReturnsAllBookingsForLoggedInUser() {
        //GIVEN
        when(bookingRepository.findBylogin("foobar")).thenReturn(List.of(
                Booking.builder()
                        .holidayName("Sommerferien 2020")
                        .childName("baz")
                        .id("bazSommerferien 2020")
                        .startDate(LocalDate.of(2020, 1, 1))
                        .endDate(LocalDate.of(2021, 1, 1))
                        .build()));
        //WHEN
        List<Booking> bookingList = holidaysService.getBookingsByUser("foobar");

        //THEN
        assertThat(bookingList, is(List.of(
                Booking.builder()
                        .holidayName("Sommerferien 2020")
                        .childName("baz")
                        .id("bazSommerferien 2020")
                        .startDate(LocalDate.of(2020, 1, 1))
                        .endDate(LocalDate.of(2021, 1, 1))
                        .build())));
        verify(bookingRepository, times(1)).findBylogin("foobar");
    }

    @Test
    void getHolidaysByNameReturnsHolidaysWithMatchingName() {
        //GIVEN
        when(holidaysRepository.findById("Sommerferien 2020")).thenReturn(Optional.of(Holidays.builder()
                .name("Sommerferien 2020")
                .startDate(LocalDate.of(2020, 1, 1))
                .endDate(LocalDate.of(2021, 1, 1))
                .build()));
        //WHEN
        Holidays holidays = holidaysService.getHolidaysByName("Sommerferien 2020");

        //THEN
        assertThat(holidays, is(Holidays.builder()
                .name("Sommerferien 2020")
                .startDate(LocalDate.of(2020, 1, 1))
                .endDate(LocalDate.of(2021, 1, 1))
                .build()));
        verify(holidaysRepository, times(1)).findById("Sommerferien 2020");
    }

    @Test
    void getUpcomingHolidaysReturnsArrayWithOneElementContainingUpcomingHolidaysFromNow() {
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
        verify(mongoTemplate, times(1)).find(new Query()
                .addCriteria(Criteria.where("name").exists(true))
                .with(Sort.by(Sort.Order.asc("startDate")))
                .limit(1), Holidays.class);
    }

    @Test
    void addBookedHolidaysReturnsNewBookingObjectAndSavesItInDatabase() {
        //GIVEN
        when(bookingRepository.saveAll(List.of(Booking.builder()
                .holidayName("Sommerferien 2020")
                .login("foobar")
                .childName("baz")
                .startDate(LocalDate.of(2020, 1, 1))
                .endDate(LocalDate.of(2021, 1, 1))
                .build())))
                .thenReturn(List.of(Booking.builder()
                        .holidayName("Sommerferien 2020")
                        .login("foobar")
                        .childName("baz")
                        .startDate(LocalDate.of(2020, 1, 1))
                        .endDate(LocalDate.of(2021, 1, 1))
                        .build()));
        //WHEN
        List<Booking> bookingList = holidaysService.addBooking(BookingDto.builder()
                .holidayName("Sommerferien 2020")
                .selectedChild(List.of("baz"))
                .startDate(LocalDate.of(2020, 1, 1))
                .endDate(LocalDate.of(2021, 1, 1))
                .build(), "foobar");

        //THEN
        assertThat(bookingList, is(List.of(Booking.builder()
                .holidayName("Sommerferien 2020")
                .login("foobar")
                .childName("baz")
                .startDate(LocalDate.of(2020, 1, 1))
                .endDate(LocalDate.of(2021, 1, 1))
                .build())));
        verify(bookingRepository, times(1)).saveAll(List.of(Booking.builder()
                .holidayName("Sommerferien 2020")
                .login("foobar")
                .childName("baz")
                .startDate(LocalDate.of(2020, 1, 1))
                .endDate(LocalDate.of(2021, 1, 1))
                .build()));
    }

    @Test
    void getBookingByChildReturnsAllBookingsForAllChildsOfLoggedInUser() {
        when(childRepository.findAllByLogin("foobar")).thenReturn(List.of(
                Child.builder()
                        .firstName("Foo")
                        .lastName("Bar")
                        .schoolClass("2a")
                        .notes("Hates insects")
                        .id("42")
                        .build()));
        when(bookingRepository.findAllByChildName("Foo")).thenReturn(List.of(
                Booking.builder()
                        .childName("Foo")
                        .startDate(LocalDate.of(2021, 1, 1))
                        .endDate(LocalDate.of(2022, 1, 1))
                        .id("Bar")
                        .build()));
        //WHEN
        List<BookingByChild> bookingByChildList = holidaysService.getBookingByChild("foobar");

        //THEN
        assertThat(bookingByChildList, is(List.of(
                BookingByChild.builder()
                        .childName("Foo")
                        .booking(List.of(
                                Booking.builder()
                                        .childName("Foo")
                                        .startDate(LocalDate.of(2021, 1, 1))
                                        .endDate(LocalDate.of(2022, 1, 1))
                                        .id("Bar")
                                        .build()))
                        .build())));
        verify(childRepository, times(1)).findAllByLogin("foobar");
        verify(bookingRepository, times(1)).findAllByChildName("Foo");

    }

    @Test
    void getChildrenByHolidays() {
        //GIVEN
        when(bookingRepository.findAllByholidayName("Sommerferien")).thenReturn(List.of(
                Booking.builder()
                        .login("foobar")
                        .childName("baz")
                        .holidayName("Sommerferien")
                        .build(),
                Booking.builder()
                        .login("foobar")
                        .childName("omega")
                        .holidayName("Sommerferien")
                        .build()));
        when(childRepository.findByLoginAndFirstName("foobar", "baz")).thenReturn(
                Child.builder().firstName("baz").lastName("super").login("foobar").build());
        when(childRepository.findByLoginAndFirstName("foobar", "omega")).thenReturn(
                Child.builder().firstName("omega").lastName("super").login("foobar").build());

        //WHEN
        List<Child> childList = holidaysService.getChildrenByHolidays("Sommerferien");

        //THEN
        assertThat(childList, is(List.of(
                Child.builder()
                        .firstName("baz")
                        .lastName("super")
                        .login("foobar")
                        .build(),
                Child.builder()
                        .firstName("omega")
                        .lastName("super")
                        .login("foobar")
                        .build())));
        verify(bookingRepository, times(1)).findAllByholidayName("Sommerferien");
        verify(childRepository, times(1)).findByLoginAndFirstName("foobar", "baz");
        verify(childRepository, times(1)).findByLoginAndFirstName("foobar", "omega");
    }
}