package com.trivia.triviabackend.users;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@Service
@Transactional
public class UserService {
	
	@Autowired
	private UsersRepository repo;
	
	@Autowired
	private ModelMapper mapper;
	
	public User createUser(CreateUserDTO data) {
		
		User newUser = mapper.map(data, User.class);
		newUser.setHigh_score_surv(0);
		newUser.setHigh_score_ta(0);
		return this.repo.save(newUser);
	}
	
	public List<User> getAll() {
		return this.repo.findAll();
	}
	
	public Optional<User> findById(Long id) {
		return this.repo.findById(id);
	}
	
	public Optional<User> updateById(@Valid UpdateUserDTO data, Long id) {
		Optional<User> maybeUser = this.findById(id);
		if (maybeUser.isEmpty()) {
			return maybeUser;
		}
		
		User foundUser = maybeUser.get();
		
		mapper.map(data, foundUser);
		
		User updated = this.repo.save(foundUser);
		return Optional.of(updated);
	}
	
	public boolean deleteItemById(Long id) {
		Optional<User> maybeUser = this.repo.findById(id);
		if(maybeUser.isEmpty()) {
			return false;
		}
		this.repo.delete(maybeUser.get());;
		return true;
	}
}

