import "./AppName.css";
import "react-awesome-button/dist/styles.css";

import NavbarButtons from "./ui/NavbarButtons";
import {
  TypewriterEffect,
  TypewriterEffectSmooth,
} from "./ui/typewriter-effect";
function AppName() {
  const words = [
    {
      text: "Hey,",
      className: "typewriter-word1",
    },
    {
      text: "Welcome",
      className: "typewriter-word2",
    },
    {
      text: "Tadaa",
      className: "typewriter-word3",
    },
  ];

  return (
    <>
      <div className="navbar-container">
        <TypewriterEffectSmooth words={words} />
        <NavbarButtons />
      </div>
    </>
  );
}

export default AppName;
