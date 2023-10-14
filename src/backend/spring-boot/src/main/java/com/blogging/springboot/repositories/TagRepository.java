package com.blogging.springboot.repositories;

import com.blogging.springboot.models.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag, Long> {
}
