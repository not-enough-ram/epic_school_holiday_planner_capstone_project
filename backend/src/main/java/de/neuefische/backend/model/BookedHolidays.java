package de.neuefische.backend.model;

import de.neuefische.backend.dto.BookedHolidaysDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "booked_holidays")
public class BookedHolidays {

    private String childName;
    private String userLogin;
    @Id
    private String id = childName + userLogin;
    private ArrayList<BookedHolidaysDto> holidays;

    public void addBookedHolidaysToArray(BookedHolidaysDto bookedHolidaysDto) {
        holidays.add(bookedHolidaysDto);
    }

}
