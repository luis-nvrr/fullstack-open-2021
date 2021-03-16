import React from "react";
import Statistic from "./Statistic";

const Statistics = ({ textArray, valueArray }) => {
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
        <Statistic text={textArray[0]} value={valueArray[0]} />
        <Statistic text={textArray[1]} value={valueArray[1]} />
        <Statistic text={textArray[2]} value={valueArray[2]} />
        <Statistic text={textArray[3]} value={valueArray[3]} />
        <Statistic text={textArray[4]} value={valueArray[4]} />
        <Statistic text={textArray[5]} value={valueArray[5]} />
      </tbody>
    </table>
  );
};

export default Statistics;
