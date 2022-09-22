import "./styles.css";
import Box from "./component/Box";
import { useState, useRef } from "react";

export default function App() {
  // initialize box count
  const [boxCount, setBoxCount] = useState(50);
  const [boxes, setBoxes] = useState(initialBoxes());
  // use ref for input element
  const ref = useRef(0);

  function initialBoxes() {
    let temp = [];
    for (let i = 0; i < boxCount; i++) {
      temp.push({ boxId: i, show: false });
    }
    return temp;
  }

  // box click handler
  const boxClickHandler = (event) => {
    event.stopPropagation();
    if (event.target.className !== "box") return;
    const index = Number(event.target.getAttribute("data-id"));
    console.log(index);
    setBoxes((prevState) => {
      // deep copy entire state array
      let newState = JSON.parse(JSON.stringify(prevState));
      // let newState = Object.assign([], prevState);
      newState[index].show = !newState[index].show;
      return newState;
    });
  };

  // add box handler
  const addBoxHandler = (event) => {
    event.stopPropagation();
    if (event.target.localName !== "button") return;
    const increment = Number(ref.current.value);

    // TODO: use useReducer hook here since boxCount and boxes are tightly coupled together
    setBoxCount((prevBoxCount) => {
      return prevBoxCount + increment;
    });
    setBoxes((prevState) => {
      // deep copy entire state array
      let newState = JSON.parse(JSON.stringify(prevState));
      const existingLength = prevState.length;
      for (let i = 0; i < increment; i++) {
        newState.push({ boxId: existingLength + i, show: false });
      }
      return newState;
    });
  };

  return (
    <div className="App">
      <div className="box-container" onClick={boxClickHandler}>
        {boxes.map((box) => {
          return (
            <Box key={"box-" + box.boxId} value={box.boxId} show={box.show} />
          );
        })}
      </div>
      <div className="box-controls">
        <input
          placeholder="enter no of boxes to add"
          type="number"
          min="1"
          ref={ref}
        />
        <button onClick={addBoxHandler}>Add more boxes</button>
      </div>
    </div>
  );
}
