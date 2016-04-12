import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Avatar,FontIcon,Card, CardHeader, CardActions, FlatButton,CardTitle,CardText, TextField} from 'material-ui';
import DeleteIcon from '../../node_modules/material-ui/lib/svg-icons/action/delete';
import AddIcon from '../../node_modules/material-ui/lib/svg-icons/content/add';
import * as actionCreators from '../action_creators';


import GroceryItems from '../components/GroceryItems';
class MainContainer extends Component {

  componentDidMount() {
    const {queryAllGroceryItems}=this.props;
    queryAllGroceryItems();
  }

  onSubmit(e) {

    e.preventDefault();
    const {name,quantity, maxprice, shop}=e.target.elements;
    let item = {
      name: name.value,
      quantity: quantity.value,
      maxprice: maxprice.value,
      shop: shop.value
    };
    e.target.reset();
    this.props.addGroceryItem(item);
  }

  onItemSelectChanged(selectedIndexes) {
    this.props.selectGroceryItems(selectedIndexes);
  }

  onDelete() {
    this.props.deleteSelectedGroceryItems();
  }

  render() {
    const {avatarUrl, displayName, items}=this.props;

    return (
      <div>
        <div style={{marginTop:"20",display: "flex",flexDirection:"row",justifyContent:"center"}}>
          <Avatar src={avatarUrl}/>
          <h3>{displayName}</h3>
        </div>
        <form onSubmit={this.onSubmit.bind(this)}>
          <Card>
            <CardText style={{display: "flex",flexDirection:"row",justifyContent:"space-between"}}>

              <TextField
                name="name"
                floatingLabelText="Termék neve"
                autoFocus="true"/>
              <TextField
                name="quantity"
                floatingLabelText="Mennyiség"/>
              <TextField
                name="shop"
                floatingLabelText="Üzlet(ek)"/>
              <TextField
                name="maxprice"
                floatingLabelText="Max. ár"/>

            </CardText>
            <CardActions >
              <FlatButton label="Hozzáad" type="submit" icon={<AddIcon/>} onClick={this.onSubmit.bind(this)}/>
            </CardActions>
          </Card>
        </form>
        <Card style={{marginTop:14}}>
          <CardTitle title="Bevásárló lista"/>
          <CardText>
            <GroceryItems items={items} onItemSelectChanged={this.onItemSelectChanged.bind(this)}/>
          </CardText>
          <CardActions >
            <FlatButton label="Kijelöltek törlése" icon={<DeleteIcon/>} onDelete={this.onDelete.bind(this)}/>
          </CardActions>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state)=> {
  let defaultAvatarUrl = 'https://fbcdn-profile-a.akamaihd.net/static-ak/rsrc.php/v2/yL/r/HsTZSDw4avx.gif';
  return {
    avatarUrl: _.get(state, 'auth.user.facebook.profileImageURL', defaultAvatarUrl),
    displayName: _.get(state, 'auth.user.facebook.displayName', 'Unknown'),
    items: _.get(state, 'grocery.items', []),
  }
};

export default connect(mapStateToProps, actionCreators)(MainContainer);
