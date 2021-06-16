package de.neuefische.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HolidaysDto {

    @NotNull(message = "name cannot be null")
    @NotBlank(message = "name cannot be blank")
    @Length(max = 40, message = "max length for name is 40 characters")
    private String name;

    @NotNull(message = "start date cannot be null")
    private String startDate;

    @NotNull(message = "end date cannot be null")
    private String endDate;
}
