// @flow

import React from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import reducers from './reducers';

import {
  timeUpdate,
  input,
  toggleMenu as toggleMenuAction,
  addTodo,
  toggleTodo,
  toggleShow,
} from './actions';

import Signal from './resources/signal.svg';
import Battery from './resources/battery.svg';
import Skin from './resources/skin.svg';
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
      <div className="menu-content" style={{
        height: props.toggleMenu ? '70px' : '0px'
      }} >
        <div className="panel" >
          <img className="skin" src={Skin} alt="Skin" />
        </div>
      </div>
    </div>
  );

const InputBox = (props: {
  onEnter: string => void,
  inputValue: string,
  handleChange: string => void,
}) => (
  <div className="input-box" >
    <input id="input" className="input-area" placeholder="添加新任务......"
      onKeyDown={e => { if (e.which === ENTER_KEY) props.onEnter(e.currentTarget.value) }} 
      value={props.inputValue}
      onChange={e => props.handleChange(e.currentTarget.value)}
    />
    <label className="input-label" htmlFor="input" >+</label>
  </div>
);

type todoItems = {
  id: number,
  message: string,
  completed: boolean,
  update: number,
}

const ActiveList = (props: {
  todos: Array<todoItems>,
  handleToggleTodo: number => void,
}) => (
  <div className="active-list" >
    {props.todos.map(item => (
      <div className="items" key={item.id} >
        <div className="check-box-wrapper">
          <input className="check-box" type="checkbox"
            onClick={() => props.handleToggleTodo(item.id)}
          />
        </div>
        <div className="content" >{item.message}</div>
      </div>
    ))}
  </div>
);

const ToggleButton = (props: {
  handleToggleShow: () => void,
  isShow: boolean,
}) => (
    <div className="toggle-show" onClick={props.handleToggleShow} >
      {props.isShow ? '已完成' : '显示已完成'}
    </div>
  );


type Props = {
  time: string,
  inputValue: string,
  toggleMenu: boolean,
  isShow: boolean,
  active: Array<todoItems>,
  completed: Array<todoItems>,
  timeUpdate: () => void,
  handleChange: string => void,
  handleSubmit: string => void,
  handleToggleMenu: () => void,
  handleToggleTodo: number => void,
  handleToggleShow: () => void,
}

class TodoList extends React.Component<Props> {
  componentDidMount() {
    this.props.timeUpdate();
  }

  render() {
    const {
      time,
      inputValue,
      toggleMenu,
      isShow,
      active,
      completed,
      handleToggleMenu,
      handleChange,
      handleSubmit,
      handleToggleTodo,
      handleToggleShow,
    } = this.props;
    return (
      <div className="todo-list">
        <NativeBar time={time} />
        <Header handleToggleMenu={handleToggleMenu} toggleMenu={toggleMenu} />
        <InputBox onEnter={handleSubmit} inputValue={inputValue} handleChange={handleChange} />
        <div className="list" >
          <ActiveList todos={active} handleToggleTodo={handleToggleTodo} />
          <ToggleButton isShow={isShow} handleToggleShow={handleToggleShow} />
          <ActiveList todos={completed} handleToggleTodo={handleToggleTodo} />
        </div>
      </div>
    )
  }
}

const store = createStore(reducers);

const mapStateToProps = state => ({
  time: state.time,
  inputValue: state.inputValue,
  toggleMenu: state.toggleMenu,
  isShow: state.isShow,
  active: state.todos.filter(i => !i.completed),
  completed: state.isShow ? state.todos.filter(i => i.completed) : [],
});

const mapDispatchToProps = dispatch => ({
  timeUpdate: () => { setInterval(() => dispatch(timeUpdate()), 6000) },
  handleChange: val => dispatch(input(val)),
  handleSubmit: string => dispatch(addTodo(string)),
  handleToggleMenu: () => dispatch(toggleMenuAction()),
  handleToggleTodo: id => dispatch(toggleTodo(id)),
  handleToggleShow: () => dispatch(toggleShow()),
});

const TodoListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

// Use Provider to pass store context
const wrapper = () => (
  <Provider store={store}>
    <TodoListContainer />
  </Provider>
);


export default wrapper;
