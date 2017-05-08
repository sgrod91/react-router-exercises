import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import ReduxThunk from 'redux-thunk';
import CounterContainer from './counter/Counter';
import counterReducer from './counter/Counter.reducer';
import GalleryContainer from './gallery/Gallery';
import galleryReducer from './gallery/Gallery.reducer';
import DragonGameContainer from './dragon/Dragon';
import dragonGameReducer from './dragon/Dragon.reducer';
import WeatherContainer from './weather/Weather';
import weatherReducer from './weather/Weather.reducer';
import { Router, Route, hashHistory, Link, IndexLink, IndexRoute } from 'react-router';
import './index.css';

const AppLayout = (props) =>
  <div>
    <div className="nav">
      <ul>
        <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
        <li><Link to="/counter" activeClassName="active">Counter</Link></li>
        <li><Link to="/gallery" activeClassName="active">Gallery</Link></li>
        <li><Link to="/dragon" activeClassName="active">Dragon</Link></li>
        <li><Link to="/weather/Atlanta" activeClassName="active">Atlanta</Link></li>
        <li><Link to="/weather/Chicago" activeClassName="active">Chicago</Link></li>
      </ul>
    </div>
    <div>
      {props.children}
    </div>
  </div>;

const reducer = Redux.combineReducers({
  theCount: counterReducer,
  galleryInfo: galleryReducer,
  dragonGame: dragonGameReducer,
  weather: weatherReducer
});

const store = Redux.createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  Redux.applyMiddleware(ReduxThunk)
);

const HomePage = ({ children }) =>
  <div>
    <h1>Welcome!</h1>
    <p>Have a look around!</p>
    {children}
  </div>;

ReactDOM.render(
  <ReactRedux.Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={AppLayout}>
        <IndexRoute component={HomePage}/>
        <Route path="/counter" component={CounterContainer}/>
        <Route path="/gallery" component={GalleryContainer}/>
        <Route path="/dragon" component={DragonGameContainer}/>
        <Route path="/weather/:name" component={WeatherContainer}/>
      </Route>
    </Router>
  </ReactRedux.Provider>,
  document.getElementById('root')
);
