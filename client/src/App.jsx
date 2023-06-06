import { Routes, Route } from "react-router-dom"
import "./assets/styles/main.css"
import Home from "./pages/Home"
import Add from "./pages/Add"

export default function App() {
  return (
    <div className="w-full mx-auto">
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add-criminals" element={<Add />} />
    </Routes>
    </div>
  )
}