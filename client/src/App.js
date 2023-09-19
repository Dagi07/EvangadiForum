import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Landing from "./Components/Landing";
import Footer from "./Components/Footer";
import SignUp from "./Components/SignUp";
import AskQuestion from "./Components/AskQuestion";
import QandA from "./Components/QandA";
import { useContext, useEffect } from "react";
import UserContext from "./context/UserContext";
import axios from "axios";

function App() {
  // import the global data from UserContext
  const [userData, setUserData] = useContext(UserContext);

  const checkLoggedIn = async () => {
    // check if token already exists in localStorage
    let token = localStorage.getItem("auth-token");
    if (token === null) {
      //  token not in localStorage then set auth token empty
      localStorage.setItem("auth-token", "");
      token = "";
    } else {
      // if token in localStorage then use auth to verify token and get user info
      const userRes = await axios({
        method: "get",
        url: "/users",
        data: {
          headers: { "x-auth-token": token },
        },
      });

      // set the global state with user info
      setUserData({
        token,
        user: {
          id: userRes?.data.data.user_id,
          display_name: userRes?.data.data.user_name,
        },
      });
    }
  };

  const logout = () => {
    // set global state to undefined will logout the user
    setUserData({
      token: undefined,
      user: undefined,
    });
    // resetting localStorage
    localStorage.setItem("auth-token", "");
  };

  // login checker
  useEffect(() => {
    // check if the user is logged in
    checkLoggedIn();
  }, []);

  // console.log(userData);
  return (
    <Router>
      <div className="App">
        <Routes>
<<<<<<< HEAD
          {/* <Route
            path="/forgetpassword"
            element={
              <>
                <Forgetpass />
              </>
            }
          /> */}
          {/* <Route
            path="/code"
            element={
              <>
                <Code_enter />
              </>
            }
          /> */}
          {/* <Route
            path="/newPassword"
            element={
              <>
                <NewPass />
              </>
            }
          /> */}
=======
>>>>>>> parent of f44fab9 (Finals touches)
          <Route
            path="/home"
            element={
              <>
                <Header logout={logout} />
                <Home />
                <Footer />
              </>
            }
          />
          <Route
            path="/register"
            element={
              <>
                <Header />
                <SignUp />
                <Footer />
              </>
            }
          />
          <Route
            path="/ask"
            element={
              <>
                <Header logout={logout} />
                <AskQuestion />
                <Footer />
              </>
            }
          />
          <Route
            path="/q-a-detail"
            element={
              <>
                <Header logout={logout} />
                <QandA />
                <Footer />
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                <Header />
                <Landing />
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
