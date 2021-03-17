import React from "react";

const PersonForm = (props) => {
  const { onSubmit, nameValue, nameOnChange, numberValue, numberOnChange } = {
    ...props,
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={nameValue} onChange={nameOnChange} />
      </div>
      <div>
        number: <input value={numberValue} onChange={numberOnChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
