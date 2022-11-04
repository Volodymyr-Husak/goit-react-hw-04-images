import { Component } from 'react';
import { ImageGalleryItem } from './ImageGalleryItem';
import propTypes from 'prop-types'; 
import css from './ImageGallery.module.css'
export class ImageGallery extends Component {
  render() {
    return (
      <ul className={css.imageGallery}>
        {this.props.arrImage.map(({ id, webformatURL, largeImageURL, tags}) => {
          return (
            <ImageGalleryItem
              key={id}
              id={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              tags={tags}
              onClickImage={this.props.onClickImage}
            />
          );
        })}
      </ul>
    );
  }
}
ImageGallery.propTypes = {
  arrImage: propTypes.array.isRequired,
  onClickImage: propTypes.func.isRequired,
};