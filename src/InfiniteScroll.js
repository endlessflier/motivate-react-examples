import { useState, useEffect, useRef } from "react";

const helperGetData = (page) => {
  const data = [];
  for (let i = page * 10; i < page * 10 + 10; i++) {
    data.push(i);
  }
  return data;
};

const getResults = (page) => {
  const sleep = Math.floor(Math.random() * 1000);
  return new Promise((resolve) => {
    setTimeout(() => resolve(helperGetData(page)), sleep);
  });
};

function InfiniteScroll() {
  const [status, setStatus] = useState({ mode: 0, data: Array(5).fill([]) });
  const startPageRef = useRef(0);
  const containerScrollRef = useRef();
  // console.log("rendered", status);
  const loading = async () => {
    const newPagedata = Array.from({ length: 5 }, (v, i) => i);
    const result = await Promise.all(
      newPagedata.map((pageIndex) => {
        return getResults(startPageRef.current + pageIndex);
      })
    );
    // console.log("loading rendered", result);
    if (status.data.length === startPageRef.current + 5) {
      const newdata = status.data.map((value, index) =>
        index < startPageRef.current
          ? [...value]
          : [...result[index - startPageRef.current]]
      );
      setStatus({ mode: 2, data: newdata });
    } else {
      setStatus({ mode: 2, data: [...status.data, ...result] });
    }
    return result;
  };

  const myScroll = () => {
    loading(startPageRef.current);
  };

  useEffect(() => {
    setStatus({ ...status, mode: 1 });
  }, []);

  useEffect(() => {
    console.log("effect rendered");
    if (status.mode === 1) {
      myScroll();
    } else if (status.mode === 2 && startPageRef.current) {
      containerScrollRef.current.scrollTo({
        top:
          containerScrollRef.current.scrollTop +
          containerScrollRef.current.clientHeight,
        behavior: "smooth"
      });
    }
  }, [status.mode]);

  return (
    <div
      className="container"
      ref={containerScrollRef}
      onScroll={() => {
        if (
          containerScrollRef.current.clientHeight +
            containerScrollRef.current.scrollTop ===
          containerScrollRef.current.scrollHeight
        ) {
          startPageRef.current += 5;
          setStatus({ ...status, mode: 1 });
        }
      }}
    >
      {status.data.map((row, rowindex) => (
        // rowindex < status.data.length - 2 * (status.mode % 2) &&
        <div className="row" key={rowindex}>
          {row?.map((value, index) => (
            <div key={value} className="box">
              {value}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default InfiniteScroll;
