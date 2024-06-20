/*
 * @Author: Jacket-mzl
 * @Date: 2024-06-04 16:37:59
 * @LastEditors: Jacket-mzl
 * @LastEditTime: 2024-06-04 17:02:34
 * @Description:
 */
import Logo from "./../../assets/images/logo.png";
import "./Header.css";
export default function Header() {
  return (
    <div className="header">
      <img src={Logo} alt="" />
    </div>
  );
}
