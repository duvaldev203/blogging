package com.blogging.springboot.repositories;

import com.blogging.springboot.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
}
