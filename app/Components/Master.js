import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
  
} from './../actions';

class Master extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Master">
      	<h4>React App Mounted Here</h4>  
      </div>
    );
  }
}

const mapStateToProps = connect(function(state, props) {
  return(state);
});

export default mapStateToProps(Master);
