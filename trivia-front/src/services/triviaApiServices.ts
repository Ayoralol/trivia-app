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

interface TriviaParams {
  amount?: number;
  category?: number;
  difficulty?: string;
}

export const getTriviaQuestions = async ({
  amount = 20,
  category,
  difficulty,
}: TriviaParams) => {
  const urlAmount = `amount=${amount}`;
  const urlCategory = category ? `&category=${category}` : "";
  const urlDifficulty = difficulty ? `&difficulty=${difficulty}` : "";

  const url = `https://opentdb.com/api.php?${urlAmount}${urlCategory}${urlDifficulty}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Unable to fetch questions! status: ${response.status}`);
  }
  const data = await response.json();
  return data.results.map((question: TriviaQuestion) => ({
    ...question,
    question: decodeHtml(question.question),
    correct_answer: decodeHtml(question.correct_answer),
    incorrect_answers: question.incorrect_answers.map(decodeHtml),
  }));
};

export function shuffleAnswers(array: any[]) {
  // Fisher-Yates shuffle
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export function decodeHtml(html: string) {
  // why does this feel so hacky?
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}
