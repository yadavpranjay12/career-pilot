package com.careerpilot.career.exception;

import java.util.UUID;

public class ProfileAlreadyExistsException extends RuntimeException {
    public ProfileAlreadyExistsException(UUID userId) { super("A profile already exists for user: " + userId); }
}
