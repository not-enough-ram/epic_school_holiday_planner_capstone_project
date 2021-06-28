package de.neuefische.backend.repository;

import de.neuefische.backend.model.Child;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ChildRepository extends MongoRepository<Child, String> {
}
