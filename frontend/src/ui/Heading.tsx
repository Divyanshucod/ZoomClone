import React from 'react';

interface Props {
    children:React.ReactNode
}

const Heading: React.FC<Props> = (props) => {
  return (
    <h1>{props.children}</h1>
  );
};

export default Heading;