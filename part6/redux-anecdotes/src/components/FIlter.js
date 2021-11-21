import React from "react";
import { connect } from "react-redux";
import { changeFilter } from "../reducers/filterReducer";

const Filter = (props) => {
  const filter = props.filter;

  const handleChange = (event) => {
    const filterValue = event.target.value;
    props.changeFilter(filterValue);
  };

  const style = {
    marginTop: 20,
    marginBottom: 20,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} value={filter} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
  };
};

const mapDispatchToProps = {
  changeFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
