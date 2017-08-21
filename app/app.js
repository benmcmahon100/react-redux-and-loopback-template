import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import {
  BrowserRouter
} from 'react-router-dom';

import store from './store';
// import * as colors from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Master from './Components/Master';

require('./main.styl');

/*
const theme = {
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: colors.green900,
    primary2Color: colors.green700,
    primary3Color: colors.grey400,
    accent1Color: colors.teal700,
    accent2Color: colors.grey100,
    accent3Color: colors.grey500,
    textColor: colors.darkBlack,
    alternateTextColor: colors.white,
    canvasColor: colors.white,
    borderColor: colors.grey300,
    pickerHeaderColor: colors.green500,
    shadowColor: colors.fullBlack,
  }
};
*/

injectTapEventPlugin();

ReactDOM.render(
  <Provider store = {store} >
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <BrowserRouter>
        <Master />
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
