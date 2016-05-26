import React, { Component, PropTypes } from 'react';
import { TextField, Table, TableBody, TableHeader,
  TableRowColumn, TableRow, TableHeaderColumn, IconButton } from 'material-ui';
import EditIcon from '../../node_modules/material-ui/lib/svg-icons/editor/mode-edit';
import ClearIcon from '../../node_modules/material-ui/lib/svg-icons/content/clear';
import DoneIcon from '../../node_modules/material-ui/lib/svg-icons/action/done';

class GroceryItems extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      quantity: PropTypes.string,
      shop: PropTypes.string,
      maxprice: PropTypes.string,
      imageUrl: PropTypes.string,
    })).isRequired,
    onCancelEditItem: PropTypes.func.isRequired,
    onDoneEditItem: PropTypes.func.isRequired,
    onEditItem: PropTypes.func.isRequired,
    onItemSelectChanged: PropTypes.func.isRequired,
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
    });
  }

  onEditItem(item, e) {
    const forms = this.state.forms;
    if (forms[item.id] === undefined) {
      forms[item.id] = { ...item };
    }
    this.props.onEditItem(item, e);
  }

  render() {
    const { items, onItemSelectChanged } = this.props;

    const rows = items.map((item) =>
      <TableRow key={item.id}
          selected={item.selected}

      >
        <TableRowColumn>
          {item.imageUrl
            ? <img
                src={item.imageUrl}
                style={{ height: 70 }}
              />
            : null}
        </TableRowColumn>
        <TableRowColumn
            style={item.selected
              ? { textDecoration: 'line-through', whiteSpace:'normal' }
              : { minWidth: 150, whiteSpace:'normal' }}
        >
          {item.edit !== true
            ? item.name
            : <TextField
                floatingLabelText="Termék neve"
                name="name"
                onChange={(event) => this.onChange(event, item)}
                onClick={(e) => e.stopPropagation()}
                value={this.state.forms[item.id].name}
              />}
        </TableRowColumn>
        <TableRowColumn style={{ whiteSpace:'normal' }}>{item.edit !== true ?
          item.quantity :
          <TextField
              floatingLabelText="Mennyiség"
              name="quantity"
              onChange={(event) => this.onChange(event, item)}
              onClick={(e) => e.stopPropagation()}
              value={this.state.forms[item.id].quantity}
          />}
        </TableRowColumn>
        <TableRowColumn style={{ whiteSpace:'normal' }}>{item.edit !== true ?
          item.shop :
          <TextField
              floatingLabelText="Üzlet(ek)"
              name="shop"
              onChange={(event) => this.onChange(event, item)}
              onClick={(e) => e.stopPropagation()}
              value={this.state.forms[item.id].shop}
          />}
        </TableRowColumn>
        <TableRowColumn style={{ whiteSpace:'normal' }}>{item.edit !== true
            ? item.maxprice
            : <TextField
                floatingLabelText="Max. ár"
                name="maxprice"
                onChange={(event) => this.onChange(event, item)}
                onClick={(e) => e.stopPropagation()}
                value={this.state.forms[item.id].maxprice}
              />}
          {item.maxprice ? 'Ft' : ''}
        </TableRowColumn>
        <TableRowColumn>
          {item.edit !== true
            ? <IconButton onClick={(e) => this.onEditItem(item, e)}><EditIcon/></IconButton>
            : <div>
                <IconButton
                    onClick={(e) => this.props.onDoneEditItem(this.state.forms[item.id], e)}
                >
                  <DoneIcon />
                </IconButton>
                <IconButton onClick={(e) => this.props.onCancelEditItem(item, e)}>
                  <ClearIcon/>
                </IconButton>
              </div>
          }
        </TableRowColumn>
      </TableRow>
    );
    return (

      <Table
          multiSelectable
          onRowSelection={onItemSelectChanged}
          selectable
      >
        <TableHeader enableSelectAll>
          <TableRow>
            <TableHeaderColumn tooltip="Kép a termékről">Kép</TableHeaderColumn>
            <TableHeaderColumn
                style={{ width: 150 }}
                tooltip="A termék neve"
            >
              Termék neve
            </TableHeaderColumn>
            <TableHeaderColumn tooltip="Mennyiség és mértékegység">Mennyiség</TableHeaderColumn>
            <TableHeaderColumn tooltip="Azok az üzletek ahonnan megvehetjük">
              Üzlet
            </TableHeaderColumn>
            <TableHeaderColumn tooltip="Legfeljebb ennyibe kerülhet">Maximum ár</TableHeaderColumn>
            <TableHeaderColumn/>
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
