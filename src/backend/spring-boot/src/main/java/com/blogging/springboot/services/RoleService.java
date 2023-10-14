package com.blogging.springboot.services;

import com.blogging.springboot.dto.RoleRequest;
import com.blogging.springboot.dto.RoleResponse;
import com.blogging.springboot.models.Role;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface RoleService {

	List<Role> index();

	Role show(Long id);

	Role create(Role role);

	Role update(Role role, Long id);
	
	ResponseEntity<?> delete(Long id);
}
