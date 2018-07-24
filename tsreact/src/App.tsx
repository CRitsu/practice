import Button from '@material-ui/core/Button';
import * as React from 'react';
import 'typeface-roboto';
import './App.css';
import {ITimeUpdateAction} from './redux/actions';


interface ITimerProps {
  time: string;
}

interface IProps {
  time: string,
  update: () => ITimeUpdateAction,
}

const Timer = (props: ITimerProps) => (
  <div>
    {props.time}
  </div>
);

class App extends React.Component<IProps> {
  public componentDidMount() {
    setInterval(this.props.update, 1000);
  }

  public render() {
    return (
      <div className="App">
        <Timer time={this.props.time} />
        <Button variant="outlined" color="primary" >
          HOME
        </Button>
      </div>
    );
  }
}

export default App;
