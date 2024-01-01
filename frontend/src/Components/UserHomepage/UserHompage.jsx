import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Outlet, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faGear,
  faRightFromBracket,
  faSquarePen,
} from "@fortawesome/free-solid-svg-icons";
import { faRocketchat } from "@fortawesome/free-brands-svg-icons";
import { axiosPublic } from "../axiosPublic/axiosPublic";
import axios from "axios";

const UserHompage = () => {
  const [newConversation, setNewConversation] = useState(false);
  const navigate = useNavigate();

  const { logout, user, loading } = useContext(AuthContext);

  const handleConversationSwitch = (conversationId) => {
    console.log(conversations);
    if (conversations.some((item) => item.conversation_id === conversationId)) {
      navigate(`${conversationId}`);
    }
    setCurrentConversationID(conversationId);
    axiosPublic
      .get(`/getMessages?conversationId=${conversationId}`)
      .then((res) => {
        console.log(res.data);
        setMessages(res.data);
      });
  };

  if (newConversation) {
    axiosPublic.get(`/getConversations?userMail=${user?.email}`).then((res) => {
      setConversations(res.data);
      setNewConversation(false);
    });
  }

  const [currentConversationID, setCurrentConversationID] = useState(null);
  const [messages, setMessages] = useState([]);
  axiosPublic.get("/getUsers").then((res) => {
    console.log(res.data);
  });

  const [conversations, setConversations] = useState([]);

  const handleCreateConversation = () => {
    axiosPublic
      .post("/createConversation", {
        title: "New Conversation",
        user: user?.email,
      })
      .then((res) => {
        console.log(res.data);
        setConversations([
          ...conversations,
          {
            conversation_id: res.data,
            title: "New Conversation",
            is_shared: false,
            user_id: null,
          },
        ]);
        navigate(`/chat/${res.data}`);
      });

    axiosPublic.get(`/getConversations?userMail=${user?.email}`).then((res) => {
      console.log(res.data);
      setConversations(res.data);
    });
  };

  const [showUserModal, setShowUserModal] = useState(false);

  const chatboxRef = useRef(null);
  useEffect(() => {
    if (user) {
      if (chatboxRef.current) {
        chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
      }
      console.log(user);
      axiosPublic.get(`getConversations?userMail=${user.email}`).then((res) => {
        console.log(res.data);
        setConversations(res.data);
      });

      if (currentConversationID) {
        axiosPublic
          .get(`/getQuestions?conversationId=${currentConversationID}`)
          .then((res) => {
            console.log(res.data);
            setQuestions(res.data);
          });
      }
    }
  }, [user]);

  console.log(messages);

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };
  if (loading) return <h1>Loading...</h1>;
  if (!user) {
    navigate("/auth/login");
  }

  return (
    <div className="grid grid-cols-10 rounded-xl h-screen text-white">
      <div className="col-span-2 bg-black ">
        <div className="flex justify-between flex-col h-full">
          <div className="text-white px-2 py-4">
            <button
              onClick={handleCreateConversation}
              className="flex justify-between  w-full border-2 border-slate-500 px-4 py-2 rounded-lg"
            >
              <div className="flex">
                <FontAwesomeIcon icon={faRocketchat} size="xl" />
                <p className="text-white font-medium text-xl ml-3">New chat</p>
              </div>
              <FontAwesomeIcon icon={faSquarePen} color="white" size="2xl" />
            </button>
          </div>
          <div className="h-[500px] overflow-y-auto">
            <ul className="conversation-titles flex flex-col gap-2">
              {conversations?.map((conversation, id) => (
                <li key={id}>
                  <button
                    onClick={() =>
                      handleConversationSwitch(conversation.conversation_id)
                    }
                    className="btn h-8 border-2 border-gray-500 px-4 w-full text-left rounded-md"
                  >
                    {conversation.title}
                  </button>
                </li>
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
      <Outlet
        newConversation={newConversation}
        setNewConversation={setNewConversation}
      ></Outlet>
    </div>
  );
};

export default UserHompage;
