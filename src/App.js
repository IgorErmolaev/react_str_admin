import React from "react";
import './App.css';
import MainContainer from "./components/MainContainer";
import {HashRouter} from "react-router-dom";
//import {baseNameUrl} from "./lib/config";

function App() {
  return (
      <HashRouter>
          <div>
              <MainContainer/>
          </div>
      </HashRouter>
  );
}

export default App;
