import {TriviaQuestion} from "../../services/triviaServices";

const Q = (q: TriviaQuestion) => {
  return (
    <div>
      <h2 dangerouslySetInnerHTML={{__html: q.question}} />
      <ul>
        <li dangerouslySetInnerHTML={{__html: q.correct_answer}} />
        {q.incorrect_answers.map((a, i) => (
          <li key={i} dangerouslySetInnerHTML={{__html: a}} />
        ))}
      </ul>
    </div>
  );
};

export default Q;
