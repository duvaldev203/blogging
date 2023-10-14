package com.blogging.springboot.services;

import com.blogging.springboot.dto.ReactionRequest;
import com.blogging.springboot.dto.ReactionResponse;
import com.blogging.springboot.models.Reaction;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ReactionService {
	List<Reaction> index();

	Reaction show(Long id);

	Reaction create(Reaction reaction);

	Reaction update(Reaction reaction, Long id);

	ResponseEntity<?> delete(Long id);
}
