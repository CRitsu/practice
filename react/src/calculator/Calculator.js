//  @flow

import React from 'react';
import { range } from 'lodash';


const NumberBox = (props: {number: number, onClick: () => void}) => (
  <div className="number-box" onClick={props.onClick} >
    {props.number}
  </div>
);

export default class Calculator extends React.Component<{}> {

  render() {
    const onClick = () => {};
    return (
      <div>
        {
          range(9).map((i) => (
            <NumberBox 
              key={i} 
              number={i} 
              onClick={onClick} />
          ))
        }
      </div>
    );
  }

}
