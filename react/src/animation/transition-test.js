// @flow

import * as React from 'react';
import { 
  StaggeredMotion, 
  Motion, 
  spring, 
  presets,
} from 'react-motion';
import type { PlainStyle, Style, OpaqueConfig } from './Types';

class Example extends React.Component<{}, { show: boolean }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      show: false,
    };
  }

  handleMouseDown = () => {
    this.setState((pre) => ({
      show: !pre.show,
    }));
  };
  
  handleTouchStart = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    this.handleMouseDown();
  };

  render() {
    const styles = ['noWobble', 'gentle', 'wobbly', 'stiff'];
    return (
      <div>
        <button
          onMouseDown={this.handleMouseDown}
          onTouchStart={this.handleTouchStart}
          style={{
            margin: '10px',
            zIndex: 999,
          }}
        >
          Toogle
        </button>
        { styles.map((s) => (
          <Motion 
            key={s}
            defaultStyle={{ x: 0 }} 
            style={{
              x: spring(this.state.show ? s.length * 5 : s.length, presets[s]),
            }}>

            { ({ x }) => (
              <div 
                style={{
                  margin: '10px',
                  padding: '5px',
                  width: `${x}em`,
                  transform: 'translate3d(0 , 0, 0)',
                  backgroundColor: 'gray',
                  }}>
                {s}
              </div>
            ) }
          </Motion>
        ))}
      </div>
    )
  }
}

class ChatHead extends React.Component<{}, {
                                        x: number | OpaqueConfig, 
                                        y: number | OpaqueConfig,
                                      }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      x: 250,
      y: 250,
    };
  }

  componentDidMount() {
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('touchmove', this.handleTouchMove);
  }

  handleMouseMove = ({ pageX: x, pageY: y }: { pageX: number, pageY: number }) => {
    this.setState({ x, y });
  };

  handleTouchMove = ({ touches }: SyntheticTouchEvent<>) => {
    this.handleMouseMove(touches[0]);
  };

  getStyles = (prevStyles: ?Array<PlainStyle>): Array<Style> => {
    if (!(prevStyles instanceof Array)) {
      return [this.state];
    }
    const endValue = prevStyles.map((_, i: number) => {
      if (!prevStyles) return this.state; // just for shut up the flow's error
      return i === 0
        ? this.state
        : {
          x: spring(prevStyles[i - 1].x, presets.gentle),
          y: spring(prevStyles[i - 1].y, presets.gentle),
        };
    });
    return endValue;
  }

  render() {
    const colors = [
      'red', 'orange', 'yellow', 'green', 
      'cyan', 'blue', 'gray'
    ];
    return (
      <StaggeredMotion
        defaultStyles={ Array(7).fill(0).map(() => ({ x: 0, y: 0 })) }
        styles={this.getStyles}>
        {balls => (
          <div style={{
            position: 'absolute',
          }} >
            {balls.map(({ x, y }, i) => (
              <div
                key={i}
                style={{
                  transform: `translate3d(${x - 12.5}px, ${y - 12.5}px, 0)`,
                  backgroundColor: colors[i],
                  width: '25px',
                  height: '25px',
                  borderRadius: '12.5px',
                  zIndex: balls.length - i,
                  position: 'absolute',
                }} />
            ))}
          </div>
          )
        }
      </StaggeredMotion>
    );
  }

}


export default { Demo1: Example, Demo2: ChatHead };
