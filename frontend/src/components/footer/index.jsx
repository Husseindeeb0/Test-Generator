import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook, FaXTwitter } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="bg-white p-5">
      <div className="flex flex-wrap flex-col sm:flex-row gap-5 justify-around">
        <div className="sm:hidden lg:block">
          <img src={`${process.env.PUBLIC_URL}/logo.png`} className="w-48" />
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-bold">Product</p>
          <a href="" className="hover:underline">Quiz Maker</a>
          <a href="" className="hover:underline">LMS</a>
          <a href="" className="hover:underline">Live Quizzes</a>
          <a href="" className="hover:underline">Exam Builder</a>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-bold">Use Cases</p>
          <a href="" className="hover:underline">Business</a>
          <a href="" className="hover:underline">Education</a>
          <a href="" className="hover:underline">Onboarding</a>
          <a href="" className="hover:underline">Recruitment</a>
          <a href="" className="hover:underline">Selling Courses</a>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-bold">Company</p>
          <a href="" className="hover:underline">Pricing</a>
          <a href="" className="hover:underline">Affiliates</a>
          <a href="" className="hover:underline">Terms and Privacy</a>
          <a href="" className="hover:underline">Cookie settings</a>
          <a href="" className="hover:underline">Cookie policy</a>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-bold">Resources</p>
          <a href="" className="hover:underline">Help guides</a>
          <a href="" className="hover:underline">Blogs</a>
          <a href="" className="hover:underline">Contact us</a>
        </div>
      </div>
      <hr className="my-5" />
      <div className="flex items-center">
        <div className="flex gap-3 text-2xl">
          <FaLinkedin className="text-gray-400 cursor-pointer" />
          <FaFacebook className="text-gray-400 cursor-pointer" />
          <FaXTwitter className="text-gray-400 cursor-pointer" /> 
        </div>
        <p className="text-sm mx-auto text-gray-600">Copyright &copy; TestGenerator</p>
      </div>
    </footer>
  );
}

export default Footer;
