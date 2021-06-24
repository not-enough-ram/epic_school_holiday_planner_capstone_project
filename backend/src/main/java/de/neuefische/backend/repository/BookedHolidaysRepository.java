package de.neuefische.backend.repository;

import de.neuefische.backend.model.Booking;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookedHolidaysRepository extends PagingAndSortingRepository<Booking, String> {
    List<Booking> findAll();


}
