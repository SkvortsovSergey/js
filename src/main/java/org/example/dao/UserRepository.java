package org.example.dao;

import org.example.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    @Query
            ("SELECT u FROM User u JOIN FETCH u.roles WHERE u.username = (:username)")
    User findByName (String username);
}
