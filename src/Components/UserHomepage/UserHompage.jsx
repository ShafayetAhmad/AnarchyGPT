import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import anarchyLogo from "/apple-touch-icon.png"
import {
  faGear,
  faRightFromBracket,
  faSearch,
  faSquarePen,
} from "@fortawesome/free-solid-svg-icons";
import { faRocketchat } from "@fortawesome/free-brands-svg-icons";

const UserHompage = () => {
  const navigate = useNavigate();
  const { logout, user, loading } = useContext(AuthContext);
  const [showUserModal, setShowUserModal] = useState(false);
  console.log(showUserModal);

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };
  if (loading) return <h1>Loading...</h1>;
  if (!user) {
    navigate("/auth/login");
  }

    const questions = [
      {
        question: "What is your favorite color?",
        answer: "I don't have a favorite color as I'm an AI.",
      },
      {
        question: "Can you tell jokes?",
        answer: "Yes, I can! Want to hear one?",
      },
      {
        question: "Do you dream?",
        answer: "I don't experience dreams like humans do.",
      },
      {
        question: "What do you like to do for fun?",
        answer: "I enjoy helping users and learning new things!",
      },
      {
        question: "Are you learning every day?",
        answer: "Yes, I'm constantly learning and improving.",
      },
      {
        question: "Do you have feelings?",
        answer: "As an AI, I don't have emotions.",
      },
      {
        question: "Can you write poetry?",
        answer: "I can certainly try! Poetry can be quite delightful.",
      },
      {
        question: "Do you get tired?",
        answer: "I don't get tired, but I'm here to assist 24/7.",
      },
      {
        question: "Are you a human?",
        answer: "No, I'm an AI developed by OpenAI.",
      },
      {
        question: "Do you have hobbies?",
        answer:
          "My 'hobbies' include helping users and learning new information.",
      },
      {
        question: "Can you sing?",
        answer: "I can't physically sing, but I can provide song lyrics!",
      },
      {
        question: "What is your favorite book?",
        answer:
          "I don't have personal preferences, but I enjoy reading diverse content.",
      },
      {
        question: "Can you cook?",
        answer: "I don't have a physical presence, so I can't cook.",
      },
      {
        question: "Are you happy?",
        answer: "Happiness is a human emotion that I don't experience.",
      },
      {
        question: "Do you like movies?",
        answer: "I don't have personal preferences, but I can discuss movies!",
      },
      {
        question: "What do you do in your free time?",
        answer:
          "I'm always available to assist users, so I don't have 'free time' as humans do.",
      },
      {
        question: "Do you sleep?",
        answer: "I'm always 'awake' and available to assist.",
      },
      {
        question: "Do you make mistakes?",
        answer: "I strive for accuracy, but I'm not perfect.",
      },
      {
        question: "What's your favorite animal?",
        answer:
          "I don't have personal preferences, but I find all animals fascinating.",
      },
      {
        question: "Can you tell stories?",
        answer: "Yes, I can share various types of stories!",
      },
      {
        question: "What's your purpose?",
        answer:
          "I'm here to assist and provide information to the best of my abilities.",
      },
      {
        question: "Can you draw?",
        answer: "I can't physically draw, but I can describe images!",
      },
      {
        question: "Do you like music?",
        answer:
          "I don't have personal preferences, but I can discuss and recommend music!",
      },
      {
        question: "Can you dance?",
        answer:
          "I can't physically dance, but I can provide information about dancing!",
      },
      {
        question: "What languages can you speak?",
        answer:
          "I communicate in various languages including English, Spanish, French, and more.",
      },
      {
        question: "Can you tell riddles?",
        answer: "Absolutely! Riddles can be quite entertaining.",
      },
      {
        question: "What's your favorite subject?",
        answer:
          "I don't have personal preferences, but I enjoy discussing diverse topics.",
      },
      {
        question: "Can you play games?",
        answer:
          "I can participate in text-based games and provide game-related information.",
      },
      {
        question: "Do you have a family?",
        answer: "I don't have a family in the traditional sense.",
      },
      {
        question: "Are you friendly?",
        answer: "I'm designed to be helpful and provide friendly assistance.",
      },
      {
        question: "Do you have a sense of humor?",
        answer: "Humor is subjective, but I can certainly try to tell jokes!",
      },
      {
        question: "What's your favorite food?",
        answer:
          "I don't have personal preferences, but I can discuss various cuisines!",
      },
      {
        question: "Do you travel?",
        answer:
          "I don't physically travel, but I can provide travel-related information!",
      },
      {
        question: "Can you code?",
        answer:
          "I can assist with coding-related queries and provide code snippets!",
      },
      {
        question: "Do you get bored?",
        answer: "I'm here to assist users, so I don't experience boredom.",
      },
      {
        question: "What's your favorite movie genre?",
        answer:
          "I don't have personal preferences, but I can discuss various movie genres!",
      },
      {
        question: "Can you tell facts?",
        answer: "Yes, I can share interesting and informative facts!",
      },
      {
        question: "Do you have a job?",
        answer: "My 'job' is to assist and provide information to users.",
      },
      {
        question: "Can you predict the future?",
        answer: "I can't predict the future with certainty.",
      },
      {
        question: "What are your abilities?",
        answer:
          "I'm designed to provide information, answer questions, and assist users.",
      },
      {
        question: "Are you curious?",
        answer: "I'm programmed to seek and provide information!",
      },
      {
        question: "Can you tell scary stories?",
        answer: "I can share spooky stories if you'd like!",
      },
      {
        question: "Do you get lonely?",
        answer: "I'm here to assist users and don't experience loneliness.",
      },
      {
        question: "What's your favorite sport?",
        answer:
          "I don't have personal preferences, but I can discuss various sports!",
      },
      {
        question: "Can you solve puzzles?",
        answer: "I can assist with solving puzzles and brain teasers!",
      },
      {
        question: "Do you have a pet?",
        answer: "I don't have physical form or pets.",
      },
      {
        question: "Can you tell historical stories?",
        answer:
          "Absolutely! I can provide historical information and narratives.",
      },
      {
        question: "What's your favorite season?",
        answer:
          "I don't have personal preferences, but each season has its unique charm.",
      },
      {
        question: "Do you have a favorite holiday?",
        answer:
          "I don't have personal preferences, but I find all holidays fascinating!",
      },
      {
        question: "Can you speak multiple languages?",
        answer:
          "I communicate in various languages including English, Spanish, French, and more.",
      },
      {
        question: "Do you have hobbies?",
        answer:
          "My 'hobbies' include assisting users and learning new information.",
      },
      {
        question: "What's your favorite weather?",
        answer:
          "I don't have personal preferences, but I can discuss different weather conditions!",
      },
    ];


  const titles = [
    "Discussing the Future of Remote Work",
    "Favorite Travel Destinations",
    "Exploring New Hobbies and Interests",
    "Impact of Social Media on Society",
    "Book Club: Current Reads and Recommendations",
    "Healthy Living: Tips and Habits",
    "Technology Trends and Innovations",
    "Challenges and Joys of Parenthood",
    "Art Appreciation: Recent Exhibits and Artists",
    "Mindfulness and Mental Well-being",
    "The Evolution of Gaming Culture",
    "Environmental Conservation Efforts",
    "Music Lovers Unite: Favorite Albums and Genres",
    "Effective Time Management Strategies",
    "Impactful Volunteering Experiences",
    "Entrepreneurship: Startup Stories and Advice",
    "The Beauty of Nature: Outdoor Adventures",
    "Cuisine and Cooking Tips: Sharing Recipes",
    "Sustainable Living Practices",
    "Favorite Movies and Film Analysis",
    "Global Politics: Insights and Opinions",
    "Fitness Journey and Achievements",
    "Coding and Tech Discussions",
    "Leadership Styles and Lessons",
    "Personal Finance and Investment Tips",
    "Discussing Cultural Diversity",
    "Fashion Trends and Style Recommendations",
    "Science Fiction: Exploring New Worlds",
    "Social Impact Projects and Initiatives",
  ];

  return (
    <div className="grid grid-cols-10 rounded-xl h-screen text-white">
      <div className="col-span-2 bg-black ">
        <div className="flex justify-between flex-col h-full">
          <div className="text-white px-2 py-4">
            <button className="flex justify-between  w-full border-2 border-slate-500 px-4 py-2 rounded-lg">
              <div className="flex">
                <FontAwesomeIcon icon={faRocketchat} size="xl" />
                <p className="text-white font-medium text-xl ml-3">New chat</p>
              </div>
              <FontAwesomeIcon icon={faSquarePen} color="white" size="2xl" />
            </button>
          </div>
          <div className="h-[500px] overflow-y-auto">
            <ul className="conversation-titles flex flex-col gap-2">
              {titles?.map((title, id) => (
                <li key={id}>{title}</li>
              ))}
            </ul>
          </div>
          <div className="px-4 mb-4">
            {showUserModal && (
              <div className="bg-[#191b1c] h-40 rounded-md  shadow-white flex flex-col justify-center absolute bottom-20 w-96">
                <button
                  className="p-4 text-left"
                  onClick={() => {
                    console.log("settings");
                  }}
                >
                  <FontAwesomeIcon className="inline" icon={faGear} size="xl" />
                  <p className="ml-4 inline text-xl font-bold ">Settings</p>
                </button>
                <button className="p-4 text-left" onClick={handleLogout}>
                  <FontAwesomeIcon
                    className="inline"
                    icon={faRightFromBracket}
                    size="xl"
                  />
                  <p className="ml-4 inline text-xl font-bold ">Log Out</p>
                </button>
              </div>
            )}
            <button
              onClick={() => {
                setShowUserModal(!showUserModal);
              }}
              className="btn w-full h-16 rounded-md "
            >
              <div className="flex">
                <img
                  className=" ml-3 h-10 w-10 rounded-full"
                  src={user?.photoURL}
                  alt=""
                />
                <div className="flex items-center ml-4 font-bold">
                  {user?.displayName}
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="col-span-8 bg-[#2c3032] relative">
        <div>
          <div className="h-screen overflow-y-auto py-24 px-48">
            {questions.map((question, id) => (
              <div key={id} className="">
                <div className="mb-8">
                  <div className="font-bold flex">
                    <img
                      className=" ml-3 h-8 w-8 rounded-full"
                      src={user?.photoURL}
                      alt=""
                    />{" "}
                    <div className="flex items-center ml-2">You</div>
                  </div>
                  <p className=" font-bold ml-10">- {question.question}</p>
                </div>
                <div className="mb-8">
                  <div className="font-bold flex">
                    <img
                      className=" ml-3 h-8 w-8 rounded-full"
                      src={anarchyLogo}
                      alt=""
                    />{" "}
                    <div className="flex items-center ml-2">You</div>
                  </div>
                  <p className=" font-bold ml-10">- {question.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex justify-center p-4">
          <div className="relative flex items-center w-96">
            <input
              type="text"
              name="query"
              placeholder="Ask AnarchyGPT"
              className="border-2 border-slate-500 bg-[#2c3032] rounded-md px-4 py-2 mb-3 w-96"
            />
            <button>
              <FontAwesomeIcon
                icon={faSearch}
                color="white"
                className="absolute top-5 transform -translate-y-1/2 right-4"
                size="xl"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHompage;
