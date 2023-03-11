import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

//components
import ListBucket from "./components/ListBucket";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListBucket />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
