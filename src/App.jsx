
import Refridge from "./components/Refridge";
import FoodAdd from "./components/FoodAdd";
import Main from "./components/Main";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Refridge />} />
        <Route path="/food" element={<FoodAdd />} />
        <Route path="/recipt" element={<Main />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
