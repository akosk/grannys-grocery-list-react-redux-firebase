import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Firebase from 'firebase';
import Login from '../components/Login';
import * as actionCreators from '../action_creators';

class LoginContainer extends Component {

  static contextTypes = {
    router: React.PropTypes.object,
  };

  static propTypes = {
    firebase: PropTypes.instanceOf(Firebase).isRequired,
    loginError: PropTypes.func.isRequired,
    loginSucceed: PropTypes.func.isRequired,
    openLoginPopup: PropTypes.func.isRequired,
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
        <Login loginButtonClickHandler={() => this.login()}/>
        <div
            style={{
              marginTop: 40,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
        >
          <img src='/images/bag1.jpg'
              style={{ maxHeight: '300px' }}
          />
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  firebase: state.firebase,
});


export default connect(mapStateToProps, actionCreators)(LoginContainer);
