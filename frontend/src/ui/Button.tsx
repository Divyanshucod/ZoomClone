import React from "react";
interface Props {
   children:React.ReactNode,
   onClick:()=>void
}

const Button= (props:Props) => {
  return (
     <button className="bg-blue-600 text-amber-50" onClick={props.onClick}>{props.children}</button>
  );
};

export default Button;