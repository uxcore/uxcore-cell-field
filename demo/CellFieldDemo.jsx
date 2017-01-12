/**
 * CellField Component Demo for uxcore
 * @author eternalsky
 *
 * Copyright 2015-2016, Uxcore Team, Alinw.
 * All rights reserved.
 */

const React = require('react');
const Table = require('uxcore-table');

const CellField = require('../src');

const { Constants } = Table;

class Demo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  saveRef(refName) {
    const me = this;
    return (c) => {
      me[refName] = c;
    };
  }

  render() {
    const columns = [
      { dataKey: 'text', editKey: 'startVal', title: 'Start Date', width: 200, type: 'custom', customField: CellField, rules: (value, rowData) => false },
      {
        dataKey: 'action1',
        width: '120',
        title: 'Operation',
        type: 'action',
        actions: [
          {
            title: 'Edit',
            callback: (rowData) => {
              this.table.editRow(rowData);
            },
            mode: Constants.MODE.VIEW,
          },
          {
            title: 'Save',
            callback: (rowData) => {
              this.table.saveRow(rowData);
            },
            mode: Constants.MODE.EDIT,
          },
        ],
      },
    ];

    const renderProps = {
      jsxcolumns: columns,
      ref: this.saveRef('table'),
      jsxdata: {
        data: [
          {
            text: '1111',
          },
        ],
      },
      actionBar: {
        'action button': () => {
          console.log(this.table.getData());
        },
        standalone: () => {
          this.cell.validate();
        },
      },
    };
    const column = {
      dataKey: 'text',
      // rules: () => false,
      rules: [{
        validator: () => false,
        errMsg: '出错',
      }],
    };
    return (
      <div>
        <Table {...renderProps} />
        <h2>CellField Standalone</h2>
        <div className="standalone">
          <CellField column={column} standalone ref={this.saveRef('cell')} />
        </div>
      </div>
    );
  }
}

module.exports = Demo;
