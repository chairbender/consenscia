package com.chairbender.consensus.webservice.security;

import com.chairbender.consensus.webservice.security.user.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;

import javax.servlet.http.HttpServletResponse;

/**
 * Defines our security configuration.
 *
 * Security can be summed up like so:
 * We have some endpoints that require authenticating against our registered user database. We
 * have some endpoints that don't require authentication.
 *
 * When a request comes in, spring security checks for the HTTP BASIC authentication header. It expects an
 * HTTP Header of "Authorization" with a base-64 encoded value of "Basic username:plaintextpassword", where username and plaintextpassword
 * are replaced with the username and plain text password of the user, and the entire string (but not "Basic "), with the colon, should be base-64 encoded).
 * So in the end it'll look something like Basic 489gasfdsafda90fd3421==.
 *
 * If the Authorization header is present, it uses that and checks our user database via
 * our UserDetailsServiceImpl. If it finds a user and the password matches,
 * authentication is successful. Otherwise, it returns a 401.
 *
 * In other words, in order to access endpoints that require authentication, the client needs to always send
 * HTTP Basic authentication headers.
 *
 */
@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserDetailsServiceImpl userDetailsServiceImpl;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                //turn this off because we are acting as a webservice not a website
                .csrf().disable().
                //we are RESTful so there should be no state
                sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                //enable http basic authentication (it's a standard: http://www.faqs.org/rfcs/rfc1945.html)
                .and().httpBasic()
                .and()
                //enable restricting access based on authentication
                .authorizeRequests()
                //only authenticated users can create papers
                .antMatchers(HttpMethod.POST, "/papers").authenticated()
                //all the other endpoints are accessible
                .anyRequest().permitAll()
                .and()
                    //return unauthorized when someone tries to access something they aren't allowed to
                    .exceptionHandling().authenticationEntryPoint(unauthorizedEntryPoint());
    }

    @Bean
    public AuthenticationEntryPoint unauthorizedEntryPoint() {
        return (request, response, authExcption) -> response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        //critical piece of authentication config:
        //tells spring to attempt authentication using our user details service,
        //which looks up user details in our users table. When the basic authentication filter runs, it will
        //attempt to authenticate the user using this service.
        auth
                .userDetailsService(userDetailsServiceImpl)
                .passwordEncoder(bCryptPasswordEncoder());
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder(){
        return new BCryptPasswordEncoder();
    }

}
