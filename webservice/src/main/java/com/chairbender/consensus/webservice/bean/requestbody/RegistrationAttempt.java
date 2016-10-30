package com.chairbender.consensus.webservice.bean.requestbody;

import com.chairbender.consensus.webservice.entity.User;
import com.chairbender.consensus.webservice.exception.RegistrationException;
import com.chairbender.consensus.webservice.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * Represents a login attempt with an email and a plaintext password.
 */
public class RegistrationAttempt {
    private String email;
    private String password;

    public RegistrationAttempt() {

    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String pEmail) {
        email = pEmail;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String pPassword) {
        password = pPassword;
    }

    /**
     * @param pUserRepository repository in which the user should be created
     * @param pBCryptPasswordEncoder password encoder to use to encode the user's password
     * @return true iff registration succeeded
     * @throws RegistrationException if error occurs trying to register. The message explains the failure reason.
     */
    public boolean createUser(UserRepository pUserRepository,BCryptPasswordEncoder pBCryptPasswordEncoder) throws RegistrationException{
        User matchedUser = pUserRepository.findByUsername(email);
        if (matchedUser != null) {
            throw new RegistrationException("An account with the specified email address already exists.");
        }
        //user doesn't exist, so create it
        User toRegister = new User();
        toRegister.setUsername(email);
        toRegister.setEmail(email);
        toRegister.setPassword(pBCryptPasswordEncoder.encode(password));
        pUserRepository.save(toRegister);

        return true;
    }
}
