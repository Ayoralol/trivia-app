// opentdb.com API
// https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple

export interface TriviaQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface User {
  username: string;
  password: string;
  high_score: number;
  answered_mc: number;
  answered_tf: number;
  incorrect_mc: number;
  incorrect_tf: number;
}

export const getTriviaQuestions = async (
  amount: number,
  category: number,
  difficulty: string,
  type: string
) => {
  const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Unable to fetch questions! status: ${response.status}`);
  }
  const data = await response.json();
  return data.results;
};
