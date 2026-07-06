package com.careerpilot.career.exception;

import java.util.UUID;

public class CompanyNotFoundException extends RuntimeException {
    public CompanyNotFoundException(UUID id) { super("No company found with id: " + id); }
}
