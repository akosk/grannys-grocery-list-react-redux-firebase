import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormControl, FormGroup, ControlLabel, Button, Panel } from 'react-bootstrap';

import * as actionCreators from '../../action_creators';

const initialState = {
  submitButtonDisabled: true,
  form: {
    name: '',
    quantity: '',
    shop: '',
    maxprice: '',
  },
};

class GroceryItemForm extends Component {
  static propTypes = {
    addGroceryItem: PropTypes.func.isRequired,
  };


  constructor(props, context) {
    super(props, context);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = { ...initialState };
  }


  onChange(event) {
    const form = this.state.form;
    form[event.target.name] = event.target.value;
    this.setState({
      submitButtonDisabled: form.name.length === 0,
      form: {
        ...form,
      },
    });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.addGroceryItem(this.state.form);
    this.setState(initialState);
  }

  render() {
    return (
      <Panel className="panel-primary" header="Új tétel hozzáadása">
        <form onSubmit={this.onSubmit}>

          <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
            <FormGroup controlId="formControlsText">
              <ControlLabel>Termék neve</ControlLabel>
              <FormControl type="text" placeholder="Termék neve" name="name"
                           value={this.state.form.name}
                           onChange={this.onChange}/>
            </FormGroup>
            <FormGroup controlId="formControlsText">
              <ControlLabel>Mennyiség</ControlLabel>
              <FormControl type="text" placeholder="Mennyiség" name="quantity"
                           value={this.state.form.quantity}
                           onChange={this.onChange}/>
            </FormGroup>
            <FormGroup controlId="formControlsText">
              <ControlLabel>Üzlet(ek)</ControlLabel>
              <FormControl type="text" placeholder="Üzlet(ek)" name="shop"
                           value={this.state.form.shop}
                           onChange={this.onChange}/>
            </FormGroup>
            <FormGroup controlId="formControlsText">
              <ControlLabel>Max. ár</ControlLabel>
              <FormControl type="text" placeholder="Max. ár" name="maxprice"
                           value={this.state.form.maxprice}
                           onChange={this.onChange}/>
            </FormGroup>
          </div>

          <Button
            disabled={this.state.submitButtonDisabled}
            bsStyle="primary"
            type="submit">
            <span className="glyphicon glyphicon-plus"></span> Hozzáad
          </Button>

        </form>
      </Panel>
    );
  }
}

export default connect(null, actionCreators)(GroceryItemForm);
