package de.neuefische.backend.controller;

import de.neuefische.backend.model.Holidays;
import de.neuefische.backend.service.HolidaysService;
import org.junit.jupiter.api.Test;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.containsInAnyOrder;
import static org.mockito.Mockito.*;

import java.time.LocalDate;
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
}
