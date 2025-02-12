import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../../context";

function Results() {
  const { score, setScore, userAnswers } = useContext(GlobalContext);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    test,
    testIndex,
    questionsAnswerState,
    questionsWithOptions,
    correctAnswerIndices,
  } = location.state;

  const decodeHtmlEntities = (text) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");
    return doc.documentElement.textContent;
  };

  // Handle the "Try Again" button click
  const handleTryAgain = () => {
    setScore(0);
    navigate("/test", {
      state: {
        test: test,
        testIndex: testIndex,
      }
    });
  };
  return (
    <div className="p-6 max-w-[50rem] mx-5 md:mx-auto bg-cyan-700 mt-20 rounded-lg shadow-lg">
      <h1 className="text-4xl text-white font-bold mb-6 text-center">
        Test Result
      </h1>
      <p className="text-2xl text-white mb-6 text-center">
        You scored <span className="font-bold">{score}</span> out of{" "}
        <span className="font-bold">{test.length}</span>
      </p>
      <div>
        {questionsWithOptions.map((question, qIndex) => (
          <div
            key={qIndex}
            className="mb-8 bg-gray-200 p-6 rounded-lg shadow-sm"
          >
            <h2 className="text-xl font-semibold my-4">
              Question {qIndex + 1}:{" "}
              <span className="text-emerald-700">
                {decodeHtmlEntities(question.question)}
              </span>
            </h2>
            {questionsAnswerState[qIndex] ? (
              <div className="pl-4 space-y-3">
                {question.options.map((option, oIndex) => (
                  <div
                    key={oIndex}
                    className="flex items-center space-x-3 cursor-pointer"
                  >
                    {correctAnswerIndices[qIndex] === oIndex ? (
                      <span className="text-lg font-medium text-green-500 flex items-center space-x-2">
                        <FaCheckCircle className="text-xl" />
                        <span>{decodeHtmlEntities(option)}</span>
                      </span>
                    ) : (
                      <span className="text-lg font-medium">
                        {decodeHtmlEntities(option)}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="pl-4 space-y-3">
                {question.options.map((option, oIndex) => (
                  <div
                    key={oIndex}
                    className="flex items-center space-x-3 cursor-pointer"
                  >
                    {correctAnswerIndices[qIndex] === oIndex ? (
                      <span className="text-lg font-medium text-green-500 flex items-center space-x-2">
                        <FaCheckCircle className="text-xl" />
                        <span>{decodeHtmlEntities(option)}</span>
                      </span>
                    ) : userAnswers[qIndex] === oIndex ? (
                      <span className="text-lg font-medium text-red-500 flex items-center space-x-2">
                        <FaTimesCircle className="text-xl" />
                        <span>{decodeHtmlEntities(option)}</span>
                      </span>
                    ) : (
                      <span className="text-lg font-medium">
                        {decodeHtmlEntities(option)}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={handleTryAgain}
        className="mt-4 bg-emerald-500 hover:bg-emerald-700 text-white py-2 px-6 rounded-lg shadow-md block mx-auto"
      >
        Try Again
      </button>
    </div>
  );
}

export default Results;
