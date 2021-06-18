package de.neuefische.backend.controller;

import de.neuefische.backend.dto.BookedHolidaysDto;
import de.neuefische.backend.dto.HolidaysDto;
import de.neuefische.backend.model.BookedHolidays;
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

    @GetMapping("booked")
    public BookedHolidays bookedHolidays(Principal principal){
        return holidaysService.getBookedHolidays(principal.getName());
    }

    @PostMapping("booked")
    public BookedHolidays setBookedHolidays(@RequestBody BookedHolidaysDto bookedHolidaysDto, Principal principal){
        return holidaysService.setBookedHolidays(bookedHolidaysDto, principal.getName());
    }

    @PostMapping
    public void setNewHolidays(@RequestBody HolidaysDto holidays){
        holidaysService.setNewHolidays(holidays);
    }
}
