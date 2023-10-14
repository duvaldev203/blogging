package com.blogging.springboot.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ArticleResponse {
	private Long id;

	private String title;

	private String cover;

	private String content;

	private int totalViews;

	private int readingTime;

	private UserResponse user;

	private CategoryResponse category;

	private List<TagResponse> tags;

	private Timestamp createdAt;

	private Timestamp updatedAt;
}
