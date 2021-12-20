import { useState } from "react";
import Typed from "typed.js";
import "./App.css";
import content from "./content.json";
import { interval } from "./utils";

type Stories = {
  chapter: string;
  text: string;
  choices: {
    value: string;
    jump: number;
  }[];
}[];

function App() {
  const stories: Stories = content.stories;
  const [position, setPosition] = useState(0);

  const nextText = async (jump: number = 1) => {
    typed.destroy();

    setPosition(position + jump);

    typed.toggle();
  };

  if (!stories[position]) {
    return (
      <div className="buttons" style={{ display: "flex" }}>
        <button onClick={() => (window.location.href = "/")}>
          Recommencer
        </button>
      </div>
    );
  }

  document
    .querySelectorAll(".buttons")
    .forEach((b) => b.setAttribute("style", "opacity:0"));

  const typed = new Typed("#typed", {
    strings: [stories[position].text],
    typeSpeed: 1,
    cursorChar: "",
    onComplete: () => {
      document
        .querySelectorAll(".buttons")
        .forEach((b) => b.setAttribute("style", "opacity:1"));
    },
  });
  const value = stories[position].choices[0].value;
  const chap = document.getElementById("chapter");
  if (chap) {
    chap.textContent = stories[position].chapter;
  }

  if (stories[position].chapter.includes("Joyeuses")) {
    interval();
  }

  return (
    <div className="App">
      {value ? (
        <div className="buttons">
          <button onClick={() => nextText(stories[position].choices[0].jump)}>
            {value}
          </button>
          <button onClick={() => nextText(stories[position].choices[1].jump)}>
            {stories[position].choices[1].value}
          </button>
        </div>
      ) : (
        <div className="buttons">
          <button onClick={() => (window.location.href = "/")}>
            Recommencer
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
