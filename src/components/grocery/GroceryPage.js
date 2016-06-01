import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import _ from 'lodash';
import toastr from 'toastr';

import * as actionCreators from '../../action_creators';
import GroceryItems from './GroceryItems';
import GroceryItemForm from './GroceryItemForm';
import {getRootRef} from '../../utils/firebase_utils';
import {sendMail} from '../../utils/email_utils';

class GroceryPage extends Component {

  static propTypes = {
    queryAllGroceryItems: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      quantity: PropTypes.string,
      shop: PropTypes.string,
      maxprice: PropTypes.string,
      imageUrl: PropTypes.string,
    })).isRequired,

  };

  constructor(props, context) {
    super(props, context);
    this.sendMail = this.sendMail.bind(this);
  }

  componentDidMount() {
    const { queryAllGroceryItems } = this.props;
    queryAllGroceryItems();
  }

  componentWillUnmount() {
    const ref = getRootRef();
    ref.off();
  }


  sendMail(event) {
    event.preventDefault();
    sendMail(this.props.items);
    toastr.success('Email elküldve!');
  }

  render() {
    return (
      <div>
        <GroceryItemForm/>
        <div style={{ width:'100%',display:'flex', justifyContent: 'space-around',marginBottom:20}}>
          <Button bsStyle="primary" onClick={this.sendMail}>
            <span className="glyphicon glyphicon-envelope"></span> Lista küldése emailben
          </Button>
        </div>
        <GroceryItems/>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    items: _.get(state, 'grocery.items', [])
  };
};

export default connect(mapStateToProps, actionCreators)(GroceryPage);
