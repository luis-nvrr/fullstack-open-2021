import React from "react";

const Filter = ({ value, onChange, onBlur }) => {
  return (
    <div>
      filter shown with
      <input value={value} onChange={onChange} onBlur={onBlur} />
    </div>
  );
};

export default Filter;
