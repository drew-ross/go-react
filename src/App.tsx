import "./App.css";
import { ReactElement } from "react";

import Board from './components/Board/Board';

const App = (): ReactElement => {
  return (
    <main className='App'>
      <Board />
    </main>
  );
};

export default App;
