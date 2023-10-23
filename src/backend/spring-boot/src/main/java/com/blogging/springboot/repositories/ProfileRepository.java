package com.blogging.springboot.repositories;

import com.blogging.springboot.models.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
}
