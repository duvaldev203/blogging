package com.blogging.springboot.services;

import com.blogging.springboot.exceptions.NotFoundException;
import com.blogging.springboot.models.Tag;
import com.blogging.springboot.repositories.TagRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TagServiceImpl implements  TagService {

	private final TagRepository tagRepo;

	public TagServiceImpl(TagRepository tagRepo) {
		this.tagRepo = tagRepo;
	}

	@Override
	public List<Tag> index() {
		return tagRepo.findAll();
	}

	@Override
	public Tag show(Long id) {
		return tagRepo.findById(id).orElseThrow(
						() -> new NotFoundException("Tag", id));
	}

	@Override
	public Tag create(Tag tag) {
		return tagRepo.save(tag);
	}

	@Override
	public Tag update(Tag tag, Long id) {
		tagRepo.findById(id).orElseThrow(
						() -> new NotFoundException("Tag", id));
		tag.setId(id);
		return tagRepo.save(tag);
	}

	@Override
	public List<Tag> records(String keywords) {
		return tagRepo.findByNameContaining(keywords);
	}

}
