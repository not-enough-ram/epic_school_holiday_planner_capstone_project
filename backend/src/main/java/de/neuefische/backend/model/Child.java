package de.neuefische.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Child {
    private String login;
    private String firstName;
    private String lastName;
    private String schoolClass;
    private String notes;
}
