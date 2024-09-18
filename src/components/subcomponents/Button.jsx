import React, { Children } from "react";
import { Link } from "react-router-dom";

const Button = ({
  width = "36",
  color = "bg-green-300",
  to = "#",
  extraClasses,
  children,
}) => {
  return (
    <Link
      to={to}
      className={`rounded-sm w-${width} ${color} inline-block p-2 text-center hover:bg-green-400 ${extraClasses}`}
    >
      {children}
    </Link>
  );
};

export default Button;
