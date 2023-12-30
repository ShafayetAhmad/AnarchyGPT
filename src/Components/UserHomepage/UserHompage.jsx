import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faRightFromBracket,
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
            <div className="flex justify-between mx-4 border-2 border-slate-500 px-4 py-2 rounded-lg">
              <div className="flex">
                <FontAwesomeIcon icon={faRocketchat} size="xl" />
                <p className="text-white font-medium text-xl ml-3">New chat</p>
              </div>
              <FontAwesomeIcon icon={faSquarePen} color="white" size="2xl" />
            </div>
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
              <div className="bg-[#191b1c] h-40 rounded-md  shadow-white flex flex-col justify-center">
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
        <div className="absolute bottom-0 left-0 right-0 flex justify-center p-4">
          <input
            type="text"
            name="query"
            placeholder="Ask AnarchyGPT"
            className="border-2 border-slate-500 bg-[#2c3032] rounded-md px-4 py-2 mb-3 w-96"
          />
        </div>
      </div>
    </div>
  );
};

export default UserHompage;
