package com.blogging.springboot.models;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;
import java.util.List;

@Data
@Entity
@Table(name = "articles")
public class Article {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String title;

	private String cover;

	private String content;

	private int totalViews;

	private int readingTime;

	@ManyToOne
	private User user;

	@ManyToOne
	private Category category;

	@OneToMany(mappedBy = "article", fetch = FetchType.EAGER)
	private List<Reaction> reactions;

	@OneToMany(mappedBy = "article", fetch = FetchType.EAGER)
	private List<Comment> comments;

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "article_tag",
					joinColumns = @JoinColumn(name = "article_id"),
					inverseJoinColumns = @JoinColumn(name = "tag_id")
	)
	private List<Tag> tags;

	@CreationTimestamp
	@Column(name = "created_at", nullable = false, updatable = false)
	private Timestamp createdAt;

	@UpdateTimestamp
	@Column(name = "updated_at", nullable = false, updatable = true)
	private Timestamp updatedAt;
}
