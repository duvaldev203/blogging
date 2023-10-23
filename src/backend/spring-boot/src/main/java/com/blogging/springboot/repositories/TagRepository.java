package com.blogging.springboot.repositories;

import com.blogging.springboot.models.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TagRepository extends JpaRepository<Tag, Long> {
	List<Tag> findByNameContaining(String keywords);
}
