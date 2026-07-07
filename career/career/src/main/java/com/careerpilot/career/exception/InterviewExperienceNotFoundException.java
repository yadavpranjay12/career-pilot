package com.careerpilot.career.exception;

import java.util.UUID;

public class InterviewExperienceNotFoundException extends RuntimeException {
    public InterviewExperienceNotFoundException(UUID id) {
        super("No interview experience found with id: " + id);
    }
}
