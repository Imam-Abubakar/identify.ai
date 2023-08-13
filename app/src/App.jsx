import { useState, } from "react";
import { Routes, Route } from "react-router";
import Landing from "./pages/landing";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/home";
import History from "./pages/history";
import Scanner from "./pages/scanner";
import ScanResult from "./pages/scan-result.jsx";
import HistoryDetails from "./pages/history-details";
import DeviceOrientation, { Orientation } from 'react-screen-orientation';
import { UserContext } from "./context/UserContext";

function App() {
  const [userID, setUserID] = useState(false);
  const user = window.localStorage.getItem("userID");

  return (
    <DeviceOrientation lockOrientation={'portrait'}>
      <Orientation orientation='portrait' alwaysRender={false}>
        <UserContext.Provider value={{ userID, setUserID }}>
          <Routes>
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Signup />} />
            <Route exact path="/scan" element={<Scanner />} />
            <Route exact path="/scan/:id" element={<ScanResult />} />
            <Route exact path="/history" element={<History />} />
            <Route exact path="/history/:id" element={<HistoryDetails />} />
          </Routes>
        </UserContext.Provider>
      </Orientation>
    </DeviceOrientation>
  );
}

export default App;