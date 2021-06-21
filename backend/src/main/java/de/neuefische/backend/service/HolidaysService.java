package de.neuefische.backend.service;

import de.neuefische.backend.dto.BookedHolidaysDto;
import de.neuefische.backend.dto.HolidaysDto;
import de.neuefische.backend.model.BookedHolidays;
import de.neuefische.backend.model.Holidays;
import de.neuefische.backend.model.User;
import de.neuefische.backend.repository.BookedHolidaysRepository;
import de.neuefische.backend.repository.HolidaysRepository;
import de.neuefische.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@Service
public class HolidaysService {
    private final HolidaysRepository holidaysRepository;
    private final BookedHolidaysRepository bookedHolidaysRepository;
    private final UserRepository userRepository;

    @Autowired
    public HolidaysService(HolidaysRepository holidaysRepository, BookedHolidaysRepository bookedHolidaysRepository, UserRepository userRepository) {
        this.holidaysRepository = holidaysRepository;
        this.bookedHolidaysRepository = bookedHolidaysRepository;
        this.userRepository = userRepository;
    }


    public List<Holidays> getListOfHolidays() {
        return holidaysRepository.findAll();
    }

    public Holidays setNewHolidays(HolidaysDto holidays) {
        Holidays addHolidays = holidaysDtoToHolidaysDatabaseModel(holidays);
        return holidaysRepository.save(addHolidays);
    }

    public Holidays holidaysDtoToHolidaysDatabaseModel(HolidaysDto holidaysDto) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        formatter = formatter.withLocale(Locale.GERMAN);
        LocalDate startDate = LocalDate.parse(holidaysDto.getStartDate(), formatter);
        LocalDate endDate = LocalDate.parse(holidaysDto.getEndDate(), formatter);
        return Holidays.builder().name(holidaysDto.getName()).startDate(startDate).endDate(endDate).build();
    }

    public BookedHolidays getBookedHolidays(String user){
        if (bookedHolidaysRepository.findById(user).isPresent()){
            return bookedHolidaysRepository.findById(user).get();}
        return null;
    }

    public BookedHolidays setBookedHolidays(BookedHolidaysDto bookedHolidaysDto, String user) {
        if (bookedHolidaysRepository.findById(user).isPresent()){
            return bookedHolidaysRepository.save(dtoTobookedHolidays(bookedHolidaysDto, user));
        }
        else{
            return bookedHolidaysRepository.save(dtoTobookedHolidays(bookedHolidaysDto, user));}
    }

    public BookedHolidays dtoTobookedHolidays(BookedHolidaysDto dto, String user){
        ArrayList<Holidays> holidayList = new ArrayList<Holidays>();
        if(holidaysRepository.findById(dto.getHolidaysName()).isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Holidays not fount");
        }
        LocalDate startDate = holidaysRepository.findById(dto.getHolidaysName()).get().getStartDate();
        LocalDate endDate = holidaysRepository.findById(dto.getHolidaysName()).get().getEndDate();
        if(userRepository.findById(user).isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not fount");
        }
        User bookingUser = userRepository.findById(user).get();
        holidayList.add(Holidays.builder().name(dto.getHolidaysName()).startDate(startDate).endDate(endDate).build());
        return BookedHolidays.builder().holidays(holidayList).userLogin(bookingUser.getAppUser().getUsername()).build();
    }

    public Holidays getHolidaysByName(String name) {
        if (holidaysRepository.findById(name).isPresent()) {
            return holidaysRepository.findById(name).get();
        }
        else
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Holidays not found");
    }
}