package com.chairbender.consensus.webservice.bean;

import com.chairbender.consensus.webservice.entity.User;
import com.chairbender.consensus.webservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * Represents a login attempt with a username and a plaintext password.
 */
public class LoginAttempt {
    private String username;
    private String password;

    public LoginAttempt() {

    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String pUsername) {
        username = pUsername;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String pPassword) {
        password = pPassword;
    }

    /**
     * @param pUserRepository user repository inside of which the user should be searched for.
     * @param pBCryptPasswordEncoder encoder to use to check the password.
     *
     * @return true iff the user with the given username exists in the repository and the plaintext password in this
     * login attempt is a Bcrypt match with the encrypted password in the database
     * for that user.
     */
    public boolean isValid(UserRepository pUserRepository, BCryptPasswordEncoder pBCryptPasswordEncoder) {
        User matchedUser = pUserRepository.findByUsername(username);
        if (matchedUser != null) {
            return pBCryptPasswordEncoder.matches(password,matchedUser.getPassword());
        }
        return false;
    }
}
