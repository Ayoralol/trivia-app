package com.trivia.triviabackend.users;

import jakarta.validation.constraints.Pattern;

public class UpdateUserDTO {
	
	@Pattern( regexp = "^(?=\\S).*$", message = "Username Cannot be empty")
	private String Username;

	@Pattern( regexp = "^(?=\\S).*$", message = "Password Cannot be empty")
	private String password;
	
	private int high_score_surv;
	
	private int high_score_ta;

	public String getUsername() {
		return Username;
	}

	public void setUsername(String username) {
		Username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public int getHigh_score_surv() {
		return high_score_surv;
	}

	public void setHigh_score_surv(int high_score_surv) {
		this.high_score_surv = high_score_surv;
	}

	public int getHigh_score_ta() {
		return high_score_ta;
	}

	public void setHigh_score_ta(int high_score_ta) {
		this.high_score_ta = high_score_ta;
	}
	
}