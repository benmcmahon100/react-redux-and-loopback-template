import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {
  Switch,
  Route,
  withRouter
} from 'react-router-dom';

import DocumentTitle from 'react-document-title';

import Header from './Header';
import Footer from './Footer';

import Home from './../Views/Home/index';

class Master extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.history.listen(function(location) {
      if (typeof window.ga === 'function') {
        window.ga('send', 'pageview', location.pathname);
      }
    });
  }

  render() {
    return (
      <DocumentTitle title = 'Site Title'>
        <div className='Master'>
          <Header />
          <Switch>
            <Route exact = {true} path = '/'>
              <Home/>
            </Route>
            <Route component={NoMatch}/>
          </Switch>
          <Footer />
        </div>
      </DocumentTitle>
    );
  }
}

const NoMatch = ({location}) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
);

Master.propTypes = {
  history: PropTypes.object
};

NoMatch.propTypes = {
  location: PropTypes.object
};


export default withRouter(Master);
