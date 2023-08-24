import React from "react";

import "./VTlist.css";

function VTlist(props) {
  const Clicked = () => {
    props.onClick(props.index);
  };

  return (
    <li key={props.index} style={{ listStyle: "none", textAlign: "left" }}>
      <button
        className="section__Jobs-buttonCompany"
        onClick={Clicked}
        style={
          props.activeTabId === props.index
            ? { color: "rgb(55, 93, 187)" }
            : { color: "#8892b0" }
        }
      >
        {props.data.expData.company}
      </button>
    </li>
  );
}

export default VTlist;
