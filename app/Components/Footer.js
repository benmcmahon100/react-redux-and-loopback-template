import React, {Component} from 'react';
import {connect} from 'react-redux';

const mapStateToProps = connect(state => {
  return (state);
});

class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='Footer' />
    );
  }
}

export default mapStateToProps(Footer);
