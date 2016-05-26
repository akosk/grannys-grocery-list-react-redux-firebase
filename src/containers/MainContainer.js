import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import _ from 'lodash';

import { Badge, Avatar, Card, Dialog, TextField,
  CardActions, FlatButton, CardTitle, CardText } from 'material-ui';
import DeleteIcon from '../../node_modules/material-ui/lib/svg-icons/action/delete';
import MailOutlineIcon from '../../node_modules/material-ui/lib/svg-icons/communication/mail-outline';

import * as actionCreators from '../action_creators';
import GroceryItems from '../components/GroceryItems';
import GroceryItemForm from '../components/GroceryItemForm';

import {getRootRef} from '../utils/firebase_utils';

class MainContainer extends Component {

  static propTypes = {
    addGroceryItem: PropTypes.func.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    cancelEditGroceryItem: PropTypes.func.isRequired,
    deleteSelectedGroceryItems: PropTypes.func.isRequired,
    displayName: PropTypes.string.isRequired,
    doneEditGroceryItem: PropTypes.func.isRequired,
    editGroceryItem: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      quantity: PropTypes.string,
      shop: PropTypes.string,
      maxprice: PropTypes.string,
      imageUrl: PropTypes.string,
    })).isRequired,
    queryAllGroceryItems: PropTypes.func.isRequired,
    selectGroceryItems: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.sendMail = this.sendMail.bind(this);
    this.state = {
      email: 'akos.kiszely@gmail.com, pekazsuest@gmail.com',
      emailDialogOpen: false
    };
  }

  componentDidMount() {
    const { queryAllGroceryItems } = this.props;
    queryAllGroceryItems();
  }

  componentWillUnmount() {
    const ref = getRootRef();
    ref.off();
  }

  onSubmit(item) {
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

  sendMail() {
    const textArray = this.props.items.map((item)=> `<li><strong>${item.name}</strong> ${item.quantity} ${item.shop} ${item.maxprice}</li>`);
    const message = textArray.join('');
    const data = {
      to_email: this.state.email,
      message_html: `<ul>${message}</ul>`
    };
    emailjs.send('default_service', 'template_UzeUHAP4', data); //eslint-disable-line no-undef
    this.setState({ emailDialogOpen: false });
  }



  render() {
    const { avatarUrl, displayName, items } = this.props;

    const divStyle = {
      marginTop: 20,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    };

    const actions = [
      <FlatButton
        key="1"
        label="Mégsem"
        primary
        onClick={()=>this.setState({emailDialogOpen:false})}
      />,
      <FlatButton
        key="2"
        label="Ok"
        primary
        onClick={this.sendMail}
      />
    ];


    return (
      <div>
        <div style={divStyle}>
          <Avatar src={avatarUrl}/>
          <h3 style={{ marginLeft: 10 }}>{displayName}</h3>
        </div>
        <GroceryItemForm onSubmitCallback={this.onSubmit}/>
        <Card style={{ marginTop: 14 }}>
          <CardTitle
            title={
                <Badge
                    badgeContent={items.length}
                    primary
                >
                  Bevásárló lista
                </Badge>
              }
          />
          <CardText>
            <GroceryItems
              items={items}
              onCancelEditItem={(item, event) => this.onCancelEditItem(item, event)}
              onDoneEditItem={(item, event) => this.onDoneEditItem(item, event)}
              onEditItem={(item, event) => this.onEditItem(item, event)}
              onItemSelectChanged={(selectedIndexes) => this.onItemSelectChanged(selectedIndexes)}
            />
          </CardText>
          <CardActions >
            <FlatButton
              icon={<DeleteIcon/>}
              label="Kijelöltek törlése"
              onClick={this.onDelete}
            />
            <FlatButton
              icon={<MailOutlineIcon/>}
              label="Lista küldése emailben"
              onClick={() => this.setState({emailDialogOpen:true})}
            />
          </CardActions>
        </Card>

        <Dialog
          title="Lista küldése emailben"
          actions={actions}
          modal={false}
          open={this.state.emailDialogOpen}
        >

          <TextField
            floatingLabelText="Email"
            value={this.state.email}
            onChange={(e)=>this.setState({email:e.target.value})}
          />
        </Dialog>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  const defaultAvatarUrl = 'https://fbcdn-profile-a.akamaihd.net/static-ak/rsrc.php/v2/yL/r/HsTZSDw4avx.gif';
  return {
    avatarUrl: _.get(state, 'auth.user.photoURL', defaultAvatarUrl),
    displayName: _.get(state, 'auth.user.displayName', 'Unknown'),
    items: _.get(state, 'grocery.items', []),
  };
};

export default connect(mapStateToProps, actionCreators)(MainContainer);
