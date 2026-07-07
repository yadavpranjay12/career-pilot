package com.careerpilot.career.exception;

import java.time.LocalDate;

public class InvalidApplicationDateException extends RuntimeException {
    public InvalidApplicationDateException(LocalDate applicationDate, LocalDate deadline) {
        super("Deadline (" + deadline + ") cannot be before application date (" + applicationDate + ")");
    }
}
