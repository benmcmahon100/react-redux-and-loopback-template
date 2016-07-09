import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
  
} from './../actions';

class Sample extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Sample">
        
      </div>
    );
  }
}

const mapStateToProps = connect(function(state, props) {
  return(state);
});

export default mapStateToProps(Sample);
