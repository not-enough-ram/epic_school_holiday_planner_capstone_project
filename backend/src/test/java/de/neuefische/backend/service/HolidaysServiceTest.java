package de.neuefische.backend.service;

import de.neuefische.backend.dto.BookingDto;
import de.neuefische.backend.dto.HolidaysDto;
import de.neuefische.backend.model.Booking;
import de.neuefische.backend.model.Holidays;
import de.neuefische.backend.model.User;
import de.neuefische.backend.repository.BookedHolidaysRepository;
import de.neuefische.backend.repository.HolidaysRepository;
import de.neuefische.backend.repository.UserRepository;
import de.neuefische.backend.security.model.AppUser;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.containsInAnyOrder;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.*;

class HolidaysServiceTest {

    private final HolidaysRepository holidaysRepository = mock(HolidaysRepository.class);
    private final BookedHolidaysRepository bookedHolidaysRepository = mock(BookedHolidaysRepository.class);
    private final UserRepository userRepository = mock(UserRepository.class);
    private final HolidaysService holidaysService = new HolidaysService(holidaysRepository, bookedHolidaysRepository, userRepository);


    @Test
    void getListOfHolidaysShouldReturnAListOfAllHolidaysInRepository() {
        //GIVEN
        when(holidaysRepository.findAll()).thenReturn(List.of(Holidays.builder()
                        .name("Sommerferien")
                        .startDate(LocalDate.of(2021, 10, 1))
                        .endDate(LocalDate.of(2022, 11, 17))
                        .build(),
                Holidays.builder()
                        .name("Herbstferien")
                        .startDate(LocalDate.of(2021, 4, 1))
                        .endDate(LocalDate.of(2022, 5, 17))
                        .build()));

        //WHEN
        List<Holidays> holidays = holidaysService.getListOfHolidays();

        //THEN
        assertThat(holidays, containsInAnyOrder(Holidays.builder()
                        .name("Sommerferien")
                        .startDate(LocalDate.of(2021, 10, 1))
                        .endDate(LocalDate.of(2022, 11, 17))
                        .build(),
                Holidays.builder()
                        .name("Herbstferien")
                        .startDate(LocalDate.of(2021, 4, 1))
                        .endDate(LocalDate.of(2022, 5, 17))
                        .build()));
    
    }

    @Test
    void setNewHolidays() {
        //GIVEN
        when(holidaysRepository.save(Holidays.builder()
                .name("Sommerferien")
                .startDate(LocalDate.of(2021, 10, 1))
                .endDate(LocalDate.of(2022, 11, 17))
                .build())).thenReturn(Holidays.builder()
                .name("Sommerferien")
                .startDate(LocalDate.of(2021, 10, 1))
                .endDate(LocalDate.of(2022, 11, 17))
                .build());

        //WHEN
        Holidays newHolidays = holidaysService.addNewHolidays(HolidaysDto.builder()
                .name("Sommerferien")
                .startDate("2021-10-01")
                .endDate("2022-11-17")
                .build());
        //THEN
        assertThat(newHolidays, is(Holidays.builder()
                .name("Sommerferien")
                .startDate(LocalDate.of(2021, 10, 1))
                .endDate(LocalDate.of(2022, 11, 17))
                .build()));
        verify(holidaysRepository, times(1)).save(Holidays.builder()
                .name("Sommerferien")
                .startDate(LocalDate.of(2021, 10, 1))
                .endDate(LocalDate.of(2022, 11, 17))
                .build());
    }

    @Test
    void dtoToHolidaysObjectShouldConvertHolidaysDtoToHolidayObject() {
        //GIVEN
        HolidaysDto holidaysDto = HolidaysDto.builder()
                .name("Sommerferien")
                .startDate("2021-10-01")
                .endDate("2022-11-17")
                .build();

        //WHEN
        Holidays holidays = holidaysService.holidaysDtoToHolidaysDatabaseModel(holidaysDto);

        //THEN
        assertThat(holidays, is(Holidays.builder()
                .name("Sommerferien")
                .startDate(LocalDate.of(2021, 10, 1))
                .endDate(LocalDate.of(2022, 11, 17))
                .build()));

    }

