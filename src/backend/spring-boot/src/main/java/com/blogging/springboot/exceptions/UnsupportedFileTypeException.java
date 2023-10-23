package com.blogging.springboot.exceptions;

public class UnsupportedFileTypeException extends RuntimeException {
	public UnsupportedFileTypeException(String message) {
		super(message);
	}
}
