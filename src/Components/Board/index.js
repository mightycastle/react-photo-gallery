'use strict';

import React, { Component } from 'react';
import Card, { CardActions, CardMedia } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import FavoriteIcon from 'material-ui-icons/Favorite';
import cx from 'classnames';

import PropTypes from 'prop-types';

//css
require('./style.css');

const IMAGE_PADDING = 5;

const groupImages = (images) => {
  const results = [[], [], []];
  images.forEach((image, index) => {
    results[index % 3].push(image);
  });
  return results;
}

const isSelected = (item, { selectedStyles, selectedQualities }) =>
  intersect(selectedStyles, item.metaData.designStyle).length > 0 ||
  intersect(selectedQualities, item.metaData.qualityStandard).length > 0

const intersect = (a, b) => {
  return [...new Set(a)].filter(x => new Set(b).has(x));
}

const getPageOffset = (images, rowHeight, boardWidth, page) => {
  let totalWidth = 0;
  let offset = 0;
  let curPage = 0;
  let index = 0;
  let lastWidth = 0;
  const imageHeight = rowHeight - IMAGE_PADDING;

  while(curPage < page && index < images.length) {
    totalWidth += lastWidth;
    const image = images[index];
    const width = image.width * imageHeight / image.height + IMAGE_PADDING * 2;
    if (offset + width > boardWidth) {
      offset = 0;
      curPage ++;
    }
    offset += width;
    lastWidth = width;
    index ++;
  }
  return totalWidth;
}

const getPageSize = (images, rowHeight, boardWidth) => {
  let offset = 0;
  let pageSize = 1;
  let index = 0;
  const imageHeight = rowHeight - IMAGE_PADDING;

  while(index < images.length) {
    const image = images[index];
    const width = image.width * imageHeight / image.height + IMAGE_PADDING * 2;
    if (offset + width > boardWidth) {
      offset = 0;
      pageSize ++;
    }
    offset += width;
    index ++;
  }
  return pageSize;
}

class Board extends Component {

  constructor(props) {
    super(props);

    this.state = {
      rowHeight: 1,
      boardWidth: 1
    };

    this.handleWindowResize = this.handleWindowResize.bind(this);
    window.addEventListener('resize', this.handleWindowResize);
  }

  componentDidMount() {
    this.calculateRowHeight();
  }

  calculateRowHeight() {    
    const { images, setPageSize } = this.props;
    const rowHeight = (window.innerHeight - 90) / 3;
    const boardWidth = this.board.offsetWidth;

    this.setState({
      rowHeight,
      boardWidth
    });

    const groups = groupImages(images);
    const pageSizes = groups.map((images) => getPageSize(images, rowHeight, boardWidth));
    const maxPageSize = Math.max(...pageSizes);
    setPageSize(maxPageSize);
  }

  handleWindowResize() {
    this.calculateRowHeight();
  }

  render() {
    const { images, page } = this.props;
    const { rowHeight, boardWidth } = this.state;
    const imageHeight = rowHeight - IMAGE_PADDING;
    const groups = groupImages(images);
    console.log(this.props);
    
    return (
      <div className='board' ref={(ele) => this.board = ele}>
        {groups.map((rowImages, index) => (
          <div 
            className='board__row' 
            key={index}
            style={{
              height: rowHeight,
              transform: `translateX(-${getPageOffset(rowImages, rowHeight, boardWidth, page)}px)`
            }}
          >
            {rowImages.map((image, imageIndex) => (
              <Card 
                className={cx('board__item', {
                  'board__item--selected': isSelected(image, this.props)
                })}
                key={imageIndex}
                style={{
                  height: imageHeight,
                  width: image.width * imageHeight / image.height
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
  images: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  setPageSize: PropTypes.func.isRequired,
  selectedStyles: PropTypes.array.isRequired,
  selectedQualities: PropTypes.array.isRequired
};

export default Board;