    @Test
    void getBookedHolidaysShouldReturnBookedHolidaysForGivenUser() {
        //GIVEN
        ArrayList<BookingDto> holidaysArrayList = new ArrayList<>();
        holidaysArrayList.add(BookingDto.builder()
                .holidaysName("Sommerferien")
                .startDate(LocalDate.of(2020, 1, 1).toString())
                .endDate(LocalDate.of(2021, 1, 17).toString())
                .build());

        when(bookedHolidaysRepository.findById("testuser")).thenReturn(Optional.of(Booking.builder()
                .userLogin("testuser")
                .holidays(holidaysArrayList)
                .build()));

        //WHEN
        Booking booking = holidaysService.getBookedHolidays("testuser");

        //THEN
        assertThat(booking, is(Booking.builder()
                .userLogin("testuser")
                .holidays(holidaysArrayList)
                .build()));
        verify(bookedHolidaysRepository, times(2)).findById("testuser");
    }

    @Test
    void setBookedHolidays() {
        //GIVEN
        ArrayList<BookingDto> holidaysArrayList = new ArrayList<>();
        holidaysArrayList.add(BookingDto.builder()
                .holidaysName("Sommerferien")
                .startDate(LocalDate.of(2020, 1, 1).toString())
                .endDate(LocalDate.of(2021, 1, 17).toString())
                .build());
        when(bookedHolidaysRepository.save(Booking.builder()
                .userLogin("testuser")
                .holidays(holidaysArrayList)
                .build())).thenReturn(Booking.builder()
                .userLogin("testuser")
                .holidays(holidaysArrayList)
                .build());
        when(holidaysRepository.findById("Sommerferien")).thenReturn(Optional.of(Holidays.builder()
                .name("Sommerferien")
                .startDate(LocalDate.of(2020, 1, 1))
                .endDate(LocalDate.of(2021, 1, 17))
                .build()));
        when(userRepository.findById("testuser")).thenReturn(Optional.of(User.builder()
                .appUser(AppUser.builder()
                        .username("testuser")
                        .password("")
                        .build())
                .build()));

        //WHEN
        Booking booking = holidaysService.updateBookedHolidays(BookingDto.builder()
                .holidaysName("Sommerferien")
                .startDate("2020-01-01")
                .endDate("2021-01-01")
                .build(), "testuser");
        //THEN
        assertThat(booking, is(Booking.builder()
                .userLogin("testuser")
                .holidays(holidaysArrayList)
                .build()));
    }

    @Test
    void dtoTobookedHolidaysShouldConvertDtoToDatabaseObject() {
        //GIVEN
        when(holidaysRepository.findById("Sommerferien")).thenReturn(Optional.of(Holidays.builder()
                .name("Sommerferien")
                .startDate(LocalDate.of(2020, 1, 1))
                .endDate(LocalDate.of(2021, 1, 17))
                .build()));
        when(userRepository.findById("testuser")).thenReturn(Optional.of(User.builder()
                .appUser(AppUser.builder()
                        .username("testuser")
                        .password("")
                        .build())
                .build()));
        BookingDto bookingDto = BookingDto.builder()
                .holidaysName("Sommerferien")
                .startDate("2020-01-01")
                .endDate("2021-01-01")
                .build();
        ArrayList<BookingDto> holidaysArrayList = new ArrayList<>();
        holidaysArrayList.add(BookingDto.builder()
                .holidaysName("Sommerferien")
                .startDate(LocalDate.of(2020, 1, 1).toString())
                .endDate(LocalDate.of(2021, 1, 17).toString())
                .build());

        //WHEN
        Booking booking = holidaysService.dtoTobookedHolidays(bookingDto, "testuser");

        //THEN
        assertThat(booking, is(Booking.builder()
                .userLogin("testuser")
                .holidays(holidaysArrayList)
                .build()));
    }

    @Test
    void getHolidaysByName() {
        //GIVEN
        when(holidaysRepository.findById("Sommerferien")).thenReturn(Optional.of(Holidays.builder()
                .name("Sommerferien")
                .startDate(LocalDate.of(2020, 1, 1))
                .endDate(LocalDate.of(2021, 1, 17))
                .build()));
        //WHEN
        Holidays holidays = holidaysService.getHolidaysByName("Sommerferien");

        //THEN
        assertThat(holidays, is(Holidays.builder()
                .name("Sommerferien")
                .startDate(LocalDate.of(2020, 1, 1))
                .endDate(LocalDate.of(2021, 1, 17))
                .build()));
        verify(holidaysRepository, times(1)).findById("Sommerferien");
    }
}
