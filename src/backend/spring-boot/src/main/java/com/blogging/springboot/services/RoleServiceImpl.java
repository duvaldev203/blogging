package com.blogging.springboot.services;

import com.blogging.springboot.models.Role;
import com.blogging.springboot.repositories.RoleRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleServiceImpl implements  RoleService {

	private final RoleRepository roleRepo;

	public RoleServiceImpl(RoleRepository roleRepo) {
		this.roleRepo = roleRepo;
	}

	@Override
	public List<Role> index() {
		return roleRepo.findAll();
	}

	@Override
	public Role show(Long id) {
		return roleRepo.findById(id).orElseThrow(
						() -> new EntityNotFoundException("Not Found !!!"));
	}

	@Override
	public Role create(Role role) {
		return roleRepo.save(role);
	}

	@Override
	public Role update(Role role, Long id) {
		roleRepo.findById(id).orElseThrow(
						() -> new EntityNotFoundException(String.format("Le role d'id %d n'a pas ete trouve", id)));
		role.setId(id);
		return roleRepo.save(role);
	}

	@Override
	public ResponseEntity<?> delete(Long id) {
		Role role = roleRepo.findById(id).orElseThrow(
						() -> new EntityNotFoundException(String.format("Le role d'id %d n'a pas ete trouve", id)));
		roleRepo.delete(role);
		return ResponseEntity.noContent().build();
	}
}
