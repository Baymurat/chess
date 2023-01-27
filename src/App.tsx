import { Provider } from "react-redux";
import Board from "./compoentns/board";
import { store } from "./redux/store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "../style/style.scss";
import React from "react";

const App = () => (   
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<>HELLO</>} />
        <Route path="/game" element={
          <div id="board-container"> 
            <Board />
          </div>
        } />
      </Routes>
    </Router>
  </Provider>
);

export default App;