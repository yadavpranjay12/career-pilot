package com.careerpilot.career.exception;

import java.util.UUID;

public class GoalNotFoundException extends RuntimeException {
    public GoalNotFoundException(UUID id) {
        super("No goal found with id: " + id);
    }
}
