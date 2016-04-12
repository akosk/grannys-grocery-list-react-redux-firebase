import React, {Component} from 'react';
import { connect } from 'react-redux';
import {AppBar, IconButton, FlatButton, Avatar} from 'material-ui';
import _ from 'lodash';
import ShoppingBasketIcon from '../../node_modules/material-ui/lib/svg-icons/action/shopping-basket';

import * as actionCreators from '../action_creators';

class LayoutContainer extends Component {

  static contextTypes = {
    router: React.PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  logout() {
      this.props.logout();
      this.props.redirectToLogin(this.context.router);
  }

  render() {
    const { isLoggedIn, avatarUrl, displayName }=this.props;
    const logoutButton = <FlatButton label="Kijelentkezés" onClick={this.logout.bind(this)} />;

    return (
      <div>
        <AppBar
          iconElementLeft={<IconButton><ShoppingBasketIcon/></IconButton>}
          iconElementRight={isLoggedIn ? logoutButton : null}
          title="Nagyi bevásárló listája"/>
        {this.props.children}
      </div>
    )
  }
}

const mapStateToProps = (state)=> {
  let defaultAvatarUrl = 'https://fbcdn-profile-a.akamaihd.net/static-ak/rsrc.php/v2/yL/r/HsTZSDw4avx.gif';
  return {
    isLoggedIn: _.has(state, 'auth.user.uid'),
  }
};

export default connect(mapStateToProps, actionCreators)(LayoutContainer);
