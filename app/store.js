import reducer from './reducer';
import {createStore} from 'redux';

// noinspection Annotator
// noinspection Annotator
export default createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
