import "../style/style.scss";

import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Board from "./compoentns/board";
import WelcomePage from "./compoentns/welcome-page";
import { store } from "./redux/store";

const App = () => (
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/game" element={<Board />} />
        <Route path="/online" element={<div>Not Implemented yet</div>} />
        <Route path="/watch-record" element={<div>Not Implemented yet</div>} />
      </Routes>
    </Router>
  </Provider>
);

export default App;
