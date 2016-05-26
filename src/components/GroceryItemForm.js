import React, { Component, PropTypes } from 'react';
import { Card, CardActions, FlatButton, CardText, TextField } from 'material-ui';
import AddIcon from '../../node_modules/material-ui/lib/svg-icons/content/add';

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
    onSubmitCallback: PropTypes.func.isRequired,
    submitButtonIcon: PropTypes.element,
    submitButtonText: PropTypes.string,
  };

  static defaultProps = {
    submitButtonText: 'Hozzáad',
    submitButtonIcon: <AddIcon/>,
  };

  constructor(props, context) {
    super(props, context);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {...initialState};
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
    event.stopPropagation();
    this.props.onSubmitCallback(this.state.form);
    this.setState(initialState);
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>

        <Card>
          <CardText
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
          >
            <TextField
              autoFocus="true"
              floatingLabelText="Termék neve"
              name="name"
              onChange={this.onChange}
              value={this.state.form.name}
            />

            <TextField
                floatingLabelText="Mennyiség"
                name="quantity"
                onChange={this.onChange}
                value={this.state.form.quantity}
            />
            <TextField
                floatingLabelText="Üzlet(ek)"
                name="shop"
                onChange={this.onChange}
                value={this.state.form.shop}
            />
            <TextField
                floatingLabelText="Max. ár"
                name="maxprice"
                onChange={this.onChange}
                value={this.state.form.maxprice}
            />
          </CardText>
          <CardActions >
            <FlatButton
                disabled={this.state.submitButtonDisabled}
                icon={this.props.submitButtonIcon}
                label={this.props.submitButtonText}
                type="submit"
            />
          </CardActions>
        </Card>
      </form>
    );
  }
}

export default GroceryItemForm;
