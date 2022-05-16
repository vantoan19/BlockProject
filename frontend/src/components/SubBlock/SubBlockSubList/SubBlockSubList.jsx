import React from "react";
import "./subblocksublist.scss";

const SubBlockSubList = (props) => {
  const blockList = props.subBlocks;
  const blockListItems = blockList.map((block) => {
     return <span className="list-item">{block.content}</span>;
  });

  return <div className="list-item-container">{blockListItems}</div>;
};

export default SubBlockSubList;
