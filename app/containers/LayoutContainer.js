import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppBar, IconButton, FlatButton, Card } from 'material-ui';
import _ from 'lodash';
import ShoppingBasketIcon from
  '../../node_modules/material-ui/lib/svg-icons/action/shopping-basket';

import * as actionCreators from '../action_creators';

class LayoutContainer extends Component {

  static propTypes={
    children: React.PropTypes.element.isRequired,
    isLoggedIn: React.PropTypes.bool.isRequired,
    logout: React.PropTypes.func.isRequired,
    redirectToLogin: React.PropTypes.func.isRequired,
  };

  static contextTypes = {
    router: React.PropTypes.object,
  };

  logout() {
    this.props.logout();
    this.props.redirectToLogin(this.context.router);
  }

  render() {
    const { isLoggedIn } = this.props;
    const logoutButton = (
      <FlatButton label='Kijelentkezés'
          onClick={this.logout.bind(this)}
      />);

    return (
      <div style={{ maxWidth: 900, minHeight: 600, margin: '0 auto' }}>
        <Card style={{ minHeight: 600 }}>
          <AppBar
              iconElementLeft={<IconButton><ShoppingBasketIcon/></IconButton>}
              iconElementRight={isLoggedIn ? logoutButton : null}
              title='Nagyi bevásárló listája'
          />
          {this.props.children}
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: _.has(state, 'auth.user.uid'),
});

export default connect(mapStateToProps, actionCreators)(LayoutContainer);
