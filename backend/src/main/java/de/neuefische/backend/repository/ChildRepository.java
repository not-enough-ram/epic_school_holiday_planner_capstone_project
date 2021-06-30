package de.neuefische.backend.repository;

import de.neuefische.backend.model.Child;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ChildRepository extends MongoRepository<Child, String> {
    List<Child> findAllByLogin(String login);
}
