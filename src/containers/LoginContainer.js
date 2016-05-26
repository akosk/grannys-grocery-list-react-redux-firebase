import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Firebase from 'firebase';
import {browserHistory} from 'react-router';

import Login from '../components/Login';
import * as actionCreators from '../action_creators';

class LoginContainer extends Component {

  static contextTypes = {
    router: React.PropTypes.object,
  };

  static propTypes = {
    loginError: PropTypes.func.isRequired,
    loginSucceed: PropTypes.func.isRequired,
    openLoginPopup: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.login = this.login.bind(this);
  }


  login() {
    const { openLoginPopup, loginError, loginSucceed } = this.props;

    openLoginPopup();

    const provider = new Firebase.auth.FacebookAuthProvider();
    provider.addScope('user_birthday');
    Firebase.auth().signInWithPopup(provider)
            .then((result) => {
              loginSucceed(result.user.providerData[0], result.credential.accessToken);
              browserHistory.push('/main');
            })
            .catch((error)=> {
              loginError(error);
            });
  }

  render() {
    return (
      <div>
        <Login loginButtonClickHandler={this.login}/>
        <div
          style={{
              marginTop: 40,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
        >
          <img src="/images/bag1.jpg"
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
