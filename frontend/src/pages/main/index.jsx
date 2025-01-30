import Footer from "../../components/footer";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import { MdOutlineBusinessCenter } from "react-icons/md";
import { GrGroup } from "react-icons/gr";

function Main() {
  return (
    <div>
      <section className="h-1/2 pt-28 pb-5 flex flex-col md:flex-row gap-5 md:gap-0 justify-around items-center bg-cyan-700">
        <div className="max-w-[28rem] space-y-7 mx-5">
          <p className="text-5xl text-white">
            Powerful online test and quiz maker
          </p>
          <p className="text-3xl text-white">
            Create, send, and analyze your tests, quizzes, and assessments for
            free with FlexiQuiz.
          </p>
          <Link
            to="/home"
            className="bg-emerald-500 hover:bg-cyan-700 border-2 border-transparent hover:border-white w-60 md:w-64 transition-all ease-in delay-150 duration-200 px-6 py-2 rounded-full flex gap-2 hover:gap-5 items-center md:text-xl text-white"
          >
            Get started for free
            <FaArrowRight className="text-lg" />
          </Link>
        </div>
        <img
          src={`${process.env.PUBLIC_URL}/image_1.png`}
          alt="side-image"
          className="w-3/4 min-w-72 h-96 mx-5 rounded-xl shadow-custom"
        />
      </section>

      <section>
        <h1 className="text-4xl text-center my-16 text-white">
          <span className="font-semibold text-black">It’s simple!</span> Here’s
          how it works
        </h1>
        <div className="flex justify-center flex-wrap gap-5 m-5">
          {/* Create Card */}
          <div className="bg-white hover:bg-emerald-500 hover:scale-105 transition-all duration-300 ease-linear max-w-96 min-h-96 rounded-md p-5 flex flex-col items-center gap-5 shadow-custom">
            <img
              src={`${process.env.PUBLIC_URL}/create.svg`}
              className="w-44 h-36"
              alt="Create"
            />
            <h2 className="text-4xl font-bold">Create</h2>
            <p className="text-center text-lg">
              Quickly{" "}
              <span className="font-bold">create great looking tests</span>{" "}
              using multiple question types and formatting options.
            </p>
          </div>

          {/* Save Card */}
          <div className="bg-white hover:bg-emerald-500 hover:scale-105 transition-all duration-300 ease-linear max-w-96 min-h-96 rounded-md p-5 flex flex-col items-center gap-5 shadow-custom">
            <img
              src={`${process.env.PUBLIC_URL}/save.svg`}
              className="w-44 h-36"
              alt="Save"
            />
            <h2 className="text-4xl font-bold">Save</h2>
            <p className="text-center text-lg">
              Save your tests{" "}
              <span className="font-bold">for easy access anytime</span>, so you
              can take them whenever you're ready.
            </p>
          </div>

          {/* Analyze Card */}
          <div className="bg-white hover:bg-emerald-500 hover:scale-105 transition-all duration-300 ease-linear max-w-96 min-h-96 rounded-md p-5 flex flex-col items-center gap-5 shadow-custom">
            <img
              src={`${process.env.PUBLIC_URL}/analyze.svg`}
              className="w-44 h-36"
              alt="Analyze"
            />
            <h2 className="text-4xl font-bold">Analyze</h2>
            <p className="text-center text-lg">
              TestGenerator{" "}
              <span className="font-bold">
                instantly marks and grades your tests
              </span>{" "}
              and provides powerful reports for in-depth analysis across all
              responses.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h1 className="text-4xl text-center my-24 text-white">
          <span className="font-semibold text-black">Who </span>
          uses TestGenerator
        </h1>
        <div className="flex justify-center flex-wrap gap-5 m-5">
          {/* Teachers Card */}
          <div className="hover:scale-105 transition-all duration-300 ease-linear max-w-96 min-h-96 rounded-md p-5 flex flex-col items-center gap-5 hover:shadow-custom">
            <LuGraduationCap className="text-9xl text-white" />
            <h2 className="text-4xl font-bold text-white">Teachers</h2>
            <p className="text-center text-lg text-white">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam
              voluptas veritatis, maxime sit impedit suscipit sunt dolorem,
              provident dolore cumque rerum molestiae vero doloribus esse? Omnis
              nostrum nobis doloremque! Modi iusto inventore sequi libero.
              Repellendus quis, autem nobis voluptate amet aspernatur asperiores
              hic voluptates error ducimus, nisi nesciunt ad nulla.
            </p>
          </div>

          {/* Businesses Card */}
          <div className="hover:scale-105 transition-all duration-300 ease-linear max-w-96 min-h-96 rounded-md p-5 flex flex-col items-center gap-5 hover:shadow-custom">
            <MdOutlineBusinessCenter className="text-9xl text-white" />
            <h2 className="text-4xl font-bold text-white">Businesses</h2>
            <p className="text-center text-lg text-white">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt
              iure, consequatur quos labore assumenda, debitis architecto
              reiciendis suscipit autem magni veritatis temporibus ea, doloribus
              nesciunt enim. Commodi, nulla nam! Eum velit, tempore nesciunt
              perspiciatis eligendi eaque earum corporis explicabo dolor
              expedita sit omnis sequi tempora excepturi iusto iure alias
              perferendis!
            </p>
          </div>

          {/* Individuals Card */}
          <div className="hover:scale-105 transition-all duration-300 ease-linear max-w-96 min-h-96 rounded-md p-5 flex flex-col items-center gap-5 hover:shadow-custom">
            <GrGroup className="text-9xl text-white" />
            <h2 className="text-4xl font-bold text-white">Individuals</h2>
            <p className="text-center text-lg text-white">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla
              deleniti quibusdam cupiditate iste fuga consectetur tempora, sequi
              eius accusamus voluptatum animi reiciendis voluptate, odio vel
              iusto praesentium adipisci voluptatibus excepturi omnis laudantium
              soluta ab culpa hic atque. Alias officia ipsum velit quia
              reiciendis numquam explicabo corrupti sequi eligendi, architecto
              aliquam.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-20 mx-5">
        <h1 className="text-3xl text-center mt-24 text-white">
          Thousands of organizations rely on TestGenerator
        </h1>
        <div className="flex justify-center gap-10 my-10">
          <div className="text-white w-52 border-r-2">
            <b className="block text-3xl text-emerald-500">50m+</b>
            tests taken
          </div>
          <div className="text-white w-52 border-r-2">
            <b className="block text-3xl text-emerald-500">100+</b>
            countries around the world
          </div>
          <div className="text-white w-52">
            <b className="block text-3xl text-emerald-500">3m+</b>
            questions asked a week
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Main;
