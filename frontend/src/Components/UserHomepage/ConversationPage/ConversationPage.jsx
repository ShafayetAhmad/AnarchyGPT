import { useParams } from "react-router-dom";
import { axiosPublic } from "../../axiosPublic/axiosPublic";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faShareFromSquare } from "@fortawesome/free-solid-svg-icons";
import anarchyLogo from "/apple-touch-icon.png";

const ConversationPage = () => {
  const conversationId = useParams().id;
  const [messages, setMessages] = useState([]);
  const chatboxRef = useRef(null);
  const { logout, user, loading } = useContext(AuthContext);

  useEffect(() => {
    axiosPublic
      .get(`/getMessages?conversationId=${conversationId}`)
      .then((res) => {
        console.log(res.data);
        setMessages(res.data);
      });
  }, [conversationId]);
  const handleAskBtn = async () => {
    setMessages([
      ...messages,
      {
        messages_id: messages[messages.length - 1].messages_id + 1,
        conversation_id: currentConversationID,
        user_id: 1,
        message_text: query,
        timestamp: new Date().toISOString().slice(11, -1),
      },
    ]);
    if (!currentConversationID) {
      await axiosPublic
        .post("/createConversation", {
          title: query,
          user: user.email,
          question: query,
        })
        .then((res) => {
          console.log(res.data);
          setCurrentConversationID(res.data);
        });
    } else {
      await axiosPublic
        .post("/addMessage", {
          conversationId: currentConversationID,
          question: query,
        })
        .then((res) => {
          console.log(res.data);
          setMessages([...messages, res.data]);
        });
    }

    setQuery("");
    document.getElementById("query").value = "";
  };
  console.log(conversationId);
  return (
    <div className="col-span-8 bg-[#2c3032] relative">
      <button className="absolute top-8 right-16">
        <FontAwesomeIcon icon={faShareFromSquare} size="2xl"></FontAwesomeIcon>
      </button>

      <div>
        hello
        <div>
          <div
            ref={chatboxRef}
            className="h-screen chatbox overflow-y-auto py-24 px-48"
          >
            {messages.map((message, id) => (
              <div key={id} className="">
                {message.user_id !== 3 ? (
                  <div className="mb-8">
                    <div className="font-bold flex">
                      <img
                        className=" ml-3 h-8 w-8 rounded-full"
                        src={user?.photoURL}
                        alt=""
                      />{" "}
                      <div className="flex items-center ml-2">You</div>
                    </div>
                    <p className=" font-bold ml-10">- {message.message_text}</p>
                  </div>
                ) : (
                  <div className="mb-8">
                    <div className="font-bold flex">
                      <img
                        className=" ml-3 h-8 w-8 rounded-full"
                        src={anarchyLogo}
                        alt=""
                      />{" "}
                      <div className="flex items-center ml-2">You</div>
                    </div>
                    <p className="ml-10">- {message.message_text}</p>
                  </div>
                )}
              </div>
            ))}
            <div className="absolute bottom-0 left-0 right-0 flex justify-center p-4  bg-[#2c3032] ">
              <div className="relative flex items-center w-96">
                <input
                  type="text"
                  name="query"
                  id="query"
                  placeholder={`Ask AnarchyGPT ${conversationId}`}
                  onChange={(e) => setQuery(e.target.value)}
                  className="border-2 border-slate-500 bg-[#2c3032] rounded-md px-4 py-2 mb-3 w-96"
                />

                <button onClick={handleAskBtn}>
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
      </div>
    </div>
  );
};

export default ConversationPage;
