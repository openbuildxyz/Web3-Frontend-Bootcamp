import React from "react";
export default function CompletedListComponen(props) {
  return (
    <>
      <div>
        {props.completedList.map((item, index) => {
          return (
            <div key={index}>
              {item}
              &nbsp;
              <button onClick={() => props.regression(index)}>回退</button>
              &nbsp;
              <button onClick={() => props.removeCompleted(index)}>删除</button>
            </div>
          );
        })}
      </div>
    </>
  );
}
