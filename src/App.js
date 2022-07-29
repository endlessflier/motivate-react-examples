import "./styles.css";
import React, { useState } from "react";
import Glance from "./Glance";
import Tree from "./Tree";
import InfiniteScroll from "./InfiniteScroll";

const nameArray = ["InfiniteScroll", "Tree", "Glance"];

const componentArray = [<InfiniteScroll />, <Tree />, <Glance />];
export default function App() {
  const [mode, setMode] = useState(0);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <p>This is a {nameArray[mode]}</p>
      <button
        onClick={() => {
          setMode((mode + 1) % componentArray.length);
        }}
      >
        Click Here
      </button>
      {componentArray[mode]}
    </div>
  );
}
