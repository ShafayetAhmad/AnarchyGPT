import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  if (loading) return <h1>Loading...</h1>;
  if (user) {
    navigate("/userhome");
  }
  if (!user) {
    navigate("/auth/login");
  }
};

export default Homepage;
