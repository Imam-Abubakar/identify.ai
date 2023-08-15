import { useState, } from "react";
import { Routes, Route } from "react-router";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import History from "./pages/History";
import Scanner from "./pages/Scanner";
import ScanResult from "./pages/ScanResult.jsx";
import HistoryDetails from "./pages/HistoryDetails";
import DeviceOrientation, { Orientation } from 'react-screen-orientation';
import { UserContext } from "./context/UserContext";

function App() {
  const [userID, setUserID] = useState(false);

  return (
    <DeviceOrientation lockOrientation={'portrait'}>
      <Orientation orientation='portrait' alwaysRender={false}>
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
      </Orientation>
    </DeviceOrientation>
  );
}

export default App;