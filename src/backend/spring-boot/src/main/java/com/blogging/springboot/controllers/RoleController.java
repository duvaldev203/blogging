package com.blogging.springboot.controllers;

import com.blogging.springboot.dto.RoleRequest;
import com.blogging.springboot.dto.RoleResponse;
import com.blogging.springboot.models.Role;
import com.blogging.springboot.services.RoleService;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/roles")
public class RoleController {

	private final ModelMapper modelMapper;

	private final RoleService roleService;

	@Autowired
	public RoleController (ModelMapper modelMapper, RoleService roleService){
		this.modelMapper = modelMapper;
		this.roleService = roleService;
	}

	@GetMapping
	ResponseEntity<List<RoleResponse>> index(){
		List<RoleResponse> roles = roleService.index().stream().map(
						el -> modelMapper.map(el, RoleResponse.class)).toList();
		return new ResponseEntity<>(roles, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	ResponseEntity<RoleResponse> show(@PathVariable Long id){
		RoleResponse role = modelMapper.map(roleService.show(id), RoleResponse.class);
		return new ResponseEntity<>(role, HttpStatus.FOUND);
	}

	@PostMapping
	ResponseEntity<RoleResponse> create(@RequestBody @Valid RoleRequest role){
		Role req = modelMapper.map(role, Role.class);
		RoleResponse resp = modelMapper.map(roleService.create(req), RoleResponse.class);
		return new ResponseEntity<>(resp, HttpStatus.CREATED);
	}

	@PutMapping("/{id}")
	ResponseEntity<RoleResponse> update(@PathVariable Long id, @RequestBody @Valid RoleRequest role){
		Role req = modelMapper.map(role, Role.class);
		RoleResponse resp = modelMapper.map(roleService.update(req, id), RoleResponse.class);
		return new ResponseEntity<>(resp, HttpStatus.ACCEPTED);
	}

	@DeleteMapping("/{id}")
	ResponseEntity<?> delete(@PathVariable Long id){
		return roleService.delete(id);
	}
}
