package com.blogging.springboot.exceptions;

public class NotFoundException extends RuntimeException {
	String resource;
	Long fieldId;

	public NotFoundException(String  resource, Long id ){
		super(String.format("L'objet %s d'id %d n'a pas ete trouve !!!", resource, id));
		this.resource = resource;
		this.fieldId = id;
	}
}
