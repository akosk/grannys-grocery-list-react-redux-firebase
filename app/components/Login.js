import React, { Component } from 'react';
import mui, {
  Card,
  CardText,
  RaisedButton,
} from 'material-ui';

class Login extends Component {


  render() {
    const { loginButtonClickHandler } = this.props;

    return (
      <Card style={{ maxWidth: 500, margin: '30px auto' }}>
        <CardText style={{ textAlign: 'center' }}>
          A program használatához tessék bejelentkezni a Facebook fiókkal.
        </CardText>

        <RaisedButton style={{
                display: 'block',
              }}
                      onClick={loginButtonClickHandler}
                      label="Bejelentkezés Facebook-al" primary={true}/>
      </Card>
    );
  }
}

export default Login;
