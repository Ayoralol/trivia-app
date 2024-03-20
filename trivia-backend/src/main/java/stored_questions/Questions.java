package stored_questions;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="questions")
public class Questions {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column
	private String category;
	
	@Column
	private String correct_answer;
	
	@Column
	private String difficulty;
	
	@Column
	private String[] incorrect_answers;
	
	@Column
	private String question;
	
	@Column
	private String type;
	
}
