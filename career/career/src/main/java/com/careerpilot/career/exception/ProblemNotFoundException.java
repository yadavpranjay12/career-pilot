package com.careerpilot.career.exception;

import java.util.UUID;

public class ProblemNotFoundException extends RuntimeException {
    public ProblemNotFoundException(UUID id) {
        super("No problem found with id: " + id);
    }
}
