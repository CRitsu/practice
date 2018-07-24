// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import './game.css';

function Square(props) {
  return (
    <button
      className={"square " + props.className}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

function calculateWinner(squares: Array<?string>):[?string, ?Array<number>] {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a]
      && squares[a] === squares[b]
      && squares[b] === squares[c]) {
      return [squares[a], [a, b, c]];
    }
  }
  return [undefined, undefined];
}

function calculatePlace(i: number) {
  let cells = [];
  for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 3; j++) {
      cells.push([i, j]);
    }
  }
  return '(' + String(cells[i]) + ')';
}

function transformStep(history, arcOrDesc, stepNumber) {
  if (arcOrDesc) return [history, stepNumber];
  const reversed = history.slice().reverse();
  const before = history[stepNumber];
  return [reversed, reversed.indexOf(before)];
}


type Props = {
  winnerLine: ?Array<number>,
  squares: Array<?string>,
  onClick: (i: number) => mixed,
};

class Board extends React.Component<Props> {
  renderSquare(i: number) {
    const line = this.props.winnerLine;

    return (
      <Square key={i}
        className={line ?
          line.indexOf(i) !== -1 ? 'higlight-winner' : '' : ''}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const rows = Array(3).fill(1).map((content, index) => {
      let count = index * 3;
      const row = Array(3).fill(1).map(() => {
        return this.renderSquare(count++);
      });
      return (
        <div key={index} className="board-row">
          {row}
        </div>
      );
    });

    return (
      <div>
        {rows}
      </div>
    );
  }
}

class Game extends React.Component<{}, 
                        {
                          history: Array<{
                            squares: Array<?string>, 
                            target: {place: number, player: string} | null
                          }>, 
                          xIsNext: boolean, 
                          stepNumber: number,
                          ascOrder: boolean,
                          theWinner?: [?string, ?Array<number>] | null,
                        }> {
  constructor() {
    super();
    this.state = {
      history: [{
        squares: Array(9).fill(undefined),
        target: null,
      }],
      xIsNext: true,
      stepNumber: 0,
      ascOrder: true,
    };
  }

  handleClick(i: number) {
    const history = this.state.history.slice(
      0,
      this.state.stepNumber + 1
    );
    const squares = history[this.state.stepNumber].squares.slice();
    if (squares[i] || calculateWinner(squares)[0]) {
      return
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    const [winner, line] = calculateWinner(squares);
    this.setState({
      history: history.concat([{
        squares: squares,
        target: { player: String(squares[i]), place: i },
      }]),
      xIsNext: !this.state.xIsNext,
      theWinner: winner ? [squares[i], line] : null,
      stepNumber: history.length,
    });
  }

  jumpTo(step: number) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  toggleOrder() {
    this.setState({
      ascOrder: !this.state.ascOrder,
    });
  }

  render() {
    const history = this.state.history.slice();
    const order = this.state.ascOrder;
    const stepNumber = this.state.stepNumber;
    const current = history[stepNumber];
    const [winner, line] = calculateWinner(current.squares);

    // on the situation of desc, we have to calculate the true place of 
    // the step.
    const [trueHistory,] =
      transformStep(history, order, stepNumber);

    const moves = trueHistory.map((step, index) => {
      // The variable move is used for juntTo so we have to make it's  
      // value correctly in the origin history array.
      // If order is true, means asc order. It's okay.
      // If false, means desc order. The function will reverse the array
      // and find the place correctly.
      const [, move] = transformStep(trueHistory, order, index);
      const target = step.target;
      const desc = target ?
        'Back to step #'
        + String(calculatePlace(target.place))
        + ' by '
        + target.player :
        'Restart the game';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>
            {
              desc + (
                stepNumber === move ?
                  ' [CURRENT]' : ''
              )
            }
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else if (current.squares.indexOf(null) === -1) {
      status = 'Game over but no one wins!';
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            winnerLine={line}
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <button onClick={() => this.toggleOrder()}>
            {this.state.ascOrder ? 'ASC ORDER' : 'DESC OREDER'}
          </button>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

Square.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  value: PropTypes.string
}

Board.propTypes = {
  winnerLine: PropTypes.array,
  squares: PropTypes.array,
  onClick: PropTypes.func
}

export default Game
