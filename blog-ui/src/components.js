// @flow

import React from 'react';
import { Link } from 'react-router-dom';

import './components.css';

/**
 * LinkButton default black font color with white background color.
 * @param {*} props 
 */
function LinkButton(props: {
                      linkTo: string,
                      name?: string,
                      color?: string,
                      background?: string,
                      classes?: string | Array<string>,
                    }) {
  const className = 'link-button' + (props.classes
                      ? props.classes instanceof Array
                        ? ' ' + props.classes.join(' ')
                        : ' ' + props.classes
                      : '');
  return (
    <Link 
        className={className}
        style={{
          color: props.color,
          backgroundColor: props.background,
        }}
        to={'/' + props.linkTo}
      >
        {props.name}
    </Link>
  );
}

function MatchPathTest(props: {match: boolean, message: string}) {
  return props.match
    ? <div>{props.message}</div>
    : '';
}

export { LinkButton, MatchPathTest };
