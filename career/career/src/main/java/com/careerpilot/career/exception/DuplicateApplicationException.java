package com.careerpilot.career.exception;

import java.util.UUID;

public class DuplicateApplicationException extends RuntimeException {
    public DuplicateApplicationException(UUID companyId, String jobTitle) {
        super("An application for '" + jobTitle + "' at company " + companyId + " already exists");
    }
}
