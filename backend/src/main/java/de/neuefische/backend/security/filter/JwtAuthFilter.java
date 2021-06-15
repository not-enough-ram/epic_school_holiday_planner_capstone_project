package de.neuefische.backend.security.filter;

import de.neuefische.backend.security.service.JwtUtilsService;
import io.jsonwebtoken.Claims;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtilsService jwtUtilsService;

    public JwtAuthFilter(JwtUtilsService jwtUtilsService) {
        this.jwtUtilsService = jwtUtilsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = getAuthToken(request);

        if (token != null && !token.isBlank()) {
            try {
                Claims claims = this.jwtUtilsService.parseClaim(token);
                setSecurityContext(claims.getSubject());
            }
            catch (Exception e) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "invalid token");
            }
        }
        filterChain.doFilter(request, response);
    }

    private void setSecurityContext(String subject) {
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(subject, "", List.of());
        SecurityContextHolder.getContext().setAuthentication(token);
    }

    private String getAuthToken(HttpServletRequest request) {
        String authorization = request.getHeader("Authorization");
        if (authorization != null) {
            return authorization.replace("Bearer ", "").trim();
        }
        return null;
    }
}
