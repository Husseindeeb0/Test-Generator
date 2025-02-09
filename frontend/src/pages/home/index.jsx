import "./style.css";
import Footer from "../../components/footer";
import { GlobalContext } from "../../context";
import deleteTest from "../../utils/deleteTest";
import { useContext } from "react";
import { CiFileOff } from "react-icons/ci";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import { Helmet } from "react-helmet-async";

function Home() {
  const {
    accessToken,
    handleSubmit,
    fetchUserTests,
    setCategory,
    setDifficulty,
    limit,
    setLimit,
    testsData,
    loading,
    setLoading
  } = useContext(GlobalContext);
  const generatedTests = testsData.filter((test) => !test.manualTest);

  // List of categories for the quiz options
  const categoryOptions = [
    "Any Category",
    "Entertainment: Books",
    "Entertainment: Film",
    "Entertainment: Music",
    "Entertainment: Musicals & Theatres",
    "Entertainment: Television",
    "Entertainment: Video Games",
    "Entertainment: Board Games",
    "Science & Nature",
    "Science: Computers",
    "Science: Mathematics",
    "Mythology",
    "Sports",
    "Geography",
    "History",
    "Politics",
    "Art",
    "Celebrities",
    "Animals",
    "Vehicles",
    "Entertainment: Comics",
    "Science: Gadgets",
    "Entertainment: Japanese Anime & Manga",
    "Entertainment: Cartoon & Animations",
  ];

  return (
    <div>
      <Helmet>
        <meta
          name="description"
          content="Create automated tests effortlessly with our Test Generator. Choose your subject, customize questions, and generate quizzes in seconds. Simplify your assessment process today!"
        />
        <meta
          name="keywords"
          content="automated test creation, create tests online, automatic quiz generator, test maker, educational assessment, instant test creation, custom quizzes, question generation"
        />
        <link
          rel="canonical"
          href="https://kiritsu0.github.io/Test-Generator/#/home"
        />
        <title>Generate Your Tests Easily and Effortlessly</title>
      </Helmet>
      {/* Main content container with conditional opacity based on loading state */}
      <div className="transition">
        <div className="mt-10 mx-auto max-w-96 p-4 rounded-md shadow-lg bg-slate-800">
          <p className="text-white text-lg mb-5">
            To let us generate your quiz fill the below info
          </p>

          {/* Form to generate quiz by setting category, limit, and difficulty */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {/* Dropdown to select quiz category */}
            <select
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-xl px-2 py-2 text-xl shadow-md shadow-emerald-500 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            >
              {categoryOptions.map((category, index) => (
                <option key={index} value={index === 0 ? null : index + 9}>
                  {category}
                </option>
              ))}
            </select>

            {/* Input field for entering the number of quiz questions */}
            <input
              type="number"
              className="rounded-xl px-2 py-2 text-xl shadow-md shadow-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Enter the number of questions"
              required
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
            />

            {/* Dropdown to select quiz difficulty level */}
            <select
              onChange={(e) => setDifficulty(e.target.value)}
              className="rounded-xl px-2 py-2 text-xl shadow-md shadow-emerald-500 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            >
              <option value="easy" defaultChecked>
                Easy
              </option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            {/* Submit button to generate the quiz */}
            <input
              type="submit"
              value="Generate Quiz"
              className="w-full cursor-pointer text-xl bg-emerald-500 hover:bg-emerald-700 text-white rounded-md py-1"
            />
          </form>
        </div>

        {/* Section to display the generated tests */}
        <div className="bg-slate-800 min-h-52 mt-10 p-7">
          {generatedTests &&
          Array.isArray(generatedTests) &&
          generatedTests.length > 0 ? (
            <div className="flex flex-col gap-6">
              {generatedTests.map((test, testIndex) => (
                <div
                  key={testIndex}
                  className="w-full flex flex-col bg-white rounded-lg shadow-lg border border-slate-300 overflow-hidden"
                >
                  {/* Display test details */}
                  <div className="flex justify-between items-center font-semibold text-2xl p-4 text-white bg-emerald-500">
                    <span className="">Test {testIndex + 1}</span>
                    <FaTimes
                      className="cursor-pointer"
                      onClick={() => deleteTest(test._id, accessToken, fetchUserTests, setLoading)}
                    />
                  </div>

                  {/* Test content container */}
                  <div className="p-5">
                    {/* Display unique categories of the test */}
                    <div className="text-lg mb-4">
                      <span className="text-xl font-semibold block mb-2">
                        Categories:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {test.questions
                          .reduce((uniqueCategories, question) => {
                            if (!uniqueCategories.includes(question.category)) {
                              uniqueCategories.push(question.category);
                            }
                            return uniqueCategories;
                          }, [])
                          .map((category, index) => (
                            <span
                              key={index}
                              className="text-sm text-slate-700 bg-slate-100 px-2 py-1 rounded-md"
                            >
                              {category.replace("&amp;", "&")}
                            </span>
                          ))}
                      </div>
                    </div>

                    {/* Display difficulty and question count */}
                    <div className="text-lg mb-4 space-x-3">
                      <span className="text-xl font-semibold">Difficulty:</span>
                      <span className="text-slate-700 capitalize">
                        {test.questions[0].difficulty}
                      </span>
                    </div>
                    <div className="text-lg space-x-3">
                      <span className="text-xl font-semibold">
                        Questions number:
                      </span>
                      <span className="text-slate-700">
                        {test.questions.length}
                      </span>
                    </div>
                  </div>

                  {/* Link to start the test */}
                  <div className="flex justify-end p-4 bg-slate-50 border-t border-slate-300">
                    <Link
                      to="/test"
                      state={{
                        test: test.questions,
                        testIndex: testIndex,
                      }}
                      className="text-xl bg-emerald-500 hover:bg-emerald-700 text-white rounded-lg py-2 px-4"
                    >
                      Start Test
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Display message when no tests are generated
            <div className="flex flex-col items-center gap-5 text-4xl text-white">
              No Generated Test
              <CiFileOff />
            </div>
          )}
        </div>
      </div>

      {/* Loading spinner displayed in the center while loading */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 transition">
          <BeatLoader
            color="#2d8160"
            loading={loading}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}

      {/* Render footer */}
      <Footer />
    </div>
  );
}

export default Home;
