package com.blogging.springboot.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;

@Data
@Entity
@Table(name = "medias")
public class Media {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull(message = "Le titre du media est obligatoire !!!")
	private String title;

  @NotNull(message = "La descripiton du media est obligatoire !!!")
	private String description;

  @NotNull(message = "Le type de media est obligatoire !!!")
	private String type;

  @NotNull(message = "Le lien du media est obligatoire !!!")
	private String url;

	@CreationTimestamp
	@Column(name = "created_at", nullable = false, updatable = false)
	private Timestamp createdAt;

	@UpdateTimestamp
	@Column(name = "updated_at", nullable = false, updatable = true)
	private Timestamp updatedAt;
}
