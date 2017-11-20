'use strict';

import React, { Component } from 'react';
import Card, { CardActions, CardMedia } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import FavoriteIcon from 'material-ui-icons/Favorite';

import PropTypes from 'prop-types';

//css
require('./style.css');

const groupImages = (images) => {
  const results = [[], [], []];
  images.forEach((image, index) => {
    results[index % 3].push(image);
  });
  return results;
}

class Board extends Component {

  constructor(props) {
    super(props);

    this.state = {
      rowHeight: 1
    };

    this.handleWindowResize = this.handleWindowResize.bind(this);
    window.addEventListener('resize', this.handleWindowResize);
  }

  componentDidMount() {
    this.calculateRowHeight();
  }

  calculateRowHeight() {
    const rowHeight = (window.innerHeight - 90) / 3;

    this.setState({
      rowHeight
    });
  }

  handleWindowResize() {
    this.calculateRowHeight();
  }

  render() {
    const { images } = this.props;
    const { rowHeight } = this.state;
    const groups = groupImages(images);

    return (
      <div className='board'>
        {groups.map((rowImages, index) => (
          <div className='board__row' key={index}>
            {rowImages.map((image, index) => (
              <Card 
                className='board__item'
                key={index}
                style={{
                  height: rowHeight,
                  width: image.width * rowHeight / image.height
                }}
              >
                <CardMedia 
                  className='board__image'
                  image={`/${image.imageKey}`}
                />
                <CardActions className='item__action' disableActionSpacing>
                  <IconButton color='contrast' aria-label="Add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

Board.propTypes = {
  images: PropTypes.array.isRequired
};

export default Board;