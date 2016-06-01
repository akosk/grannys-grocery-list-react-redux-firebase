import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Nav, Navbar, NavItem, Button,Panel,Badge } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import _ from 'lodash';

import * as actionCreators from '../../action_creators';


class GroceryItems extends Component {

  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      quantity: PropTypes.string,
      shop: PropTypes.string,
      maxprice: PropTypes.string,
      imageUrl: PropTypes.string,
    })).isRequired,
    selectGroceryItem: PropTypes.func.isRequired,
    selectAllGroceryItem: PropTypes.func.isRequired,
    doneEditGroceryItem: PropTypes.func.isRequired,
    deleteSelectedGroceryItems: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
  }

  imageFormatter(url) {
    return url && `<img src="${url}" style="height: 45px"/>`;
  }

  selectRowProp() {
    return {
      mode: "checkbox",
      clickToSelect: true,
      bgColor: "rgb(238, 193, 213)",
      onSelect: (row, isSelected)=> {
        this.props.selectGroceryItem(row, isSelected);
      },
      onSelectAll: (isSelected)=> {
        this.props.selectAllGroceryItem(isSelected);
      }
    };
  }

  cellEditProp() {
    return {
      mode: "click",
      blurToSave: true,
      afterSaveCell: (row, cellName, cellValue) => {
        this.props.doneEditGroceryItem(row);
      }
    };
  }

  options() {
    return {
      afterDeleteRow: (rowKeys)=> {
        this.props.deleteSelectedGroceryItems(rowKeys);
      },
      insertText: 'Hozzáad',
      deleteText: 'Töröl',
    };
  }

  render() {
    const { items } = this.props;

    return (
      <div>
        <Panel className="panel-primary" header={(
        <span>
        Bevásárlólista &nbsp;&nbsp;
        <Badge>{items.length}</Badge>
        </span>
        )} >
          <BootstrapTable data={items} striped={false} hover
                          selectRow={this.selectRowProp()}
                          cellEdit={this.cellEditProp()}
                          deleteRow
                          bordered
                          options={this.options()}>
            <TableHeaderColumn isKey hidden dataField="id">#</TableHeaderColumn>
            <TableHeaderColumn dataField="imageUrl" editable={false} dataFormat={this.imageFormatter}
                               dataAlign="center">Kép</TableHeaderColumn>
            <TableHeaderColumn dataField="name" dataSort>Termék neve</TableHeaderColumn>
            <TableHeaderColumn dataField="quantity">Mennyiség</TableHeaderColumn>
            <TableHeaderColumn dataField="shop">Üzlet</TableHeaderColumn>
            <TableHeaderColumn dataField="maxprice">Maximum ár</TableHeaderColumn>
          </BootstrapTable>

        </Panel>
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  const items = _.get(state, 'grocery.items', []);

  return {
    items: _.cloneDeep(items)
  };
};

export default connect(mapStateToProps, actionCreators)(GroceryItems);

