package com.blogging.springboot.services;

import com.blogging.springboot.exceptions.NotFoundException;
import com.blogging.springboot.models.Reaction;
import com.blogging.springboot.repositories.ReactionRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReactionServiceImpl implements  ReactionService {

	private final ReactionRepository reactionRepo;

	public ReactionServiceImpl(ReactionRepository reactionRepo) {
		this.reactionRepo = reactionRepo;
	}

	@Override
	public List<Reaction> index() {
		return reactionRepo.findAll();
	}

	@Override
	public Reaction show(Long id) {
		return reactionRepo.findById(id).orElseThrow(
						() -> new NotFoundException("Reaction", id));
	}

	@Override
	public Reaction create(Reaction reaction) {
		return reactionRepo.save(reaction);
	}

	@Override
	public Reaction update(Reaction reaction, Long id) {
		reactionRepo.findById(id).orElseThrow(
						() -> new NotFoundException("Reaction", id));
		reaction.setId(id);
		return reactionRepo.save(reaction);
	}

	@Override
	public ResponseEntity<?> delete(Long id) {
		Reaction reaction = reactionRepo.findById(id).orElseThrow(
						() -> new NotFoundException("Reaction", id));
		reactionRepo.delete(reaction);
		return ResponseEntity.noContent().build();
	}
}
