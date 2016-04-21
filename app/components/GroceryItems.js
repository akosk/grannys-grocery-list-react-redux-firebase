import React, { Component, PropTypes } from 'react';
import { FlatButton, Avatar, TextField, Table, TableBody, TableHeader,
  TableRowColumn, TableRow, TableHeaderColumn, IconButton } from 'material-ui';
import EditIcon from '../../node_modules/material-ui/lib/svg-icons/editor/mode-edit';
import ClearIcon from '../../node_modules/material-ui/lib/svg-icons/content/clear';
import DoneIcon from '../../node_modules/material-ui/lib/svg-icons/action/done';

class GroceryItems extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    onItemSelectChanged: PropTypes.func.isRequired,
    onEditItem: PropTypes.func.isRequired,
    onCancelEditItem: PropTypes.func.isRequired,
    onDoneEditItem: PropTypes.func.isRequired,
  };

  state = {
    forms: {},
  };

  onChange(event, item) {
    const forms = this.state.forms;
    if (forms[item.id] === undefined) {
      forms[item.id] = { ...item };
    }

    const form = forms[item.id];
    form[event.target.name] = event.target.value;
    this.setState({
        forms,
      }
    );
  }

  onEditItem(item, e) {
    const forms = this.state.forms;
    if (forms[item.id] === undefined) {
      forms[item.id] = { ...item };
    }
    this.props.onEditItem(item, e);
  }

  render() {
    const { items, onItemSelectChanged, onEditItem } = this.props;

    const rows = items.map((item) =>
      <TableRow key={item.id} selected={item.selected}>
        <TableRowColumn>
          {item.imageUrl
            ? <img style={ { height: 70 } } src={item.imageUrl}/>
            : null}
        </TableRowColumn>
        <TableRowColumn
          style={ item.selected
          ? { textDecoration: 'line-through' }
          : { width: 150 } }
        >
          { item.edit !== true
            ? item.name
            : <TextField onClick={(e) => e.stopPropagation()}
                                   name="name"
                                   value={this.state.forms[item.id].name}
                                   onChange={(event) => this.onChange(event, item)}
                                   floatingLabelText="Termék neve"/>}

        </TableRowColumn>
        <TableRowColumn>{item.edit !== true ?
          item.quantity :
          <TextField onClick={(e) => e.stopPropagation()}
                     name="quantity"
                     value={this.state.forms[item.id].quantity}
                     onChange={(event) => this.onChange(event, item)}
                     floatingLabelText="Mennyiség"/>}
        </TableRowColumn>
        <TableRowColumn >{item.edit !== true ?
          item.shop :
          <TextField onClick={(e) => e.stopPropagation()}
                     name="shop"
                     value={this.state.forms[item.id].shop}
                     onChange={(event) => this.onChange(event, item)}
                     floatingLabelText="Üzlet(ek)"/>}
        </TableRowColumn>
        <TableRowColumn>{
          item.edit !== true ?
            item.maxprice :
            <TextField onClick={(e) => e.stopPropagation()}
                       name="maxprice"
                       value={this.state.forms[item.id].maxprice}
                       onChange={(event) => this.onChange(event, item)}
                       floatingLabelText="Max. ár"/>}
          {item.maxprice ? 'Ft' : ''}
        </TableRowColumn>
        <TableRowColumn>
          {item.edit !== true ?
            <IconButton onClick={(e) => this.onEditItem(item, e)}><EditIcon/></IconButton>
            :
            (<div>
                <IconButton
                  onClick={(e) => this.props.onDoneEditItem(this.state.forms[item.id], e)}>
                  <DoneIcon />
                </IconButton>
                <IconButton onClick={(e) => this.props.onCancelEditItem(item, e)}>
                  <ClearIcon/>
                </IconButton>
              </div>
            )
          }
        </TableRowColumn>
      </TableRow>
    );
    return (

      <Table multiSelectable={true} onRowSelection={onItemSelectChanged} selectable={true}>
        <TableHeader enableSelectAll={true}>
          <TableRow>
            <TableHeaderColumn tooltip="Kép a termékről">Kép</TableHeaderColumn>
            <TableHeaderColumn style={ { width: 150 } } tooltip="A termék neve">
              Termék neve
            </TableHeaderColumn>
            <TableHeaderColumn tooltip="Mennyiség és mértékegység">Mennyiség</TableHeaderColumn>
            <TableHeaderColumn tooltip="Azok az üzletek ahonnan megvehetjük">
              Üzlet
            </TableHeaderColumn>
            <TableHeaderColumn tooltip="Legfeljebb ennyibe kerülhet">Maximum ár</TableHeaderColumn>
            <TableHeaderColumn></TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody deselectOnClickaway={false}>
          {rows}
        </TableBody>
      </Table>

    );
  }
}

export default GroceryItems;
