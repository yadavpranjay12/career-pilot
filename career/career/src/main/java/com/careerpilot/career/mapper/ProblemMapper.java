package com.careerpilot.career.mapper;

import com.careerpilot.career.domain.Problem;
import com.careerpilot.career.dto.response.ProblemResponse;

public final class ProblemMapper {

    private ProblemMapper() {}

    public static ProblemResponse toResponse(Problem problem) {
        return new ProblemResponse(
                problem.getId(), problem.getUserId(), problem.getTitle(), problem.getPlatform(),
                problem.getTopic(), problem.getDifficulty(), problem.getStatus(), problem.getNotes(),
                problem.getSolutionUrl(), problem.getSolvedDate(), problem.getRevisionCount(),
                problem.getNextRevisionDate(), problem.getCreatedAt(), problem.getUpdatedAt()
        );
    }
}
