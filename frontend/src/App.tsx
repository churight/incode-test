import "./App.css";
import { useAppSelector } from "./app/hooks";
import { BoardLoader } from "./components/BoardLoader";
import { BoardPage } from "./components/BoardPage";

function App() {
  const board = useAppSelector(state => state.board.board);

  return (
    <>
      <BoardLoader />
      {board && <BoardPage />}
    </>
  );
}

export default App;
