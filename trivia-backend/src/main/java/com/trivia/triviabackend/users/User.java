package com.trivia.triviabackend.users;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "users")
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  @Column(unique=true)
  @Size(max = 12)
  @NotNull
  private String username;

  @Column
  private String password;

  @Column
  private int high_score_surv;

  @Column
  private int high_score_ta;
  
  @Column
  private String roles;

  public int getId() {
    return id;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
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
  
  public String getRoles() {
	  return roles;
  }
  
  public void setRoles(String roles) {
	  this.roles = roles;
  }
}
