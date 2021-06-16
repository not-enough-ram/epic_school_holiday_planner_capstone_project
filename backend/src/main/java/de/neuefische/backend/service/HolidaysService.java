package de.neuefische.backend.service;

import de.neuefische.backend.dto.HolidaysDto;
import de.neuefische.backend.model.Holidays;
import de.neuefische.backend.repository.HolidaysRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;

@Service
public class HolidaysService {
    private final HolidaysRepository holidaysRepository;

    @Autowired
    public HolidaysService(HolidaysRepository holidaysRepository) {
        this.holidaysRepository = holidaysRepository;
    }


    public List<Holidays> getListOfHolidays() {
        return holidaysRepository.findAll();
    }

    public void setNewHolidays(HolidaysDto holidays) {
        Holidays addHolidays = dtoToHolidaysObject(holidays);
        holidaysRepository.save(addHolidays);
    }

    public Holidays dtoToHolidaysObject(HolidaysDto holidaysDto){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        formatter = formatter.withLocale(Locale.GERMAN );
        LocalDate startDate = LocalDate.parse(holidaysDto.getStartDate(), formatter);
        LocalDate endDate = LocalDate.parse(holidaysDto.getEndDate(), formatter);
        return Holidays.builder().name(holidaysDto.getName()).startDate(startDate).endDate(endDate).build();
    }
}