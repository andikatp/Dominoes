import { useState } from "react";

const defaultNumbers = [
  [6, 1],
  [4, 3],
  [5, 1],
  [3, 4],
  [1, 1],
  [3, 4],
  [1, 2],
];

function App() {
  const [numbers, setNumbers] = useState<number[][]>(defaultNumbers);

  const doubleNumbersCount = numbers
    .filter((number) => number[0] === number[1])
    .length.toString();

  const [input, setInput] = useState<number | null>(null);

  function reset() {
    setNumbers(defaultNumbers);
  }

  function removeDups() {
    const uniqueNumbers = numbers.filter((number) => number[0] !== number[1]);
    setNumbers(uniqueNumbers);
  }

  function sort(sortType: string) {
    let sorted = [...numbers].sort((a, b) => {
      let sumA = a[0] + a[1];
      let sumB = b[0] + b[1];

      if (sumA > sumB) {
        return 1;
      } else {
        return -1;
      }
    });
    setNumbers(sortType === "ASC" ? sorted : sorted.reverse());
  }

  function flip() {
    setNumbers(numbers.map((number) => [number[1], number[0]]));
  }

  function removeWithCertainNumber(num: number) {
    setNumbers(numbers.filter((number) => number[0] + number[1] !== num));
  }

  return (
    <div className="domino-board">
      <div className="card">
        <h1>Dominoes</h1>
        <div className="top">
          <GreyBoxes title="Source" content={JSON.stringify(defaultNumbers)} />
          <GreyBoxes title="Double Numbers" content={doubleNumbersCount} />
        </div>
        <div className="content">
          {numbers.map((numberInside, index) => (
            <Domino key={index} numbers={numberInside} />
          ))}
        </div>
        <div className="form">
          <div className="buttons">
            <button onClick={() => sort("ASC")}>Sort (ASC)</button>
            <button onClick={() => sort("DESC")}>Sort (DESC)</button>
            <button onClick={flip}>Flip</button>
            <button onClick={removeDups}>Remove Dup</button>
            <button onClick={reset}>Reset</button>
          </div>
          <div className="input-area">
            <input
              type="number"
              placeholder="Enter number"
              onChange={(e) => setInput(Number(e.target.value))}
            />
            <button onClick={() => removeWithCertainNumber(input!)}>
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function GreyBoxes({ title, content }: { title: string; content: string }) {
  return (
    <div className="grey-box">
      <h2>{title}</h2>
      <h3>{content}</h3>
    </div>
  );
}

function Domino({ numbers }: { numbers: number[] }) {
  return (
    <div className="domino">
      <h3>{numbers[0]}</h3>
      <span className="divider">-</span>
      <h3>{numbers[1]}</h3>
    </div>
  );
}

export default App;
