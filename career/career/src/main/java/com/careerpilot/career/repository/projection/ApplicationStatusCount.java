package com.careerpilot.career.repository.projection;

import com.careerpilot.career.domain.ApplicationStatus;

public interface ApplicationStatusCount {

    ApplicationStatus getStatus();

    Long getCount();

}