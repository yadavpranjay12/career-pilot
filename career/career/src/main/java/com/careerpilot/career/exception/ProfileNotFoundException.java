package com.careerpilot.career.exception;

import java.util.UUID;

public class ProfileNotFoundException extends RuntimeException {
    public ProfileNotFoundException(UUID userId) { super("No profile found for user: " + userId); }
}
