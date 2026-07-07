package com.careerpilot.career.exception;

import java.util.UUID;

public class ResumeNotFoundException extends RuntimeException {
    public ResumeNotFoundException(UUID id) {
        super("No resume found with id: " + id);
    }
}
