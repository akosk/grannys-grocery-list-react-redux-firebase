import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Badge, Avatar, Card,
  CardActions, FlatButton, CardTitle, CardText } from 'material-ui';
import DeleteIcon from '../../node_modules/material-ui/lib/svg-icons/action/delete';

import * as actionCreators from '../action_creators';
import GroceryItems from '../components/GroceryItems';
import GroceryItemForm from '../components/GroceryItemForm';

class MainContainer extends Component {

  static propTypes = {
    addGroceryItem: PropTypes.func.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    cancelEditGroceryItem: PropTypes.func.isRequired,
    deleteSelectedGroceryItems: PropTypes.func.isRequired,
    displayName: PropTypes.string.isRequired,
    doneEditGroceryItem: PropTypes.func.isRequired,
    editGroceryItem: PropTypes.func.isRequired,
    items: PropTypes.shape({
      name: PropTypes.string,
      quantity: PropTypes.string,
      shop: PropTypes.string,
      maxprice: PropTypes.string,
      imageUrl: PropTypes.string,
    }).isRequired,
    queryAllGroceryItems: PropTypes.func.isRequired,
    selectGroceryItems: PropTypes.func.isRequired,
  }

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
          <h3 style={{ marginLeft: 10 }}>{displayName}</h3>
        </div>
        <GroceryItemForm onSubmitCallback={this.onSubmit.bind(this)}/>
        <Card style={{ marginTop: 14 }}>
          <CardTitle
              title={
                <Badge
                    badgeContent={items.length}
                    primary={true}
                >
                  Bevásárló lista
                </Badge>
              }
          />
          <CardText>
            <GroceryItems
                items={items}
                onCancelEditItem={() => this.onCancelEditItem()}
                onDoneEditItem={() => this.onDoneEditItem()}
                onEditItem={() => this.onEditItem()}
                onItemSelectChanged={() => this.onItemSelectChanged()}
            />
          </CardText>
          <CardActions >
            <FlatButton
                icon={<DeleteIcon/>}
                label='Kijelöltek törlése'
                onClick={() => this.onDelete()}
            />
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
