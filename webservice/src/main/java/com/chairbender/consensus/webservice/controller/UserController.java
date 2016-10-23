package com.chairbender.consensus.webservice.controller;

import com.chairbender.consensus.webservice.bean.LoginAttempt;
import com.chairbender.consensus.webservice.bean.RegistrationAttempt;
import com.chairbender.consensus.webservice.entity.User;
import com.chairbender.consensus.webservice.exception.RegistrationException;
import com.chairbender.consensus.webservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * For dealing with users. Registration.
 */
@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserRepository mUserRepository;
    @Autowired
    private BCryptPasswordEncoder mBCryptPasswordEncoder;

    /**
     *
     *
     * @return empty string if no error occurred. Otherwise, returns a string explaining what went wrong.
     */
    @RequestMapping(method = RequestMethod.POST)
    public String registerUser(@RequestBody RegistrationAttempt pRegistrationAttempt) {
        try {
            pRegistrationAttempt.createUser(mUserRepository,mBCryptPasswordEncoder);
        } catch (RegistrationException e) {
            return "\"" + e.getMessage() + "\"";
        }
        return "\"\"";
    }

    /**
     *
     * @return true iff the username and password matches a user.
     */
    @RequestMapping("/login")
    public boolean login(@RequestBody LoginAttempt pLoginAttempt) {
        return pLoginAttempt.isValid(mUserRepository,mBCryptPasswordEncoder);
    }

}
