import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {connect, Provider} from 'react-redux';
import {createStore, Dispatch} from 'redux';
import App from './App';
import './index.css';
import { ITimeUpdateAction, timeUpdateAction } from './redux/actions';
import {IStoredState, timeReducer} from './redux/reducers';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(timeReducer);

const mapState = (state: IStoredState) => ({
  time: state.time
});

const mapDispatch = (dispatch: Dispatch<ITimeUpdateAction>) => ({
  update: () => dispatch(timeUpdateAction())
});

const AppContainer = connect(
  mapState,
  mapDispatch
)(App);

ReactDOM.render(
  <Provider store={store} >
    <AppContainer />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
