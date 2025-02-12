import { GlobalContext } from "../../context";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import deleteTest from "../../utils/deleteTest";

function ManualTests() {
  const { testsData, fetchUserTests, setLoading, accessToken } = useContext(GlobalContext);
  const manualTests = testsData.filter((test) => test.manualTest);
  return (
    <div className="bg-slate-800 min-h-52 mt-10 p-7">
      {manualTests && Array.isArray(manualTests) && manualTests.length > 0 ? (
        <div className="flex flex-col gap-6">
          {manualTests.map((test, testIndex) => (
            <div
              key={testIndex}
              className="w-full flex flex-col bg-white rounded-lg shadow-lg border border-slate-300 overflow-hidden"
            >
              {/* Display test details */}
              <div className="flex justify-between items-center font-semibold text-2xl p-4 text-white bg-emerald-500">
                <span className="">Test {testIndex + 1}</span>
                <FaTimes
                  className="cursor-pointer"
                  onClick={() =>
                    deleteTest(
                      test._id,
                      accessToken,
                      fetchUserTests,
                      setLoading
                    )
                  }
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
          Start generating your own tests from here
          <Link
            to="/generator"
            className="cursor-pointer px-3 py-2 text-xl text-white bg-emerald-500 hover:bg-emerald-700 rounded-md"
          >
            Generate Test
          </Link>
        </div>
      )}
    </div>
  );
}

export default ManualTests;
