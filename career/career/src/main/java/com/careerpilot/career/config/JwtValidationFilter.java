package com.careerpilot.career.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Collections;

@Component
public class JwtValidationFilter extends OncePerRequestFilter {

    // This grabs the secret key from your application.properties
    @Value("${jwt.secret}")
    private String jwtSecret;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");

        // 1. If there's no token, move on. SecurityConfig will block the request later.
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        final String jwt = authHeader.substring(7);

        try {
            // 2. Parse and validate the token
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(jwt)
                    .getBody();

            // 3. Extract the User ID (Assuming your Auth service put it in the "subject")
            String userId = claims.getSubject();

            // 4. Secure the context!
            if (userId != null && SecurityContextHolder.getContext().getAuthentication() == null) {

                // We pass the userId as the principal. This is what principal.getName() returns!
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userId,
                        null,
                        Collections.emptyList() // Put roles here if you use them in the future
                );

                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // Inject the authenticated user into Spring's security context
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        } catch (Exception e) {
            // If the token is expired, forged, or malformed, log it.
            // We don't throw an error here; we let it pass through unauthenticated
            // so SecurityConfig can throw a proper 401 Unauthorized response.
            logger.error("Cannot set user authentication: " + e.getMessage());
        }

        // 5. Continue the request to the controller
        filterChain.doFilter(request, response);
    }

    private Key getSigningKey() {
        // Hardcoding the exact same 256-bit string used in Auth Service
        String overrideSecret = "404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970";
        return Keys.hmacShaKeyFor(overrideSecret.getBytes(StandardCharsets.UTF_8));
    }}