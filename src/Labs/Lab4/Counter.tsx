import { useState } from "react";

export const Counter = () => {
  const [count, setCount] = useState(7);
  console.log(count);
  return (
    <div>
      <h2>Counter: {count}</h2>
      <button
        className="bg-success text-light rounded border-0 me-2 py-2 px-3"
        onClick={() => setCount(count + 1)}
        id="wd-counter-up-click"
      >
        Up
      </button>
      <button
        className="bg-danger text-light rounded border-0 py-2 px-3"
        onClick={() => setCount(count - 1)}
        id="wd-counter-down-click"
      >
        Down
      </button>
      <hr />
    </div>
  );
};
