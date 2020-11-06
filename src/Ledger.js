import { hot } from 'react-hot-loader';
import React from 'react';
import PropTypes from 'prop-types';
import LifecycleLoggerComponent from './LifecycleLoggerComponent.js';
import './Ledger.css';


class Ledger extends LifecycleLoggerComponent {
  static getName() {
    return 'Ledger';
  }

  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      sortby: null,
      descending: false,
      edit: null,
      search: false
    };
    this.preSearchData = null;
    this.stateLog = []
    this.sortByColumn = this.sortByColumn.bind(this);
    this.showEditor = this.showEditor.bind(this);
    this.saveCell = this.saveCell.bind(this);
    this.renderToolbar = this.renderToolbar.bind(this);
    this.renderTable = this.renderTable.bind(this);
    this.renderSearch = this.renderSearch.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
    this.searchColumn = this.searchColumn.bind(this);
    this.download = this.download.bind(this);
  }

  componentDidMount() {
    document.onkeydown = (e) => {
      if (e.altKey && e.shiftKey && e.keyCode == 82) {
        this.replayState();
      }
    }
  }

  replayState() {
    if (this.stateLog.length === 0) {
      console.warn('No state to replay yet');
    }
    let index = -1;
    const interval = setInterval(() => {
      index++;
      if (index == this.stateLog.length - 1) {
        clearInterval(interval);
      }
      this.setState(this.stateLog[index]);
    }, 1000)
  }

  logSetState(newState) {
    this.stateLog.push(JSON.parse(JSON.stringify(
      this.stateLog.length === 0 ? this.state : newState
    )));
    this.setState(newState);
  }

  sortByColumn(event) {
    const column = event.target.cellIndex;
    const data = Array.from(this.state.data);
    const isNumber = (value) => /^\d+\.\d+$/.test(value);
    const descending = this.state.sortby === column && !this.state.descending;
    data.sort((a, b) => {
      let aVal = a[column];
      let bVal = b[column];
      if (isNumber(aVal) && isNumber(aVal)) {
        aVal = Number(aVal);
        bVal = Number(bVal);
      }
      return (descending ? 
        (aVal < bVal ? 1 : -1) :
        (aVal > bVal ? 1 : -1)
      );
    });

    this.logSetState({
      data: data,
      sortby: column,
      descending: descending
    });
  }

  showEditor(event) {
    this.logSetState({
      edit: {
        row: parseInt(event.target.dataset.row, 10),
        cell: event.target.cellIndex
      }
    })
  }

  saveCell(event) {
    event.preventDefault();
    const input = event.target.firstChild;
    const data = this.state.data.slice();
    data[this.state.edit.row][this.state.edit.cell] = input.value;
    this.logSetState({
      edit: null,
      data: data
    });
  }
  
  searchColumn(event) {
    var needle = event.target.value.toLowerCase();
    if (!needle) {
      this.logSetState({data: this.preSearchData});
      return;
    }
    const idx = event.target.dataset.idx;
    const searchData = this.preSearchData.filter(function(row) {
      return row[idx].toString().toLowerCase().indexOf(needle) > -1;
    })
    this.logSetState({data: searchData});
  }

  toggleSearch() {
    if (this.state.search) {
      this.logSetState({
        data: this.preSearchData,
        search: false
      });
      this.preSearchData = null;
      return;
    }
    this.preSearchData = this.state.data;
    this.logSetState({
      search: true
    }); 
  }

  download(format, event) {
    const contents = format === 'json' ?
      JSON.stringify(this.state.data) :
      this.state.data.reduce((result, row) => {
        return result 
          + row.reduce((rowResult, cell, idx)  => {
            return `${rowResult}"${cell.replace ? cell.replace(/"/g, '""') : cell}"` 
              + `${(idx < row.length - 1 ? ',': '')}`
          }, '')
          + "\n";
      }, '');
    const URL = window.URL || window.webkitURL;
    const blob = new Blob([contents], {type: `text/${format}`});
    event.target.href = URL.createObjectURL(blob);
    event.target.download = `data.${format}`;
  }

  renderToolbar() {
    return(
      <div>
        <button onClick={this.toggleSearch} className="toolbar">
        { (this.state.search ? 'Done Searching' :  'Search' )}
        </button>
        <a onClick={this.download.bind(this, 'json')} href='data.json'>
          Export JSON
        </a>
          <a onClick={this.download.bind(this, 'csv')} href='data.csv'>
          Export CSV
        </a>
      </div> 
    )
  }

  renderSearch() {
    if (!this.state.search) {
      return null;
    }
    return(
      <tr onChange={this.searchColumn}>
        {this.props.headers.map(function(header, idx) {
          return (
            <td key={idx}>
              <input type="text"
               data-idx={idx}>
               </input>
            </td>
          )
        })}
      </tr>
    )
  }

  renderRow(row, rowIndex) {
    var edit = this.state.edit;
    return row.map((cell, index) => { 
      if (edit && edit.row === rowIndex && edit.cell === index) {
        return(
          <td data-row={rowIndex} key={index}>
            <form onSubmit={this.saveCell}>
              <input 
                type="text" 
                defaultValue={cell}>
              </input>
            </form>
          </td>
        )
      }
      return(
        <td key={index} data-row={rowIndex}>
          {cell}
        </td>
      )});
  }

  renderTable() {
    return (
      <table>
        <thead onClick={this.sortByColumn}>
          <tr>
            {this.props.headers.map((header, idx) => {
              if (this.state.sortby == idx) {
                header += (this.state.descending ? '\u2191' : '\u2193')
              }
              return (
                <th key={idx}>
                  {header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody onDoubleClick={this.showEditor}>
          {this.renderSearch()}
          {this.state.data.map((row, rowIndex) => {
            return(
              <tr key={rowIndex}>
                {this.renderRow(row, rowIndex)}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  render() {
    return(
      <div>
        {this.renderToolbar()}
        {this.renderTable()}
      </div>
    )
  }
}

Ledger.defaultProps = {
  order: 'asc'
}

Ledger.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.string
  ),
  data: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.string
    )
  )
}

export default hot(module)(Ledger)