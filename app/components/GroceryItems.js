import React, { Component, PropTypes } from 'react';
import {Table,TableBody, TableHeader,TableRowColumn,TableRow, TableHeaderColumn,} from 'material-ui';

class GroceryItems extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    onItemSelectChanged: PropTypes.func.isRequired
  };


  render() {
    const {items, onItemSelectChanged}=this.props;

    return (
      <Table multiSelectable={true} onRowSelection={onItemSelectChanged}>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn tooltip="A termék neve">Termék neve</TableHeaderColumn>
            <TableHeaderColumn tooltip="Mennyiség és mértékegység">Mennyiség</TableHeaderColumn>
            <TableHeaderColumn tooltip="Azok az üzletek ahonnan megvehetjük">Üzlet</TableHeaderColumn>
            <TableHeaderColumn tooltip="Legfeljebb ennyibe kerülhet">Maximum ár</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody multiSelectable={true}>
          {items.map((item)=>(
              <TableRow key={item.id} selected={item.selected} >
                <TableRowColumn>{item.name}</TableRowColumn>
                <TableRowColumn>{item.quantity}</TableRowColumn>
                <TableRowColumn>{item.shop}</TableRowColumn>
                <TableRowColumn>{item.maxprice} {item.maxprice ? 'Ft' : ''}</TableRowColumn>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>

    );
  }
}

export default GroceryItems;
