import { Provider } from "react-redux";
import Board from "./compoentns/board";
import { store } from "./redux/store";

import "../style/style.scss";

const App = () => (   
  <Provider store={store}>
    <div id="board-container"> 
      <Board />
    </div>
  </Provider>
);

export default App;