package de.neuefische.backend.repository;

import de.neuefische.backend.model.Booking;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends MongoRepository<Booking, String> {
    List<Booking> findAll();

    List<Booking> findBylogin(String login);

    List<Booking> findAllByChildName(String childName);
}
