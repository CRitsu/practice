// @flow

import React from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import reducers from './reducers';

import {
  timeUpdate,
} from './actions';

import Signal from './resources/signal.svg';
import Battery from './resources/battery.svg';
import menu from './resources/menu.svg';
import './todolist.css';


const NativeBar = (props: {time: string}) => (
  <div className="native-bar" >
    <img className="bar-items signal" src={Signal} alt="signal" />
    <div className="bar-items time" >
      {props.time}
    </div>
    <img className="bar-items battery" src={Battery} alt="battery" />
  </div>
);

const Header = () => (
  <div className="header" >
    <img className="menu" src={menu} alt="menu" />
    <div className="title" >Todo List</div>
  </div>
);

type Props = {
  time: string,
  timeUpdate: () => void,
}

class TodoList extends React.Component<Props> {
  componentDidMount() {
    this.props.timeUpdate();
  }

  render() {
    return (
      <div className="todo-list">
        <NativeBar time={this.props.time} />
        <Header />
      </div>
    )
  }
}

const store = createStore(reducers);

const mapStateToProps = state => ({
  time: state.time,
});

const mapDispatchToProps = dispatch => ({
  timeUpdate: () => { setInterval(() => dispatch(timeUpdate()), 6000) },
});

const TodoListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);


const  wrapper = () => (
  <Provider store={store}>
    <TodoListContainer />
  </Provider>
);



export default wrapper;
