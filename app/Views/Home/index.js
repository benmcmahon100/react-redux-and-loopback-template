import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

const mapStateToProps = connect(state => {
  return (state);
});

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className = 'Home' />
    );
  }
}

export default mapStateToProps(withRouter(Home));
