package de.neuefische.backend.service;

import de.neuefische.backend.dto.BookingDto;
import de.neuefische.backend.model.Booking;
import de.neuefische.backend.model.Holidays;
import de.neuefische.backend.repository.BookingRepository;
import de.neuefische.backend.repository.HolidaysRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class HolidaysService {
    private final HolidaysRepository holidaysRepository;
    private final BookingRepository bookingRepository;
    private final MongoTemplate mongoTemplate;

    @Autowired
    public HolidaysService(HolidaysRepository holidaysRepository, BookingRepository bookingRepository1, MongoTemplate mongoTemplate) {
        this.holidaysRepository = holidaysRepository;
        this.bookingRepository = bookingRepository1;
        this.mongoTemplate = mongoTemplate;
    }


    public List<Holidays> getListOfHolidays() {
        return holidaysRepository.findAll();
    }

    public Holidays addNewHolidays(Holidays holidays) {
        return holidaysRepository.save(holidays);
    }

    public List<Booking> getBookings(String login) {
        return bookingRepository.findBylogin(login);
    }

    public Holidays getHolidaysByName(String name) {
        return holidaysRepository.findById(name).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Holidays not found"));
    }

    public List<Holidays> getUpcomingHolidays() {
        Query query = new Query()
                .addCriteria(Criteria.where("name").exists(true))
                .with(Sort.by(Sort.Order.asc("startDate")))
                .limit(1);

        return mongoTemplate.find(query, Holidays.class);
    }

    public List<Booking> addBookedHolidays(BookingDto dto, String login) {
        List<Booking> bookingList = Arrays.stream(dto.getChildren())
                .map((child) -> (Booking.builder()
                        .login(login)
                        .holidayName(dto.getHolidaysName())
                        .childName(child)
                        .startDate(dto.getStartDate())
                        .endDate(dto.getEndDate())
                        .build()))
                .collect(Collectors.toList());
        return bookingRepository.saveAll(bookingList);
    }
}
