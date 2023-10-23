package com.blogging.springboot.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;
import java.util.List;

@Data
@Entity
@Table(name = "users")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "first_name")
	@NotNull(message = "Le nom de l'utilisateur est obligatoire !!!")
	private String firstName;

	@Column(name = "last_name")
	@NotNull(message = "Le prenom de l'utilisateur est obligatoire !!!")
	private String lastName;

	@NotNull(message = "L'email de l'utilisateur est obligatoire !!!")
	@Email(message = "email invalide !!!")
	private String email;

	@NotNull(message = "Le mot de passe de l'utilisateur est obligatoire !!!")
	private String password;

	@NotNull(message = "Le numero de telephone de l'utilisateur est obligatoire !!!")
	@Pattern(regexp = "^(\\+237|237)?[2368]\\d{8}$", message = "Numéro de téléphone invalide")
	private String phone;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<Article> articles;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<Reaction> reactions;

	@OneToOne(mappedBy = "user", cascade = { CascadeType.PERSIST, CascadeType.MERGE }, orphanRemoval = true)
	private Comment comment;

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "user_role",
					joinColumns = @JoinColumn(name = "user_id"),
					inverseJoinColumns = @JoinColumn(name = "role_id")
	)
	private List<Role> roles;

	@OneToOne
	@JoinColumn(name = "profile_id")
	private Profile profile;

	@CreationTimestamp
	@Column(name = "created_at", nullable = false, updatable = false)
	private Timestamp createdAt;

	@UpdateTimestamp
	@Column(name = "updated_at", nullable = false, updatable = true)
	private Timestamp updatedAt;
}
