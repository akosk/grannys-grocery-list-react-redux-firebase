import React, { Component, PropTypes } from 'react';
import {Badge, Avatar,FontIcon,Card, CardHeader, CardActions, FlatButton,CardTitle,CardText, TextField} from 'material-ui';
import AddIcon from '../../node_modules/material-ui/lib/svg-icons/content/add';

const initialState = {
  submitButtonDisabled: true,
  form: {
    name: '',
    quantity: '',
    shop: '',
    maxprice: ''
  }
};

class GroceryItemForm extends Component {

  static propTypes = {
    onSubmitCallback: PropTypes.func.isRequired,
    submitButtonText: PropTypes.string,
    submitButtonIcon: PropTypes.object
  };

  static defaultProps = {
    submitButtonText: 'Hozzáad',
    submitButtonIcon: <AddIcon/>,
  };

  state = initialState;

  onChange(event) {
    let form = this.state.form;
    console.log(form.name.length);
    form[ event.target.name ] = event.target.value;
    this.setState({
      submitButtonDisabled: form.name.length == 0,
      form: {
        ...form
      }
    });
  }

  onSubmit(event) {
    this.props.onSubmitCallback(event);
    this.setState(initialState);
  }

  render() {
    return (
      <form onSubmit={(e)=>this.onSubmit(e)}>
        <Card>
          <CardText style={{
            display: "flex",
            flexDirection:"row",
            justifyContent:"space-between"}}>

            <TextField
              name="name"
              floatingLabelText="Termék neve"
              autoFocus="true"
              value={this.state.form.name}
              onChange={(e)=>this.onChange(e)}
            />
            <TextField
              name="quantity"
              floatingLabelText="Mennyiség"
              value={this.state.form.quantity}
              onChange={(e)=>this.onChange(e)}
            />
            <TextField
              name="shop"
              floatingLabelText="Üzlet(ek)"
              value={this.state.form.shop}
              onChange={(e)=>this.onChange(e)}
            />
            <TextField
              name="maxprice"
              floatingLabelText="Max. ár"
              value={this.state.form.maxprice}
              onChange={(e)=>this.onChange(e)}
            />

          </CardText>
          <CardActions >
            <FlatButton
              disabled={this.state.submitButtonDisabled}
              label={this.props.submitButtonText}
              type="submit"
              icon={this.props.submitButtonIcon}
            />
          </CardActions>
        </Card>
      </form>
    );
  }
}

export default GroceryItemForm;
