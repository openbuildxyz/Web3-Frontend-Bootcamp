/*
 * @Author: Jacket-mzl
 * @Date: 2024-06-26 14:37:15
 * @LastEditors: Jacket-mzl
 * @LastEditTime: 2024-06-26 21:47:48
 * @Description:
 */
import "./style.css";
import { LoadingOutlined } from "@ant-design/icons";
type ButtonProps = {
  className?: string;
  isLoading?: boolean;
  style?: string;
  children: React.ReactNode;
};
export default function Button(props: ButtonProps) {
  const { className: ClassName, isLoading, style: buttonStyle } = props;
  return (
    <div className={`button ${ClassName}`}>
      <div style={{ display: isLoading ? "inline" : "none" }} className="mr-2">
        <LoadingOutlined />
      </div>
      <span>{props.children}</span>
    </div>
  );
}
