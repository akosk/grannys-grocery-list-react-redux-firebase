import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Nav, Navbar, NavItem, Button, Label } from 'react-bootstrap';
import * as actionCreators from '../action_creators';

class LayoutContainer extends Component {

  static propTypes = {
    children: React.PropTypes.element.isRequired,
    isLoggedIn: React.PropTypes.bool.isRequired,
    logout: React.PropTypes.func.isRequired,
    avatarUrl: React.PropTypes.string.isRequired,
    displayName: React.PropTypes.string.isRequired,
  };

  render() {
    const { isLoggedIn, logout, displayName, avatarUrl,  } = this.props;

    return (
      <div  >
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#"><span className="glyphicon glyphicon-shopping-cart"></span> Nagyi bevásárló listája</a>
            </Navbar.Brand>
          </Navbar.Header>
          {isLoggedIn &&
          <Nav pullRight style={{marginRight:30}}>
            <NavItem>&nbsp;<strong>{displayName}</strong> &nbsp;<img src={avatarUrl} style={{height:'45px'}} className="img-circle"/></NavItem>
          </Nav>
          }
          <Nav pullRight>
            {isLoggedIn && <NavItem eventKey={1} onClick={logout}><span className="glyphicon glyphicon-log-out"></span> KIJELENTKEZÉS</NavItem>}
          </Nav>

        </Navbar>
        <div style={{backgroundColor:'white',paddingTop:28}} className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const defaultAvatarUrl = 'https://fbcdn-profile-a.akamaihd.net/static-ak/rsrc.php/v2/yL/r/HsTZSDw4avx.gif';
  return {
    isLoggedIn: _.has(state, 'auth.user.uid'),
    avatarUrl: _.get(state, 'auth.user.photoURL', defaultAvatarUrl),
    displayName: _.get(state, 'auth.user.displayName', 'Unknown'),
  };
};

export default connect(mapStateToProps, actionCreators)(LayoutContainer);
