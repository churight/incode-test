import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { BoardsPage } from "./pages/BoardsPage";
import { BoardPage } from "./pages/BoardPage";
//import { useAppSelector } from "./app/hooks";
//import { BoardLoader } from "./components/BoardLoader";
//import { BoardPage } from "./components/BoardPage";

function App() {
  //const board = useAppSelector(state => state.board.board);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BoardsPage />} />
        <Route path="/board/:hashId" element={<BoardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
