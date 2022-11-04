import { Component } from 'react';
import css from './ImageGallery.module.css'
export class ImageGalleryItem extends Component {
  render() {
    return (
      <li className={css.imageGalleryItem} onClick={this.props.onClickImage} id={this.props.id}>
        <img className={css.imageGalleryItem_image} src={this.props.webformatURL} alt={this.props.tags} />
      </li>
    );
  }
}
