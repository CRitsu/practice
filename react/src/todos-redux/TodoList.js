// @flow

import React from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import reducers from './reducers';
import { Transition } from 'react-spring';

import {
  timeUpdate,
  toggleMenu as toggleMenuAction,
  addTodo,
} from './actions';

import Signal from './resources/signal.svg';
import Battery from './resources/battery.svg';
import './todolist.css';


const ENTER_KEY = 13;

const NativeBar = (props: { time: string }) => (
  <div className="native-bar" >
    <img className="bar-items signal" src={Signal} alt="signal" />
    <div className="bar-items time" >
      {props.time}
    </div>
    <img className="bar-items battery" src={Battery} alt="battery" />
  </div>
);


const showMenu = styles => (
  <div className="menu-content" style={styles} >
    <div className="panel" >
    </div>
  </div>
);

const hideMenu = () => null;

const Header = (props: {
  toggleMenu: boolean,
  handleToggleMenu: () => void,
}) => (
  <div className="header" >
    <div className={`menu-wrapper ${props.toggleMenu ? 'clicked' : ''}`} >
      <svg version="1.1" className="menu" onClick={props.handleToggleMenu} >
        <g>
          <rect x="0" y="0" className="menu-graph" width="25" height="2" />
          <rect x="0" y="8" className="menu-graph" width="25" height="2" />
          <rect x="0" y="16" className="menu-graph" width="25" height="2" />
        </g>
      </svg>
    </div>
    <div className="title" >Todo List</div>
    <Transition from={{ height: '0px' }}
      enter={{ height: '70px' }}
      leave={{ height: '0px' }} >
      {props.toggleMenu ? showMenu : hideMenu}
    </Transition>
  </div>
);

const InputBox = (props: { onEnter: string => void,}) => (
  <div className="input-box" >
    <input id="input" className="input-area" placeholder="添加新任务......"
      onKeyDown={(e) => { if (e.which === ENTER_KEY) props.onEnter(e.currentTarget.value) }} />
    <label className="input-label" htmlFor="input" >+</label>
  </div>
);

const ActiveList = () => (
  <div className="active-list" >
    <div className="items" >
      <div className="check-box" />
      <div className="content" >contents</div>
    </div>
    <div className="items" >
      <div className="check-box" />
      <div className="content" >The Input Widget Event property, when set to onkeyup or onkeydown will return a keyCode of 13 under Android and iOS for my devices.</div>
    </div>
  </div>
);

type Props = {
  time: string,
  toggleMenu: boolean,
  timeUpdate: () => void,
  handleSubmit: string => void,
  handleToggleMenu: () => void,
}

class TodoList extends React.Component<Props> {
  componentDidMount() {
    this.props.timeUpdate();
  }

  render() {
    const {
      time,
      toggleMenu,
      handleToggleMenu,
      handleSubmit,
    } = this.props;
    return (
      <div className="todo-list">
        <NativeBar time={time} />
        <Header handleToggleMenu={handleToggleMenu} toggleMenu={toggleMenu} />
        <InputBox onEnter={handleSubmit} />
        <ActiveList />
      </div>
    )
  }
}

const store = createStore(reducers);

const mapStateToProps = state => ({
  time: state.time,
  toggleMenu: state.toggleMenu,
  active: state.todos.filter(i => !i.completed),
  completed: state.todos.filter(i => i.completed),
});

const mapDispatchToProps = dispatch => ({
  timeUpdate: () => { setInterval(() => dispatch(timeUpdate()), 6000) },
  handleSubmit: string => dispatch(addTodo(string)),
  handleToggleMenu: () => dispatch(toggleMenuAction()),
});

const TodoListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);


const wrapper = () => (
  <Provider store={store}>
    <TodoListContainer />
  </Provider>
);



export default wrapper;
