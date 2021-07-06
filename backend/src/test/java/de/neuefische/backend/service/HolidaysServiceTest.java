package de.neuefische.backend.service;

import de.neuefische.backend.model.Booking;
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
        List<Holidays> holidaysList = holidaysRepository.findAll();

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
    void addNewHolidays() {
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
        Holidays holidays = holidaysRepository.save(Holidays.builder()
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
    void getBookings() {
        //GIVEN
        when(bookingRepository.findAll()).thenReturn(List.of(
                Booking.builder()
                        .holidayName("Sommerferien 2020")
                        .childName("baz")
                        .id("bazSommerferien 2020")
                        .startDate(LocalDate.of(2020, 1, 1))
                        .endDate(LocalDate.of(2021, 1, 1))
                        .build()));
        //WHEN
        List<Booking> bookingList = bookingRepository.findAll();

        //THEN
        assertThat(bookingList, is(List.of(
                Booking.builder()
                        .holidayName("Sommerferien 2020")
                        .childName("baz")
                        .id("bazSommerferien 2020")
                        .startDate(LocalDate.of(2020, 1, 1))
                        .endDate(LocalDate.of(2021, 1, 1))
                        .build())));
        verify(bookingRepository, times(1)).findAll();
    }

    @Test
    void getHolidaysByName() {
        //GIVEN
        when(holidaysRepository.findById("Sommerferien 2020")).thenReturn(Optional.of(Holidays.builder()
                .name("Sommerferien 2020")
                .startDate(LocalDate.of(2020, 1, 1))
                .endDate(LocalDate.of(2021, 1, 1))
                .build()));
        //WHEN
        Optional<Holidays> holidays = holidaysRepository.findById("Sommerferien 2020");

        //THEN
        assertThat(holidays, is(Optional.of(Holidays.builder()
                .name("Sommerferien 2020")
                .startDate(LocalDate.of(2020, 1, 1))
                .endDate(LocalDate.of(2021, 1, 1))
                .build())));
        verify(holidaysRepository, times(1)).findById("Sommerferien 2020");
    }

    @Test
    void getUpcomingHolidays() {
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
    void addBookedHolidays() {
        //GIVEN
        when(bookingRepository.save(Booking.builder()
                .holidayName("Sommerferien 2020")
                .childName("baz")
                .id("bazSommerferien 2020")
                .startDate(LocalDate.of(2020, 1, 1))
                .endDate(LocalDate.of(2021, 1, 1))
                .build()))
                .thenReturn(Booking.builder()
                        .holidayName("Sommerferien 2020")
                        .childName("baz")
                        .id("bazSommerferien 2020")
                        .startDate(LocalDate.of(2020, 1, 1))
                        .endDate(LocalDate.of(2021, 1, 1))
                        .build());
        //WHEN
        Booking booking = bookingRepository.save(Booking.builder()
                .holidayName("Sommerferien 2020")
                .childName("baz")
                .id("bazSommerferien 2020")
                .startDate(LocalDate.of(2020, 1, 1))
                .endDate(LocalDate.of(2021, 1, 1))
                .build());

        //THEN
        assertThat(booking, is(Booking.builder()
                .holidayName("Sommerferien 2020")
                .childName("baz")
                .id("bazSommerferien 2020")
                .startDate(LocalDate.of(2020, 1, 1))
                .endDate(LocalDate.of(2021, 1, 1))
                .build()));
        verify(bookingRepository, times(1)).save(Booking.builder()
                .holidayName("Sommerferien 2020")
                .childName("baz")
                .id("bazSommerferien 2020")
                .startDate(LocalDate.of(2020, 1, 1))
                .endDate(LocalDate.of(2021, 1, 1))
                .build());
    }
}