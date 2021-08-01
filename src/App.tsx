import "./App.css";
import { ReactElement } from "react";

import Board from './components/Board/Board';
import Footer from "./components/Footer/Footer";

const App = (): ReactElement => {
  return (
    <main className='App'>
      <h1>Go-React</h1>
      <Board />
      <Footer />
    </main>
  );
};

export default App;
