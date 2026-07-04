package com.careerpilot.auth.repository;

import com.careerpilot.auth.domain.Role;
import com.careerpilot.auth.domain.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleName name);
}
