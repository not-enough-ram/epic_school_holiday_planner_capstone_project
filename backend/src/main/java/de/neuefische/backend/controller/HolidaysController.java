package de.neuefische.backend.controller;

import de.neuefische.backend.dto.BookingByChild;
import de.neuefische.backend.dto.BookingDto;
import de.neuefische.backend.model.Booking;
import de.neuefische.backend.model.Holidays;
import de.neuefische.backend.service.HolidaysService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("api/holidays")
public class HolidaysController {

    private final HolidaysService holidaysService;

    @Autowired
    public HolidaysController(HolidaysService holidaysService) {
        this.holidaysService = holidaysService;
    }

    @GetMapping
    public List<Holidays> holidayList() {
        return holidaysService.getListOfHolidays();
    }

    @GetMapping("details/{name}")
    public Holidays getHolidaysByName(@PathVariable String name) {
        return holidaysService.getHolidaysByName(name);
    }

    @GetMapping("upcoming")
    public List<Holidays> getUpcomingHolidays() {
        return holidaysService.getUpcomingHolidays();
    }

    @GetMapping("booked")
    public List<Booking> getBookedholidays(Principal principal) {
        return holidaysService.getBookings(principal.getName());
    }

    @GetMapping("bookingbychild")
    public List<BookingByChild> getBookingByChild(Principal user) {
        return holidaysService.getBookingByChild(user.getName());
    }

    @PostMapping("booked")
    public List<Booking> addBookedHolidays(@RequestBody BookingDto bookingDto, Principal principal) {
        return holidaysService.addBookedHolidays(bookingDto, principal.getName());
    }

    @PostMapping
    public Holidays addNewHolidays(@RequestBody Holidays holidays) {
        return holidaysService.addNewHolidays(holidays);
    }
}
