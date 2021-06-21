package de.neuefische.backend.model;

import de.neuefische.backend.dto.BookedHolidaysDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "booked_holidays")
public class BookedHolidays {

    @Id
    private String childName;
    private String userLogin;
    private ArrayList<BookedHolidaysDto> holidays;

    public List<BookedHolidaysDto> addBookedHolidaysToArray(BookedHolidaysDto bookedHolidaysDto) {
        holidays.add(bookedHolidaysDto);
        return holidays;
    }

}
