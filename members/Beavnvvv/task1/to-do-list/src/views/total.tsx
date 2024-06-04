import "../style/total.css";

function TotalComponent({ total, isDoneTotal }) {
  return (
    <div className="total-container">
      <span>
        当前待办事项<h3>{total}</h3>
      </span>
      <span>
        当前已完成事项<h3>{isDoneTotal}</h3>
      </span>
    </div>
  );
}

export default TotalComponent;
