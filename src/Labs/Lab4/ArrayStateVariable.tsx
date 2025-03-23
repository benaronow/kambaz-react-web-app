import { useState } from "react";

export default function ArrayStateVariable() {
  const [array, setArray] = useState([1, 2, 3, 4, 5]);
  const addElement = () => {
    setArray([...array, Math.floor(Math.random() * 100)]);
  };
  const deleteElement = (index: number) => {
    setArray(array.filter((_, i) => i !== index));
  };
  return (
    <div id="wd-array-state-variables">
      <h2>Array State Variable</h2>
      <button
        className="bg-success text-light rounded border-0 p-2 mb-2"
        onClick={addElement}
      >
        Add Element
      </button>
      <ul className="list-group">
        {array.map((item, index) => (
          <li key={index} className="list-group-item">
            <span className="h5 me-5">{item}</span>
            <button
              className="bg-danger text-light rounded border-0 p-2"
              onClick={() => deleteElement(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <hr />
    </div>
  );
}
