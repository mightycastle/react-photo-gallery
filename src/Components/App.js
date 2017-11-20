'use strict'

import React, { Component } from 'react';
import Board from './Board';
import Toolbar from './Toolbar';

import data from '../data.json';

//css
require('style-loader!./App.css');

class App extends Component {

  constructor(props) {
    super(props);

    this.state={
      page: 0,
      pageSize: 1,
      selectedStyles: [],
      selectedQualities: []
    };

    this.handleSetPageSize = this.handleSetPageSize.bind(this);
    this.handleLeftScrollClicked = this.handleLeftScrollClicked.bind(this);
    this.handleRightScrollClicked = this.handleRightScrollClicked.bind(this);
    this.handleSetSelectedStyles = this.handleSetSelectedStyles.bind(this);
    this.handleSetSelectedQualities = this.handleSetSelectedQualities.bind(this);
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

  handleSetSelectedStyles(selectedStyles) {
    this.setState({
      selectedStyles
    });
  }

  handleSetSelectedQualities(selectedQualities) {
    this.setState({
      selectedQualities
    });
  }

  render() {
    const { page, selectedStyles, selectedQualities } = this.state;
    return (
      <div>
        <Toolbar 
          selectedStyles={selectedStyles}
          selectedQualities={selectedQualities}
          setSelectedStyles={this.handleSetSelectedStyles}
          setSelectedQualities={this.handleSetSelectedQualities}
          styleOptions={data.designStyle}
          qualityOptions={data.qualityStandard}
        />
        <Board 
          images={data.data}
          page={page}
          setPageSize={this.handleSetPageSize}
          selectedStyles={selectedStyles}
          selectedQualities={selectedQualities}
        />
        <button 
          className='button__scroll button__scroll--left' 
          onClick={this.handleLeftScrollClicked}
        />
        <button 
          className='button__scroll button__scroll--right' 
          onClick={this.handleRightScrollClicked}
        />
      </div>
    );
  }
}

export default App;