package com.blogging.springboot.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
	private Long id;

	private String firstName;

	private String lastName;

	private String email;

	private String password;

	private String phone;

	private List<RoleResponse> roles;

	private Timestamp createdAt;

	private Timestamp updatedAt;
}
