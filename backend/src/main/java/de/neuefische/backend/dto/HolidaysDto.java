package de.neuefische.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HolidaysDto {
    private String name;
    private String startDate;
    private String endDate;
}
