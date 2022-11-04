import { Component } from 'react';
import { toast } from 'react-toastify';
import propTypes from 'prop-types'; 
import css from './SearchBar.module.css'

export class SearchBar extends Component {
  state = {
    imageName: '',
  };

  handleImageNameChange = e => {
    // console.log(e.currentTarget.value);
    this.setState({ imageName: e.currentTarget.value });
    e.currentTarget.value = this.state.imageName;
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.imageName.trim() === '') {
        toast.warn("Введіть назву зображення");
      return;
    }
    // this.setState({ imageName: e.target.inputImage.value });
    this.props.onFormSubmit(this.state.imageName);
    // e.target.inputImage.value = '';
    this.setState({ imageName: '' });
  };

  render() {
    return (
      <header className={css.searchBar}>
        <form className={css.searchForm} onSubmit={this.handleSubmit} >
          <button className={css.searchForm_button} type="submit" >
            <span className={css.searchForm_button_label}>Search</span>
          </button>

          <input className={css.searchForm_input}
            onChange={this.handleImageNameChange}
            name="inputImage"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.imageName}
          />
        </form>
      </header>
    );
  }
}

SearchBar.propTypes = {
  onFormSubmit: propTypes.func.isRequired,
};