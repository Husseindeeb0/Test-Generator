import { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../../context";
import { useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";

function Questions() {
  const navigate = useNavigate();
  const {
    questionsTestNum,
    saveTest,
    testTitle,
    manualTestDifficulty,
    loading,
    setLoading,
  } = useContext(GlobalContext);

  // State to manage the list of questions
  const [questions, setQuestions] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);

  useEffect(() => {
    // Set loading state and initialize questions with default values
    setLoading(true);
    setQuestions(
      Array(parseInt(questionsTestNum)).fill({
        question: "",
        options: ["", "", ""],
      })
    );
    setCorrectAnswers([]);
    setLoading(false);
  }, [questionsTestNum, setLoading, setCorrectAnswers]);

  // Handle changes in the question text
  const handleQuestionChange = (index, value) => {
    const newQuestions = questions.map((q, i) =>
      i === index ? { ...q, question: value } : q
    );
    setQuestions(newQuestions);
  };

  // Handle changes in the options text
  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuestions = questions.map((q, i) =>
      i === qIndex
        ? { ...q, options: q.options.map((o, j) => (j === oIndex ? value : o)) }
        : q
    );
    setQuestions(newQuestions);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const testData = questions.map((question, index) => {
      const incorrectAnswers = question.options.filter(
        (option, i) => option !== question.options[correctAnswers[index]]
      );

      return {
        category: testTitle,
        question: question.question,
        correct_answer: question.options[correctAnswers[index]],
        incorrect_answers: incorrectAnswers,
        difficulty: manualTestDifficulty,
      };
    });
    console.log("TestData:", testData)
    await saveTest(testData, true);

    if (questions.length > 0) {
      navigate("/manualtests", { replace: true }); // Navigate to the test page
    }
  };

  // Handle the correct option selection for each question
  const handleCorrectOption = (qIndex, value) => {
    setCorrectAnswers((prevCorrectAnswers) => {
      const newCorrectAnswers = [...prevCorrectAnswers];
      newCorrectAnswers[qIndex] = parseInt(value) - 1; // Store the index of the correct option
      return newCorrectAnswers;
    });
  };

  return (
    <div>
      {loading ? (
        // Display a loader while loading data
        <div className="absolute top-1/2 loader-centered transition">
          <BeatLoader
            color="#2d8160"
            loading={loading}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="mx-2">
          <p className="text-lg font-semibold text-white">
            Fill the below questions and their options
          </p>
          <form
            className="w-full max-w-xl p-4 rounded-md shadow-lg bg-white"
            onSubmit={handleSubmit}
          >
            {questions.map((q, qIndex) => (
              <div key={qIndex}>
                <input
                  type="text"
                  required
                  value={q.question}
                  onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                  className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder={`Question ${qIndex + 1}`}
                />
                <div className="">
                  <div className="flex gap-5">
                    {q.options.map((option, oIndex) => (
                      <input
                        key={oIndex}
                        type="text"
                        required
                        value={option}
                        onChange={(e) =>
                          handleOptionChange(qIndex, oIndex, e.target.value)
                        }
                        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder={`Option ${oIndex + 1}`}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <label name="number" className="font-semibold">
                      Enter the Number of the correct option above:
                    </label>
                    <input
                      type="number"
                      name="number"
                      placeholder="Number"
                      required
                      max="3"
                      min="1"
                      value={
                        correctAnswers[qIndex] !== undefined
                          ? correctAnswers[qIndex] + 1
                          : ""
                      }
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === "") {
                          handleCorrectOption(qIndex, "");
                        } else {
                          const intValue = parseInt(value, 10);
                          if (!isNaN(intValue)) {
                            handleCorrectOption(qIndex, intValue);
                          }
                        }
                      }}
                      className="w-32 px-3 py-2 focus:outline-none"
                    />
                  </div>
                </div>
                <hr className="my-5 bg-emerald-500 h-1" />
              </div>
            ))}
            <input
              type="submit"
              value="Generate Test"
              className="w-full h-9 cursor-pointer text-xl text-white bg-emerald-500 hover:bg-emerald-700 rounded-md"
            />
          </form>
        </div>
      )}
    </div>
  );
}

export default Questions;
