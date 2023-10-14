package com.blogging.springboot.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoleResponse {
	private Long id;

	private String name;

	private String description;

	private Timestamp createdAt;

	private Timestamp updatedAt;
}
