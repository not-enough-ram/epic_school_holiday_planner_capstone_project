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
import java.util.Collections;
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

    public Holidays addNewHolidays(HolidaysDto holidays) {
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

    public BookedHolidays updateBookedHolidays(BookedHolidaysDto bookedHolidaysDto, String user) {
        if (bookedHolidaysRepository.findById(user).isPresent()) {
            BookedHolidays bookedHolidays = bookedHolidaysRepository.findById(user).get();
            bookedHolidays.addBookedHolidaysToArray(bookedHolidaysDto);
            return bookedHolidaysRepository.save(bookedHolidays);
        } else {
            return bookedHolidaysRepository.save(dtoTobookedHolidays(bookedHolidaysDto, user));
        }
    }

    public BookedHolidays dtoTobookedHolidays(BookedHolidaysDto dto, String user){
        ArrayList<BookedHolidaysDto> holidayList = new ArrayList<BookedHolidaysDto>();
        if(holidaysRepository.findById(dto.getHolidaysName()).isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Holidays not found");
        }
        LocalDate startDate = holidaysRepository.findById(dto.getHolidaysName()).get().getStartDate();
        LocalDate endDate = holidaysRepository.findById(dto.getHolidaysName()).get().getEndDate();
        if(userRepository.findById(user).isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
        User bookingUser = userRepository.findById(user).get();
        holidayList.add(BookedHolidaysDto.builder().holidaysName(dto.getHolidaysName()).startDateBooking(startDate.toString()).endDateBooking(endDate.toString()).build());
        return BookedHolidays.builder().holidays(holidayList).userLogin(bookingUser.getAppUser().getUsername()).build();
    }

    public Holidays getHolidaysByName(String name) {
        return holidaysRepository.findById(name).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Holidays not found"));
    }

    public Holidays getUpcomingHolidays() {
        List<Holidays> holidayList = getListOfHolidays();
        return sortHolidaysByStartDate(holidayList).iterator().next();
    }

    public List<Holidays> sortHolidaysByStartDate(List<Holidays> holidaysList){
        Collections.sort(holidaysList, (h1, h2) -> {
            if (h1.getStartDate().isBefore(h2.getStartDate())) return -1;
            else return 1;
        });
        return holidaysList;
    }
}
