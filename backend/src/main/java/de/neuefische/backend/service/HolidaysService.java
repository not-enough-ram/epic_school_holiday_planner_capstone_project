package de.neuefische.backend.service;

import de.neuefische.backend.dto.BookingByChild;
import de.neuefische.backend.dto.BookingDto;
import de.neuefische.backend.model.Booking;
import de.neuefische.backend.model.Child;
import de.neuefische.backend.model.Holidays;
import de.neuefische.backend.repository.BookingRepository;
import de.neuefische.backend.repository.ChildRepository;
import de.neuefische.backend.repository.HolidaysRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class HolidaysService {
    private final HolidaysRepository holidaysRepository;
    private final BookingRepository bookingRepository;
    private final ChildRepository childRepository;
    private final MongoTemplate mongoTemplate;

    @Autowired
    public HolidaysService(HolidaysRepository holidaysRepository, BookingRepository bookingRepository1, ChildRepository childRepository, MongoTemplate mongoTemplate) {
        this.holidaysRepository = holidaysRepository;
        this.bookingRepository = bookingRepository1;
        this.childRepository = childRepository;
        this.mongoTemplate = mongoTemplate;
    }


    public List<Holidays> getListOfHolidays() {
        return holidaysRepository.findAll();
    }

    public Holidays addNewHolidays(Holidays holidays) {
        return holidaysRepository.save(holidays);
    }

    public List<Booking> getBookingsByUser(String login) {
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

    public List<Booking> addBooking(BookingDto dto, String login) {
        List<Booking> bookingList = dto.getSelectedChild().stream()
                .map((child) -> (Booking.builder()
                        .login(login)
                        .holidayName(dto.getHolidayName())
                        .childName(child)
                        .startDate(dto.getStartDate())
                        .endDate(dto.getEndDate())
                        .id(dto.getHolidayName() + child)
                        .build()))
                .collect(Collectors.toList());
        return bookingRepository.saveAll(bookingList);
    }

    public List<BookingByChild> getBookingByChild(String user) {
        List<Child> allUserChildren = childRepository.findAllByLogin(user);
        return allUserChildren.stream().map((child) -> BookingByChild.builder()
                .childName(child.getFirstName())
                .booking(bookingRepository.findAllByChildName(child.getFirstName()))
                .build()).collect(Collectors.toList());
    }

    public List<Child> getChildrenByHolidays(String holiday) {
        List<Booking> bookingList = bookingRepository.findAllByholidayName(holiday);
        return getChildInfosFromRepository(bookingList);
    }

    private List<Child> getChildInfosFromRepository(List<Booking> bookings) {
        return bookings.stream().map((booking) -> (
                childRepository.findByLoginAndFirstName(booking.getLogin(), booking.getChildName())
        )).collect(Collectors.toList());
    }
}
