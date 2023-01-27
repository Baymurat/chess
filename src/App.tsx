import { Provider } from "react-redux";
import Board from "./compoentns/board";
import { store } from "./redux/store";
import WelcomePage from "./compoentns/welcome-page";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "../style/style.scss";
import React from "react";

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