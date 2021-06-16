package de.neuefische.backend.security.model;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "appusers")
public class AppUser {

    @Id
    private String username;
    private String password;
}
