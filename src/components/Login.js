import React, { PropTypes, Component } from 'react';
import {
  Card,
  CardText,
  RaisedButton,
} from 'material-ui';

class Login extends Component {

  static propTypes= {
    loginButtonClickHandler: PropTypes.func.isRequired,
  };

  render() {
    const { loginButtonClickHandler } = this.props;

    return (
      <Card style={{ maxWidth: 500, margin: '30px auto' }}>
        <CardText style={{ textAlign: 'center' }}>
          A program használatához tessék bejelentkezni a Facebook fiókkal.
        </CardText>
        <RaisedButton
            label="Bejelentkezés Facebook-al"
            onClick={loginButtonClickHandler}
            primary
            style={{ display: 'block' }}
        />
      </Card>
    );
  }
}

export default Login;
