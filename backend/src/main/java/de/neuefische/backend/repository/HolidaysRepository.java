package de.neuefische.backend.repository;

import de.neuefische.backend.model.Holidays;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HolidaysRepository extends PagingAndSortingRepository<Holidays, String> {
    List<Holidays> findAll();

    void clearAll();
}
