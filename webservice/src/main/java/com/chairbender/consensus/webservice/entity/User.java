package com.chairbender.consensus.webservice.entity;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Collection;

/**
 * Our User. Also implements user details so Spring Security will check
 * the getPassword() property when doing authentication.
 *
 * Password is stored as a bcrypt hash
 */
@Entity
public class User implements UserDetails {
    private static final String DEFAULT_ROLE = "USER";
    @Id
    @GeneratedValue
    private long id;
    private String username;
    //bcrypt hash of the actual password
    private String password;
    private String email;

    public User() {

    }

    public long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }


    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return AuthorityUtils.createAuthorityList(DEFAULT_ROLE);
    }

    /**
     *
     * @return bcrypt hash of the password
     */
    public String getPassword() {
        return password;
    }

    /**
     *
     * @param password bcrypt has of the password to use as this user's password
     */
    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
