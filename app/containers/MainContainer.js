import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Badge, Avatar, FontIcon, Card,
  CardHeader, CardActions, FlatButton, CardTitle, CardText, TextField } from 'material-ui';
import DeleteIcon from '../../node_modules/material-ui/lib/svg-icons/action/delete';

import * as actionCreators from '../action_creators';
import GroceryItems from '../components/GroceryItems';
import GroceryItemForm from '../components/GroceryItemForm';

class MainContainer extends Component {

  componentDidMount() {
    const { queryAllGroceryItems } = this.props;
    queryAllGroceryItems();
  }

  onSubmit(e) {
    e.preventDefault();
    const { name, quantity, maxprice, shop } = e.target.elements;
    const item = {
      name: name.value,
      quantity: quantity.value,
      maxprice: maxprice.value,
      shop: shop.value,
    };
    e.target.reset();
    this.props.addGroceryItem(item);
  }

  onItemSelectChanged(selectedIndexes) {
    this.props.selectGroceryItems(selectedIndexes);
  }

  onEditItem(item, event) {
    event.stopPropagation();
    this.props.editGroceryItem(item);
  }

  onCancelEditItem(item, event) {
    event.stopPropagation();
    this.props.cancelEditGroceryItem(item);
  }

  onDoneEditItem(item, event) {
    event.stopPropagation();
    this.props.doneEditGroceryItem(item);
  }

  onDelete() {
    this.props.deleteSelectedGroceryItems();
  }

  render() {
    const { avatarUrl, displayName, items } = this.props;

    const divStyle = {
      marginTop: '20',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    };

    return (
      <div>
        <div style={divStyle}>
          <Avatar src={avatarUrl}/>
          <h3 style={ { marginLeft: 10 } }>{displayName}</h3>
        </div>
        <GroceryItemForm onSubmitCallback={this.onSubmit.bind(this)}/>
        <Card style={ { marginTop: 14 } }>
          <CardTitle title={<Badge badgeContent={items.length}
          primary={true}>Bevásárló lista</Badge>}/>
          <CardText>
            <GroceryItems
              items={items}
              onItemSelectChanged={this.onItemSelectChanged.bind(this)}
              onEditItem={this.onEditItem.bind(this)}
              onDoneEditItem={this.onDoneEditItem.bind(this)}
              onCancelEditItem={this.onCancelEditItem.bind(this)}
            />
          </CardText>
          <CardActions >
            <FlatButton
              label="Kijelöltek törlése"
              icon={ <DeleteIcon/> }
              onClick={this.onDelete.bind(this)}/>
          </CardActions>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const defaultAvatarUrl = 'https://fbcdn-profile-a.akamaihd.net/static-ak/rsrc.php/v2/yL/r/HsTZSDw4avx.gif';
  return {
    avatarUrl: _.get(state, 'auth.user.facebook.profileImageURL', defaultAvatarUrl),
    displayName: _.get(state, 'auth.user.facebook.displayName', 'Unknown'),
    items: _.get(state, 'grocery.items', []),
  };
};

export default connect(mapStateToProps, actionCreators)(MainContainer);
