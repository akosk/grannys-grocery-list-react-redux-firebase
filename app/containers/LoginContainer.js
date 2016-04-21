import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Login from '../components/Login';

import Firebase from 'firebase';
import * as actionCreators from '../action_creators';


class LoginContainer extends Component {

  static contextTypes = {
    router: React.PropTypes.object,
  };

  static propTypes = {
    firebase: PropTypes.object.isRequired,
  };

  login() {
    const { firebase, openLoginPopup, loginError, loginSucceed } = this.props;

    openLoginPopup();

    firebase.authWithOAuthPopup('facebook', (error, user) => {
      if (error) {
        loginError(error);
        return;
      }
      loginSucceed(user);
      this.context.router.push('/main');
    });
  }


  render() {
    return (
      <div>
        <Login loginButtonClickHandler={this.login.bind(this)}/>
        <div style={{
        marginTop: 40,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center' }
        }>
          <img style={ { maxHeight: '300px' } } src="/images/bag1.jpg"/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { firebase: state.firebase };
};


export default connect(mapStateToProps, actionCreators)(LoginContainer);
