package com.careerpilot.career.exception;

import com.careerpilot.career.domain.ApplicationStatus;

public class InvalidStatusTransitionException extends RuntimeException {
    public InvalidStatusTransitionException(ApplicationStatus from, ApplicationStatus to) {
        super("Cannot transition application status from " + from + " to " + to);
    }
}
