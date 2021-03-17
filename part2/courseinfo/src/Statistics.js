import React, {useState} from "react";
import Statistic from "./Statistic";

const Statistics = ({ textArray, valueArray }) => {
  const [count, setCount] = useState(0);
  if (valueArray[3] === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }
  return (
    <table>
      <tbody>
        {
          textArray.map( item => {
          <Statistic text={item} value={valueArray[count]} key={item}/> 
          setCount(count+1)
        })
        }
      </tbody>
    </table>
  );
};

export default Statistics;
