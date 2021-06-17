package de.neuefische.backend.service;

import de.neuefische.backend.model.Holidays;
import de.neuefische.backend.repository.HolidaysRepository;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.containsInAnyOrder;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class HolidaysServiceTest {

    private final HolidaysRepository holidaysRepository = mock(HolidaysRepository.class);
    private final HolidaysService holidaysService = new HolidaysService(holidaysRepository);


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
}
