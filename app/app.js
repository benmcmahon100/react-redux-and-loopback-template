import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';

import Master from './Components/Master';

ReactDOM.render(
  <Provider store = {store} >
    <Master />
  </Provider>,
  document.getElementById('root')
);
