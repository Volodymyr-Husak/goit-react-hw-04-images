import { Component } from "react";
import propTypes from 'prop-types';
import css from './Button.module.css'

export class Button extends Component {
    render() {
        return <button className={css.button} onClick={this.props.onClickLoadMore}type="click">Load more</button>
    }
}

Button.propTypes = {
  onClickLoadMore: propTypes.func.isRequired,
};