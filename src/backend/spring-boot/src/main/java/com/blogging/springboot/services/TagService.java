package com.blogging.springboot.services;

import com.blogging.springboot.dto.TagRequest;
import com.blogging.springboot.dto.TagResponse;
import com.blogging.springboot.models.Tag;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface TagService {
	List<Tag> index();

	Tag show(Long id);

	Tag create(Tag tag);

	Tag update(Tag tag, Long id);
}
