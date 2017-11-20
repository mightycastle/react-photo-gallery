'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
import Chip from 'material-ui/Chip';
import xor from 'array-xor';

//css
require('./style.css');

function getSelectedItems(list, selected) {
  const results = [];
  for (var i = 0; i < selected.length; i++) {
    for (var j = 0; j < list.length; j++) {
      if (selected[i] === list[j].id) {
        results.push(list[j]);
        break;
      }
    }
  }
  return results;
}

class Toolbar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      stylesOpen: false,
      qualitiesOpen: false,
      stylesAnchorEl: null,
      qualitiesAnchorEl: null
    };

    this.handleStylesClick = this.handleStylesClick.bind(this);
    this.handleQualitiesClick = this.handleQualitiesClick.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleStyleItemClick = this.handleStyleItemClick.bind(this);
    this.handleQualityItemClick = this.handleQualityItemClick.bind(this);
  }

  handleStylesClick(event) {
    this.setState({
      stylesOpen: true,
      stylesAnchorEl: event.currentTarget
    });
  }

  handleQualitiesClick(event) {
    this.setState({
      qualitiesOpen: true,
      qualitiesAnchorEl: event.currentTarget
    });
  }

  handleRequestClose() {
    this.setState({
      stylesOpen: false,
      qualitiesOpen: false
    });
  }

  handleStyleItemClick(id) {
    const { selectedStyles, setSelectedStyles } = this.props;
    setSelectedStyles(xor(selectedStyles, [id]));
    this.handleRequestClose();
  }

  handleQualityItemClick(id) {
    const { selectedQualities, setSelectedQualities } = this.props;
    setSelectedQualities(xor(selectedQualities, [id]));
    this.handleRequestClose();
  }

  render() {
    const { styleOptions, qualityOptions, selectedStyles, selectedQualities } = this.props;
    const that = this;

    return (
      <div className='toolbar'>
        <div className='toolbar__menu'>
          <Button
            aria-owns={this.state.stylesOpen ? 'styles-menu' : null}
            aria-haspopup="true"
            onClick={this.handleStylesClick}
          >
            Styles
          </Button>
          <Menu
            id="styles-menu"
            anchorEl={this.state.stylesAnchorEl}
            open={this.state.stylesOpen}
            onRequestClose={this.handleRequestClose}
          >
            {styleOptions.map((item, index) => (
              <MenuItem 
                key={index}
                onClick={function() { that.handleStyleItemClick(item.id) }}
              >
                {item.label}
              </MenuItem>
            ))};
          </Menu>
        </div>
        <div className='toolbar__menu'>
          <Button
            aria-owns={this.state.qualitiesOpen ? 'qualities-menu' : null}
            aria-haspopup="true"
            onClick={this.handleQualitiesClick}
          >
            Quality Standard
          </Button>
          <Menu
            id="qualities-menu"
            anchorEl={this.state.qualitiesAnchorEl}
            open={this.state.qualitiesOpen}
            onRequestClose={this.handleRequestClose}
          >
            {qualityOptions.map((item, index) => (
              <MenuItem 
                key={index}
                onClick={function() { that.handleQualityItemClick(item.id) }}
              >
                {item.label}
                {selectedQualities.includes(item.id) ? ' ✓' : ''}
              </MenuItem>
            ))};
          </Menu>
        </div>
        <div className="toolbar__chips">
          {getSelectedItems(styleOptions, selectedStyles).map((item, index) => (
            <div className="toolbar__chip-item" key={index}>
              <Chip
                label={item.label}
                onRequestDelete={function() { that.handleStyleItemClick(item.id) }}
              />
            </div>
          ))}
        </div>
      </div>
    )
  }
}

Toolbar.propTypes = {
  selectedStyles: PropTypes.array.isRequired,
  selectedQualities: PropTypes.array.isRequired,
  setSelectedStyles: PropTypes.func.isRequired,
  setSelectedQualities: PropTypes.func.isRequired,
  styleOptions: PropTypes.array.isRequired,
  qualityOptions: PropTypes.array.isRequired
};

export default Toolbar;