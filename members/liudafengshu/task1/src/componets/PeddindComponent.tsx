import React from "react";
export default function PeddindComponent(props) {
  return (
    <>
      <div>
        {props.peddindList.map((item, index) => {
          return (
            <div key={index}>
              {item}
              &nbsp;
              <button onClick={() => props.fulfillment(index)}>完成</button>
              &nbsp;
              <button onClick={() => props.removePedding(index)}>删除</button>
            </div>
          );
        })}
      </div>
    </>
  );
}
