package com.careerpilot.career.domain;

import java.util.EnumSet;
import java.util.Set;

public enum ApplicationStatus {
    SAVED,
    APPLIED,
    OA_RECEIVED,
    OA_COMPLETED,
    INTERVIEW,
    OFFER,
    REJECTED,
    WITHDRAWN;

    /**
     * Legal forward transitions from this status. REJECTED and WITHDRAWN are
     * terminal — once there, no further transition is legal, matching how a
     * real application pipeline actually ends. OFFER can still move to
     * WITHDRAWN (the candidate declines) but nowhere else.
     */
    public Set<ApplicationStatus> allowedNextStatuses() {
        return switch (this) {
            case SAVED        -> EnumSet.of(APPLIED, WITHDRAWN);
            case APPLIED       -> EnumSet.of(OA_RECEIVED, INTERVIEW, REJECTED, WITHDRAWN);
            case OA_RECEIVED   -> EnumSet.of(OA_COMPLETED, REJECTED, WITHDRAWN);
            case OA_COMPLETED  -> EnumSet.of(INTERVIEW, REJECTED, WITHDRAWN);
            case INTERVIEW     -> EnumSet.of(OFFER, REJECTED, WITHDRAWN);
            case OFFER         -> EnumSet.of(WITHDRAWN);
            case REJECTED, WITHDRAWN -> EnumSet.noneOf(ApplicationStatus.class);
        };
    }

    public boolean canTransitionTo(ApplicationStatus target) {
        return this == target || allowedNextStatuses().contains(target);
    }
}
