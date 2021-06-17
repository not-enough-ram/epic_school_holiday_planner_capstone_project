package de.neuefische.backend.service;

import de.neuefische.backend.dto.HolidaysDto;
import de.neuefische.backend.model.BookedHolidays;
import de.neuefische.backend.model.Holidays;
import de.neuefische.backend.repository.BookedHolidaysRepository;
import de.neuefische.backend.repository.HolidaysRepository;
import org.apache.http.HttpException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

@Service
public class HolidaysService {
    private final HolidaysRepository holidaysRepository;
    private final BookedHolidaysRepository bookedHolidaysRepository;

    @Autowired
    public HolidaysService(HolidaysRepository holidaysRepository, BookedHolidaysRepository bookedHolidaysRepository) {
        this.holidaysRepository = holidaysRepository;
        this.bookedHolidaysRepository = bookedHolidaysRepository;
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

    public BookedHolidays getBookedHolidays(String user){
        if (bookedHolidaysRepository.findById(user).isPresent())
            return bookedHolidaysRepository.findById(user).get();
        return null;
    }
}