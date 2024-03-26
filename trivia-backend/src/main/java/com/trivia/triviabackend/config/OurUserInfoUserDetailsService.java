package com.trivia.triviabackend.config;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.trivia.triviabackend.users.User;
import com.trivia.triviabackend.users.UsersRepository;

@Configuration
public class OurUserInfoUserDetailsService implements UserDetailsService {
	
	@Autowired
	private UsersRepository userRepo;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<User> user = Optional.ofNullable(userRepo.findByUsername(username));
		return user.map(OurUserInfoDetails::new).orElseThrow(() -> new UsernameNotFoundException("User does not exist"));
	}
}
