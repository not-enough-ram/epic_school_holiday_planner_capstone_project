package de.neuefische.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "booked_holidays")
public class Booking {

    private String childName;
    private String login;
    private String holidayName;
    private LocalDate startDate;
    private LocalDate endDate;
    @Id
    private String id;

}
