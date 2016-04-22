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

  state = initialState;

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
    this.props.onSubmitCallback(event);
    this.setState(initialState);
  }

  render() {
    return (
      <form onSubmit={(e) => this.onSubmit(e)}>
        <Card>
          <CardText
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
          >

            <TextField
                autoFocus='true'
                floatingLabelText='Termék neve'
                name='name'
                onChange={(e) => this.onChange(e)}
                value={this.state.form.name}
            />
            <TextField
                floatingLabelText='Mennyiség'
                name='quantity'
                onChange={(e) => this.onChange(e)}
                value={this.state.form.quantity}
            />
            <TextField
                floatingLabelText='Üzlet(ek)'
                name='shop'
                onChange={(e) => this.onChange(e)}
                value={this.state.form.shop}
            />
            <TextField
                floatingLabelText='Max. ár'
                name='maxprice'
                onChange={(e) => this.onChange(e)}
                value={this.state.form.maxprice}
            />

          </CardText>
          <CardActions >
            <FlatButton
                disabled={this.state.submitButtonDisabled}
                icon={this.props.submitButtonIcon}
                label={this.props.submitButtonText}
                type='submit'
            />
          </CardActions>
        </Card>
      </form>
    );
  }
}

export default GroceryItemForm;
