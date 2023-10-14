package com.blogging.springboot.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MediaResponse {
	private Long id;

	private String title;

	private String description;

	private String type;

	private String url;

	private Timestamp createdAt;

	private Timestamp updatedAt;
}
