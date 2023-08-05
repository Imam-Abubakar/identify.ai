import { Routes, Route } from "react-router";
import Landing from "./pages/landing";

function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
    </Routes>
  );
}

export default App;