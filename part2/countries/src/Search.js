import React from "react";

const Search = ({ value, onChange }) => {
  return (
    <div>
      Search by name <input value={value} onChange={onChange} />
    </div>
  );
};

export default Search;
