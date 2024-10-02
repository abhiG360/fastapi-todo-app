import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const NavbarButtons = () => {
  return (
    <div className="space-x-3">
      <button
        onClick={() =>
          window.open("https://www.linkedin.com/in/abhimanyu-gaur16/", "_blank")
        }
        className="relative px-2 py-2 font-bold text-white group"
        aria-label="LinkedIn"
      >
        <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-2 -translate-y-2 bg-blue-600 group-hover:translate-x-0 group-hover:translate-y-0"></span>
        <span className="absolute inset-0 w-full h-full border-4 border-black"></span>
        <span className="relative flex items-center">
          <FaLinkedin className="mr-2" />
          LinkedIn
        </span>
      </button>

      <button
        onClick={() =>
          window.open("https://github.com/abhiG360", "_blank")
        }
        className="relative px-2 py-2 font-bold text-white group"
        aria-label="GitHub"
      >
        <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-2 -translate-y-2 bg-green-600 group-hover:translate-x-0 group-hover:translate-y-0"></span>
        <span className="absolute inset-0 w-full h-full border-4 border-black"></span>
        <span className="relative flex items-center">
          <FaGithub className="mr-2" />
          GitHub
        </span>
      </button>

      <button
        className="relative px-2 py-2 font-bold text-white group"
        aria-label="Contact Me"
        onClick={()=>window.open("https://forms.gle/ZipkYcTUYFBReubq8", "_blank")}
      >
        <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-2 -translate-y-2 bg-purple-600 group-hover:translate-x-0 group-hover:translate-y-0"></span>
        <span className="absolute inset-0 w-full h-full border-4 border-black"></span>
        <span className="relative flex items-center">
          <MdEmail className="mr-2" />
          Contact Me
        </span>
      </button>
    </div>
  );
};

export default NavbarButtons;
