import { Component } from 'react';
import propTypes from 'prop-types';
import css from './Modal.module.css'

export class Modal extends Component {
  render() {
    return (
      <div className={css.overlay} onClick={this.props.closeModalClickBackdrop}>
        <div className={css.modal}>
          <img
            src={this.props.currentImage.largeImageURL}
            alt={this.props.currentImage.tags}
          />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  closeModalClickBackdrop: propTypes.func.isRequired,
  currentImage: propTypes.object.isRequired,
};