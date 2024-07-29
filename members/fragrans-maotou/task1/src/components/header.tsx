import React from "react";

interface Props {
  title?: string
}

const Header: React.FC<Props> = ({ title }) => {
  title = title ?? "Todo"
  return (
    <div className="text-base text-slate-950">
      {title}
    </div>
  )
}

export default Header;