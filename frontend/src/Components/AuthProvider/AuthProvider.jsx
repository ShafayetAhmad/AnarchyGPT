/* eslint-disable react/prop-types */

import { createContext, useEffect, useState } from "react";
import auth from "../../firebase.config";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import Swal from "sweetalert2";
import { axiosPublic } from "../axiosPublic/axiosPublic";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const googleAuthProvider = new GoogleAuthProvider();
  const githubAuthProvider = new GithubAuthProvider();

  const googleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      Swal.fire({
        title: "Google Login Successful",
        customClass: {
          background: "bg-gray-500",
        },
      });
      setUser(result.user);
      axiosPublic
        .post("/addUser", {
          email: result.user.email,
          username: result.user.displayName,
        })
        .then((res) => {
          console.log(res);
        });
      return result;
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  const githubLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, githubAuthProvider);
      Swal.fire("Github Login Successful");
      setUser(result.user);
      return result;
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  const logout = async () => {
    setLoading(true);
    await signOut(auth);
    Swal.fire("Logout successful");
    setLoading(false);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("user on auth changed: ", currentUser);
      setUser(currentUser);
      setLoading(false);
    });
    return () => unSubscribe();
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        loading,
        githubLogin,
        googleLogin,
        user,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
