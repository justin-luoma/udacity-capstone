package dev.luoma.udacity.capstone.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

  @Bean
  SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .authorizeRequests()
        .antMatchers("/api/public").permitAll()
        .antMatchers("/api/**").authenticated()
        .and()
        .cors()
        .and()
        .oauth2ResourceServer()
        .jwt();
    return http.build();
  }
}
