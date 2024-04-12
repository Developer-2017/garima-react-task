import React, { useState, useEffect } from 'react';
import { QUESTIONS } from './questions';

const TOTAL_QUESTIONS = Object.keys(QUESTIONS).length;

const App: React.FC = () => {
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [score, setScore] = useState<number>(0);
  const [averageScore, setAverageScore] = useState<number | null>(null);

  useEffect(() => {
    calculateScore();
    calculateAverageScore();
  }, [answers]);

  const handleAnswerChange = (index: number, value: boolean) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const calculateScore = () => {
    const yesCount = answers.filter(answer => answer).length;
    const calculatedScore = (yesCount / TOTAL_QUESTIONS) * 100;
    setScore(calculatedScore);
  };

  const calculateAverageScore = () => {
    const allScoresString = localStorage.getItem('scores');
    if (allScoresString) {
      const allScores = JSON.parse(allScoresString);
      const sum = allScores.reduce((acc: number, score: number) => acc + score, 0);
      const average = sum / allScores.length;
      setAverageScore(average);
    }
  };

  const handleSubmit = () => {
    const allScoresString = localStorage.getItem('scores');
    const allScores = allScoresString ? JSON.parse(allScoresString) : [];
    localStorage.setItem('scores', JSON.stringify([...allScores, score]));
  };

  return (
    <div>
      <h1>TODO</h1>
      {Object.entries(QUESTIONS).map(([key, question], index) => (
        <div key={key}>
          <p>{question}</p>
          <label>
            Yes
            <input
              type="radio"
              name={`question-${index}`}
              value="yes"
              checked={answers[index] === true}
              onChange={() => handleAnswerChange(index, true)}
            />
          </label>
          <label>
            No
            <input
              type="radio"
              name={`question-${index}`}
              value="no"
              checked={answers[index] === false}
              onChange={() => handleAnswerChange(index, false)}
            />
          </label>
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
      <p>Your score: {score.toFixed(2)}</p>
      {averageScore && <p>Average score: {averageScore.toFixed(2)}</p>}
    </div>
  );
};

export default App;