import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Login from '../components/Login';
import Firebase from 'firebase';

class LoginContainer extends Component {

  static propTypes = {
    firebase: PropTypes.object.isRequired
  };

  login() {
    const {firebase}=this.props;
    firebase.authWithOAuthPopup("facebook", (error, user)=> {
      if (error) {
        return;
      }
    });
  }

  render() {
    return (
      <Login loginButtonClickHandler={this.login.bind(this)}/>
    );
  }
}

const mapStateToProps = (state)=> {
  return {
    firebase: state.firebase
  }
};

export default connect(mapStateToProps)(LoginContainer);
