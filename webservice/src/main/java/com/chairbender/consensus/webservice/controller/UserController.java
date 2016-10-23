package com.chairbender.consensus.webservice.controller;

import com.chairbender.consensus.webservice.bean.LoginAttempt;
import com.chairbender.consensus.webservice.entity.User;
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
     * @return all of the papers in the database
     */
    @RequestMapping(method = RequestMethod.POST)
    public void registerUser(@RequestBody User pUser) {
        mUserRepository.save(pUser);
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
