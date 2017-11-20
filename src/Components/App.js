'use strict'

import React, { Component } from 'react';
import Board from './Board';

import data from '../data.json';

//css
require('style-loader!./App.css');

class App extends Component {

  constructor(props) {
    super(props);

    this.handleLeftScrollClicked = this.handleLeftScrollClicked.bind(this);
    this.handleRightScrollClicked = this.handleRightScrollClicked.bind(this);
  }

  handleLeftScrollClicked() {

  }

  handleRightScrollClicked() {

  }

  render() {
    return (
      <div>
        <Board images={data.data}/>
        <button className='button__scroll button__scroll-left' onClick={this.handleLeftScrollClicked}/>
        <button className='button__scroll button__scroll-right' onClick={this.handleRightScrollClicked}/>
      </div>
    );
  }
}

export default App;