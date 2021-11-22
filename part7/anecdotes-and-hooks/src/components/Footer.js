import React from "react";

const Footer = () => {
  const style = { marginTop: 10 };

  return (
    <div style={style}>
      Anecdote app for{" "}
      <a href="https://courses.helsinki.fi/fi/tkt21009">
        Full Stack -websovelluskehitys
      </a>
      . See{" "}
      <a href="https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js">
        https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js
      </a>{" "}
      for the source code.
    </div>
  );
};

export default Footer;
