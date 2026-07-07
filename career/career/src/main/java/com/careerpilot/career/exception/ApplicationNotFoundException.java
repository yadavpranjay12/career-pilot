package com.careerpilot.career.exception;

import java.util.UUID;

public class ApplicationNotFoundException extends RuntimeException {
    public ApplicationNotFoundException(UUID id) {
        super("No internship application found with id: " + id);
    }
}
