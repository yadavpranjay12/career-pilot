package com.careerpilot.auth.repository;

import com.careerpilot.auth.domain.User;
import com.careerpilot.auth.domain.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}
