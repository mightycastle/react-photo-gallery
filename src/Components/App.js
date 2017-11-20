'use strict'

import React, { Component } from 'react';
import Board from './Board';

import data from '../data.json';

//css
require('style-loader!./App.css');

class App extends Component {

  constructor(props) {
    super(props);

    this.state={
      page: 0,
      pageSize: 1
    };

    this.handleSetPageSize = this.handleSetPageSize.bind(this);
    this.handleLeftScrollClicked = this.handleLeftScrollClicked.bind(this);
    this.handleRightScrollClicked = this.handleRightScrollClicked.bind(this);
  }

  handleLeftScrollClicked() {
    this.setState({
      page: Math.max(this.state.page - 1, 0)
    });
  }

  handleRightScrollClicked() {
    this.setState({
      page: Math.min(this.state.page + 1, this.state.pageSize - 1)
    });
  }

  handleSetPageSize(pageSize) {
    this.setState({
      pageSize
    });
  }

  render() {
    const { page } = this.state;
    return (
      <div>
        <Board 
          images={data.data}
          page={page}
          setPageSize={this.handleSetPageSize}
        />
        <button 
          className='button__scroll button__scroll-left' 
          onClick={this.handleLeftScrollClicked}
        />
        <button 
          className='button__scroll button__scroll-right' 
          onClick={this.handleRightScrollClicked}
        />
      </div>
    );
  }
}

export default App;