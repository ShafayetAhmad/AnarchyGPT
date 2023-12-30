import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";

const UserHompage = () => {
  const navigate = useNavigate();
  const { logout, user } = useContext(AuthContext);
  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };
  return (
    <div className="grid grid-cols-10 rounded-xl h-screen text-white">
      <div className="col-span-2 bg-black ">
        <div className="flex justify-between flex-col h-full">
          <div>1</div>
          <div className="px-4 mb-4">
            <button className="btn w-full h-16 rounded-md ">
              <div className="flex">
                <img
                  className=" ml-3 h-10 w-10 rounded-full"
                  src={user?.photoURL}
                  alt=""
                />
                <div className="flex items-center ml-4 font-bold">{user?.displayName}</div>
              </div>
            </button>
          </div>
          {
            //<div className="flex justify-center mb-8">
            //               <button
            //   className="btn w-48 h-12 bg-green-500 rounded-md text-black font-extrabold text-xl"
            //   onClick={handleLogout}
            // >
            //   LogOut
            //               </button>
            // </div>
          }
        </div>
      </div>
      <div className="col-span-8 bg-[#2c3032]">right</div>
    </div>
  );
};

export default UserHompage;
