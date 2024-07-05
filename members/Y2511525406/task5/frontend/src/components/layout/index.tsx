/*
 * @Author: Jacket-mzl
 * @Date: 2024-06-26 14:39:23
 * @LastEditors: Jacket-mzl
 * @LastEditTime: 2024-06-26 15:03:26
 * @Description:
 */
import { PropsWithChildren } from "react";
import Header from "./Header";

export default function Layout(props: PropsWithChildren) {
  return (
    <div className="w-10/12 m-auto md:w-11/12 sm:w-full">
      <Header></Header>
      <div>{props.children}</div>
    </div>
  );
}
