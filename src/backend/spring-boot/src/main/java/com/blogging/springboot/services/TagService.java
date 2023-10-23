package com.blogging.springboot.services;

import com.blogging.springboot.models.Tag;

import java.util.List;

public interface TagService {
	List<Tag> index();

	Tag show(Long id);

	Tag create(Tag tag);

	Tag update(Tag tag, Long id);

	List<Tag> records(String keywords);
}
