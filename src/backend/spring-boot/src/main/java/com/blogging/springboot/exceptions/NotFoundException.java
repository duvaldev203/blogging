package com.blogging.springboot.exceptions;

public class NotFoundException extends RuntimeException {
	String resource;
	Long fieldId;

	String dataName;
	String dataValue;

	public NotFoundException(String  resource, Long id ){
		super(String.format("L'objet %s d'id %d n'a pas ete trouve !!!", resource, id));
		this.resource = resource;
		this.fieldId = id;
	}

	public NotFoundException(String  resource, String name, String value ){
		super(String.format("L'objet %s avec l'attribut %s: %s n'a pas ete trouve !!!", resource, name, value));
		this.resource = resource;
		this.dataName = name;
		this.dataValue = value;
	}
}
