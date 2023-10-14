package com.blogging.springboot.repositories;

import com.blogging.springboot.models.Media;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MediaRepository extends JpaRepository<Media, Long> {
}
