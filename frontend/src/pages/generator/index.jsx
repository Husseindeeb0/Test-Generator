import Questions from "../questions";
import Footer from "../../components/footer";
import { useState, useContext } from "react";
import { GlobalContext } from "../../context";
import { Helmet } from "react-helmet-async";

function Generator() {
  // Destructure context values to set number of questions, title, and description
  const { setQuestionsTestNum, setTestTitle, setManualTestDifficulty } =
    useContext(GlobalContext);

  // State to control whether the test info form is shown or the questions component
  const [showInfoInput, setShowInfoInput] = useState(true);

  // State to store user input for number of questions, title, and description
  const [number, setNumber] = useState("");
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");

  // Function to handle the submission of test info form
  const handleTestInfo = (e) => {
    e.preventDefault(); // Prevent form default submission behavior
    setQuestionsTestNum(number); // Set the number of questions in the context
    setManualTestDifficulty(difficulty);
    setTestTitle(title);
    setShowInfoInput(false); // Hide form and show questions component
  };

  return (
    <div>
      <Helmet>
        <meta
          name="description"
          content="Manually create custom tests with our Test Generator. Design your own questions, choose formats, and build assessments tailored to your needs. Start creating your test today!"
        />
        <meta
          name="keywords"
          content="manual test creation, create custom tests, test builder, personalized quizzes, question design, educational tools, assessment creation"
        />
        <link
          rel="canonical"
          href="https://kiritsu0.github.io/Test-Generator/#/generator"
        />
        <title>Manually Create Your Custom Tests</title>
      </Helmet>

      <div className="flex flex-col justify-center items-center mx-10 my-5 mb-24">
        {showInfoInput ? (
          <div>
            <div>
              <p className="text-lg font-semibold text-white max-w-96">
                Fill the test information below to generate your own test
                questions!
              </p>
            </div>

            {/* Form to input test information */}
            <div className="w-full max-w-96 p-4 rounded-md shadow-lg bg-slate-800">
              <form className="space-y-4" onSubmit={handleTestInfo}>
                {/* Input field for test title */}
                <input
                  type="text"
                  name="title"
                  placeholder="Enter title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                {/* Input field for number of questions */}
                <input
                  type="number"
                  name="number"
                  placeholder="Enter the number of questions"
                  required
                  max="15"
                  min="1"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />

                {/* Dropdown to select quiz difficulty level */}
                <select
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                >
                  <option value="easy" defaultChecked>
                    Easy
                  </option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>

                {/* Submit button to move to the next step */}
                <input
                  type="submit"
                  value="Next"
                  className="w-full cursor-pointer text-xl bg-emerald-500 hover:bg-emerald-700 text-white rounded-md py-1"
                />
              </form>
            </div>
          </div>
        ) : (
          // Render Questions component after submitting test info
          <Questions />
        )}
      </div>

      {/* Render footer */}
      <Footer />
    </div>
  );
}

export default Generator;
