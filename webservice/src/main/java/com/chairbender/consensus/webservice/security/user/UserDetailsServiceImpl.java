package com.chairbender.consensus.webservice.security.user;

import com.chairbender.consensus.webservice.entity.User;
import com.chairbender.consensus.webservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * A user details service where user details are looked up in our users table
 */
//makes our class available to spring for autowiring. The exact service name is not important.
@Service("userDetails")
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository mUserRepository;

    @Autowired
    public UserDetailsServiceImpl(UserRepository mUserRepository) {
        this.mUserRepository = mUserRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = mUserRepository.findByUsername(username);
        if (null == user) {
            throw new UsernameNotFoundException("No user present with username: " + username);
        } else {
            return user;
        }
    }
}
