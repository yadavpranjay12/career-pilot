package com.careerpilot.career.service.impl;

import com.careerpilot.career.domain.Resume;
import com.careerpilot.career.domain.ResumeStatus;
import com.careerpilot.career.dto.request.CreateResumeRequest;
import com.careerpilot.career.dto.request.UpdateResumeRequest;
import com.careerpilot.career.dto.response.ResumeResponse;
import com.careerpilot.career.exception.InvalidResumeException;
import com.careerpilot.career.exception.ResumeNotFoundException;
import com.careerpilot.career.mapper.ResumeMapper;
import com.careerpilot.career.repository.ResumeRepository;
import com.careerpilot.career.service.ResumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ResumeServiceImpl implements ResumeService {

    private final ResumeRepository resumeRepository;

    @Override
    @Transactional
    public ResumeResponse createResume(CreateResumeRequest request) {
        Resume resume = Resume.builder()
                .userId(request.userId())
                .title(request.title())
                .fileName(request.fileName())
                .fileUrl(request.fileUrl())
                .version(1)
                .status(ResumeStatus.DRAFT)
                .isDefault(false)
                .build();

        return ResumeMapper.toResponse(resumeRepository.save(resume));
    }

    @Override
    @Transactional(readOnly = true)
    public ResumeResponse getResume(UUID id) {
        return resumeRepository.findById(id)
                .map(ResumeMapper::toResponse)
                .orElseThrow(() -> new ResumeNotFoundException(id));
    }

    @Override
    @Transactional
    public ResumeResponse updateResume(UUID id, UpdateResumeRequest request) {
        Resume resume = resumeRepository.findById(id)
                .orElseThrow(() -> new ResumeNotFoundException(id));

        if (resume.getStatus() == ResumeStatus.ARCHIVED) {
            throw new InvalidResumeException("Archived resumes cannot be edited; create a new resume instead");
        }

        resume.setTitle(request.title());
        resume.setFileName(request.fileName());
        resume.setFileUrl(request.fileUrl());
        resume.setVersion(resume.getVersion() + 1);

        return ResumeMapper.toResponse(resumeRepository.save(resume));
    }

    @Override
    @Transactional
    public void deleteResume(UUID id) {
        if (!resumeRepository.existsById(id)) {
            throw new ResumeNotFoundException(id);
        }
        resumeRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ResumeResponse> getResumes(UUID userId, Pageable pageable) {
        return resumeRepository.findByUserId(userId, pageable).map(ResumeMapper::toResponse);
    }

    @Override
    @Transactional
    public ResumeResponse setDefaultResume(UUID id) {
        Resume resume = resumeRepository.findById(id)
                .orElseThrow(() -> new ResumeNotFoundException(id));

        if (resume.getStatus() == ResumeStatus.ARCHIVED) {
            throw new InvalidResumeException(
                    "Resume " + id + " is archived and cannot be set as default"
            );
        }

        resumeRepository.findByUserIdAndIsDefaultTrue(resume.getUserId())
                .filter(current -> !current.getId().equals(resume.getId()))
                .ifPresent(current -> {
                    current.setDefault(false);
                    resumeRepository.save(current);
                });

        resumeRepository.flush();   // <-- add this

        resume.setDefault(true);

        if (resume.getStatus() == ResumeStatus.DRAFT) {
            resume.setStatus(ResumeStatus.ACTIVE);
        }

        return ResumeMapper.toResponse(resumeRepository.saveAndFlush(resume));}
    @Override
    @Transactional
    public ResumeResponse archiveResume(UUID id) {
        Resume resume = resumeRepository.findById(id)
                .orElseThrow(() -> new ResumeNotFoundException(id));

        resume.setStatus(ResumeStatus.ARCHIVED);
        resume.setDefault(false);

        return ResumeMapper.toResponse(resumeRepository.save(resume));
    }
}
