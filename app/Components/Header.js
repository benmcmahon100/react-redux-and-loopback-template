import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
  withRouter
} from 'react-router-dom';

import AppBar from 'material-ui/AppBar';

const mapStateToProps = connect(state => {
  return state;
});

class Header extends Component {
  constructor(props) {
    super(props);

    this.moveTo = this.moveTo.bind(this);
  }

  moveTo(location) {
    console.log(location);

    this.props.history.push(
      `${this.props.location.pathname}#${location}`
    );

    this.forceUpdate();
  }

  render() {
    const menuAction = this.props.toggleOpen === 'function'
      ? this.props.toggleOpen
      : () => {};

    return (
      <div className='Header'>
        <AppBar
          onLeftIconButtonTouchTap = {menuAction}
          onTitleTouchTap = {() => {
            this.props.history.push('/');
          }}
          showMenuIconButton = {true}
          title = 'Site Title'
          titleStyle = {{
            cursor: 'pointer'
          }}
        />
      </div>
    );
  }
}

Header.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  postReducer: PropTypes.object,
  toggleOpen: PropTypes.func
};

export default mapStateToProps(withRouter(Header));
