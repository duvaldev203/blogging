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
@Table(name = "categories")
public class Category {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull(message = "Le champ nom ne doit pas etre vide !!!")
	private String name;

	@NotNull(message = "La description de la categorie est obligatoire !!!")
	private String description;

	@OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
	private List<Article> articles;

	@CreationTimestamp
	@Column(name = "created_at", nullable = false, updatable = false)
	private Timestamp createdAt;

	@UpdateTimestamp
	@Column(name = "updated_at", nullable = false, updatable = true)
	private Timestamp updatedAt;
}
