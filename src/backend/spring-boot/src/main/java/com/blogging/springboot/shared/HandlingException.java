package com.blogging.springboot.shared;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HandlingException {
	private Timestamp timestamp;
	private String message;
	private boolean status;

}