import React, { useEffect, useState } from "react";
import "./notebookpage.scss";
import Block from "../../components/Block/Block";
import RowCard from "../../components/UI/RowCard/RowCard";
import ColumnCard from "../../components/UI/ColumnCard/ColumnCard";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";

const getCurBlockView = (blockTree, path) => {
  let curBlock = blockTree;
  path.forEach((step) => {
    curBlock = curBlock.subBlocks[step];
  });
  console.log(curBlock);
  return curBlock;
};

const getStringPath = (pathArr) => {
  let stringPath = "root";
  if (pathArr.length > 0) {
    stringPath += "-";
    stringPath += pathArr.map((step) => step.toString()).join("-");
  }
  return stringPath;
};

const NotebookPage = () => {
  const [path, setPath] = useState([]);
  const [data, setData] = useState({
    content: "Root page",
    subBlocks: [],
  });
  const [blockView, setBlockView] = useState({
    content: "Root page",
    subBlocks: [],
  });

  const goDownHandler = (index) => {
    setPath((prevPath) => {
      return [...prevPath, index];
    });
    setBlockView(getCurBlockView(data, path));
  };

  const goUpHandler = () => {
    setPath((prevPath) => {
      return [...prevPath].slice(0, -1);
    });
    setBlockView(getCurBlockView(data, path));
  };

  const getData = async () => {
    const response = await fetch("http://localhost:4000/api/export");
    const result = await response.json();
    setData(() => {
      return {
        content: "Root page",
        subBlocks: result,
      };
    });
    setBlockView(() => getCurBlockView(data, path));
  };

  useEffect(() => {
    getData();
  });

  return (
    <div className="notebook-page">
      <RowCard className="page-header-wrapper">
        <ColumnCard>
          <h1 className="page-header">{blockView.content}</h1>
          <p className="page-id">{"path: " + getStringPath(path)}</p>
        </ColumnCard>
        {path.length > 0 && (
          <ArrowCircleUpIcon className="go-up-icon" onClick={goUpHandler} />
        )}
      </RowCard>
      {blockView.subBlocks.map((block, index) => {
        return (
          <Block
            content={block.content}
            subBlocks={block.subBlocks}
            index={index}
            goDownHandler={goDownHandler}
          />
        );
      })}
    </div>
  );
};

export default NotebookPage;
