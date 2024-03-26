package com.blogging.springboot.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
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

	@NotNull(message = "Le champ title ne doit pas etre vide !!!")
	private String title;

//	@NotNull(message = "La couverture de l'article  est obligatoire !!!")
	private String cover;

	@Lob
	@NotNull(message = "Le contenu de l'article ne doit pas etre vide !!!")
	private String content;

	private int totalViews;

	@NotNull(message = "Le champ contenant le nombre d'heure de lecture est obligatoire !!!")
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
