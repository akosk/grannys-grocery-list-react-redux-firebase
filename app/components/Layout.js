import React, {Component} from 'react';
import {AppBar, IconButton} from 'material-ui';
import ShoppingBasketIcon from 'material-ui/lib/svg-icons/action/shopping-basket';


class Layout extends Component {

  render() {
    return (
      <div>
        <AppBar iconElementLeft={<IconButton><ShoppingBasketIcon/></IconButton>} title="Nagyi bevásárló listája"/>
        {this.props.children}
      </div>
    )
  }
}

module.exports = Layout;
