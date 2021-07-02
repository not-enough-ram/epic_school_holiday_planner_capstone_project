package de.neuefische.backend.dto;

import de.neuefische.backend.model.Booking;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class BookingByChild {
    private String childName;
    private List<Booking> booking;
}
