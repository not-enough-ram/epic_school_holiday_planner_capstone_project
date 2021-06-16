package de.neuefische.backend.controller;

import de.neuefische.backend.dto.HolidaysDto;
import de.neuefische.backend.model.Holidays;
import de.neuefische.backend.service.HolidaysService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/test/holidays")


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

    @PostMapping
    public void setNewHolidays(@RequestBody HolidaysDto holidays){
        holidaysService.setNewHolidays(holidays);
    }
}
