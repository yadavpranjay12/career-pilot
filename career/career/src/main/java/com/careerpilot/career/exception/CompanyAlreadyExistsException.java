package com.careerpilot.career.exception;

public class CompanyAlreadyExistsException extends RuntimeException {
    public CompanyAlreadyExistsException(String name) { super("A company named '" + name + "' already exists"); }
}
