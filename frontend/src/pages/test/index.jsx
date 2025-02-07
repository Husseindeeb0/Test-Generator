import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context";
import { useLocation } from "react-router-dom";

function Test() {
  const { setUserAnswers } = useContext(GlobalContext);
  const navigate = useNavigate();

  // Local state to manage user answers, result, score, and questions with options
  const [userAnswers, setUserAnswersLocal] = useState([]);
  const [result, setResult] = useState(false);
  const [score, setScore] = useState(0);
  const [questionsWithOptions, setQuestionsWithOptions] = useState([]);
  const [correctAnswerIndices, setCorrectAnswerIndices] = useState([]);

  const location = useLocation();
  const { test, testIndex } = location.state;

  // Effect to process and shuffle questions if a test is provided
  useEffect(() => {
    if (test && test.length > 0) {
      const processedQuestions = test.map((question) => {
        const { incorrect_answers, correct_answer } = question;
        // Randomly insert the correct answer into the options array
        const randomIndex = Math.floor(
          Math.random() * (incorrect_answers.length + 1)
        );
        const options = [...incorrect_answers];
        options.splice(randomIndex, 0, correct_answer);
        return { ...question, options };
      });

      setQuestionsWithOptions(processedQuestions);

      // Store the index of the correct answer in the options array
      const indices = processedQuestions.map((question) =>
        question.options.indexOf(question.correct_answer)
      );

      setCorrectAnswerIndices(indices);
    }
  }, [test]);

  // Handle changes in selected options
  const handleOptionChange = (qIndex, oIndex) => {
    const newAnswers = [...userAnswers];
    newAnswers[qIndex] = oIndex;
    setUserAnswersLocal(newAnswers);
  };

  // Calculate the score based on user answers
  const calculateScore = () => {
    let correctCount = 0;
    userAnswers.forEach((answer, index) => {
      if (answer === correctAnswerIndices[index]) {
        correctCount++;
      }
      // }
    });
    setScore(correctCount);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    setUserAnswers(userAnswers); // Update global state with user answers
    calculateScore(); // Calculate the score
    setResult(true); // Show the result
  };

  // Handle the "Try Again" button click
  const handleTryAgain = () => {
    setUserAnswersLocal([]);
    setResult(false);
    setScore(0);
  };

  const decodeHtmlEntities = (text) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");
    return doc.documentElement.textContent;
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {result ? (
        // Display the result if the test has been submitted
        <div className="p-6 max-w-[50rem] mx-5 md:mx-auto bg-cyan-700 mt-20 rounded-lg shadow-lg">
          <h1 className="text-4xl text-white font-bold mb-6 text-center">
            Test Result
          </h1>
          <p className="text-2xl text-white mb-6 text-center">
            You scored <span className="font-bold">{score}</span> out of{" "}
            <span className="font-bold">{test.length}</span>
          </p>
          <button
            onClick={handleTryAgain}
            className="mt-4 bg-emerald-500 hover:bg-emerald-700 text-white py-2 px-6 rounded-lg shadow-md block mx-auto"
          >
            Try Again
          </button>
        </div>
      ) : (
        // Display the test form for automatic tests
        <div className="p-6 max-w-[50rem] mx-5 mb-10 md:mx-auto bg-cyan-700 mt-10 rounded-lg shadow-lg">
          <h1 className="text-4xl text-white font-bold mb-6 text-center">
            {`Test ${testIndex + 1}`}
          </h1>
          <form onSubmit={handleSubmit}>
            {questionsWithOptions && questionsWithOptions.length > 0 ? (
              <>
                {questionsWithOptions.map((question, qIndex) => (
                  <div
                    key={qIndex}
                    className="mb-8 bg-gray-200 p-6 rounded-lg shadow-sm"
                  >
                    <div>
                      <span className="font-bold text-xl">
                        Question Category:
                      </span>{" "}
                      {question.category}
                    </div>
                    <h2 className="text-xl font-semibold my-4">
                      Question {qIndex + 1}:{" "}
                      <span className="text-emerald-700">
                        {decodeHtmlEntities(question.question)}
                      </span>
                    </h2>
                    <div className="pl-4 space-y-3">
                      {question.options.map((option, oIndex) => (
                        <label
                        key={oIndex}
                        htmlFor={`question-${qIndex}-option-${oIndex}`}
                        className="flex items-center space-x-3 cursor-pointer"
                      >
                        <input
                          id={`question-${qIndex}-option-${oIndex}`}
                          type="radio"
                          name={`question-${qIndex}`}
                          value={option}
                          required
                          checked={userAnswers[qIndex] === oIndex}
                          onChange={() => handleOptionChange(qIndex, oIndex)}
                          className="w-5 h-5 cursor-pointer accent-emerald-700"
                        />
                        <span className="text-lg font-medium">
                          {decodeHtmlEntities(option)}
                        </span>
                      </label>
                      ))}
                    </div>
                  </div>
                ))}
                <button
                  type="submit"
                  className="mt-6 bg-emerald-500 hover:bg-emerald-700 text-white text-xl py-2 px-8 rounded-lg shadow-md block mx-auto"
                >
                  Submit
                </button>
              </>
            ) : (
              navigate("/generator")
            )}
          </form>
        </div>
      )}
    </div>
  );
}

export default Test;
