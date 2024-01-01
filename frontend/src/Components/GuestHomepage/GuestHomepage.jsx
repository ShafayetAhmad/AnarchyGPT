import { useContext } from "react";
import { TypeAnimation } from "react-type-animation";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";

const GuestHomepage = () => {
  const navigate = useNavigate();
  const handleGithubLogin = () => {
    const result = githubLogin();
    console.log(result);
  };

  const handleGoogle = () => {
    const result = googleLogin();
    console.log(result);
  };
  const { githubLogin, googleLogin, user, loading } = useContext(AuthContext);
  const conversationPrompts = [
    "Tell me about your day.",
    1000,
    "What's something interesting you've recently learned?",
    1000,
    "Share a funny story or joke.",
    1000,
    "What's your favorite book/movie/TV show, and why?",
    1000,
    "Do you prefer summer or winter activities? Why?",
    1000,
    "What's your take on the latest technology trends?",
    1000,
    "If you could time travel, where and when would you go?",
    1000,
    "Describe your dream vacation or adventure.",
    1000,
    "If you had a superpower, what would it be and why?",
    1000,
    "What's a life lesson you've learned recently?",
    1000,
    "Share a proud achievement or moment in your life.",
    1000,
    "What's something that always motivates or inspires you?",
    1000,
    "Teach me something new in a few sentences.",
    1000,
    "What's a fascinating fact you think most people don't know?",
    1000,
    "What's a skill you've always wanted to learn?",
    1000,
  ];
  if (loading) return <h1>Loading...</h1>;
  if (user) {
    navigate("/chat");
  }
  return (
    <div className="grid grid-cols-10">
      <div className="lg:col-span-6 bg-[#00002e]">
        <h2 className="text-[#d292ff] ml-8 mt-4 font-bold text-2xl">
          AnachyGPT<span className="text-3xl">●</span>
        </h2>
        <div className="ml-8 text-2xl text-[#d292ff] flex items-center h-screen">
          <TypeAnimation
            sequence={conversationPrompts}
            speed={50}
            style={{
              whiteSpace: "pre-line",
              height: "195px",
              display: "block",
              fontSize: "2rem",
            }}
            repeat={Infinity}
          />
        </div>
      </div>
      <div className="lg:col-span-4 flex flex-col  h-screen bg-black">
        <div className="flex h-full justify-center items-center">
          {" "}
          <div>
            <h4 className="text-white text-3xl font-bold text-center my-4">
              Get Started
            </h4>
            <div className="flex gap-4">
              <button
                className="btn bg-[#3c46ff] w-52 h-12 text-white px-10 py-2 rounded-md"
                onClick={handleGithubLogin}
              >
                Github
              </button>
              <button
                className="btn bg-[#3c46ff] h-12 w-52 text-white px-10 py-2 rounded-md"
                onClick={handleGoogle}
              >
                Google
              </button>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-white text-center my-6">AnarchyAI</h4>
          <div className="text-slate-400 text-sm flex underline justify-center  mb-12">
            <p>Terms of use</p>
            <p className="mx-3">|</p>
            <p>Privacy Policy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestHomepage;
