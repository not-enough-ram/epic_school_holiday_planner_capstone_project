package de.neuefische.backend.repository;

import de.neuefische.backend.model.User;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface UserRepository extends PagingAndSortingRepository<User, String> {
    List<User> findAll();
}
