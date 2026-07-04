package com.careerpilot.auth.service;

import com.careerpilot.auth.dto.request.LoginRequest;
import com.careerpilot.auth.dto.request.RefreshTokenRequest;
import com.careerpilot.auth.dto.request.RegisterRequest;
import com.careerpilot.auth.dto.response.AuthResponse;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
    AuthResponse refresh(RefreshTokenRequest request);
    void logout(String refreshToken);
}
