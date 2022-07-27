import React, { useState, useEffect } from "react";

function Glance() {
  const [count, setCount] = useState(0);
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
    console.log("effect count", count);
  });

  return (
    <div className="Glance">
      <p>You clicked {count} times</p>
      <button
        onClick={() => {
          setCount(count + 1);
          console.log(count);
        }}
      >
        Click me
      </button>
    </div>
  );
}

export default Glance;
