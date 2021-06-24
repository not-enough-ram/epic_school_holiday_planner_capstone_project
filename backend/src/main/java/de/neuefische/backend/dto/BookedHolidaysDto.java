package de.neuefische.backend.dto;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookedHolidaysDto {

    @JsonProperty("checked")
    private String[] children;

    @JsonProperty("holidaysselectmenu")
    private String holidaysName;

    @JsonProperty("startDate")
    private String startDateBooking;

    @JsonProperty("endDate")
    private String endDateBooking;

}
