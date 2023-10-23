package com.blogging.springboot.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRequest {
	private String firstName;

	private String lastName;

	private String email;

	private String password;

	private String phone;

	private List<RoleResponse> roles;

	private ProfileResponse profile;
}
