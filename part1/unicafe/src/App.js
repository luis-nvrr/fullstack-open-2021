import React, { useState } from "react";
import Button from "./Button";
import Header from "./Header";
import Statistics from "./Statistics";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
    setAll(all + 1);
    setAverage(average + 1);
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
    setAll(all + 1);
  };

  const handleBad = () => {
    setBad(bad + 1);
    setAll(all + 1);
    setAverage(average - 1);
  };

  const getAverage = () => {
    return average / all;
  };

  const getPositivePercentage = () => {
    return (good / all) * 100;
  };

  return (
    <div>
      <div>
        <Header title="give feedback" />
        <Button name="good" handleClick={handleGood} />
        <Button name="neutral" handleClick={handleNeutral} />
        <Button name="bad" handleClick={handleBad} />
      </div>
      <div>
        <Header title="statistics" />
        <Statistics
          textArray={["good", "neutral", "bad", "all", "average", "positive"]}
          valueArray={[
            good,
            neutral,
            bad,
            all,
            getAverage(),
            getPositivePercentage(),
          ]}
        />
      </div>
    </div>
  );
};

export default App;
