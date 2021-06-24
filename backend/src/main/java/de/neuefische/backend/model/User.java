package de.neuefische.backend.model;

import de.neuefische.backend.security.model.AppUser;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
@Builder
public class User {
    @Id
    private AppUser appUser;
    private String firstName;
    private String lastName;
    private Child[] child;
    private String phone;
    private String notes;
}
