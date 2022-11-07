import { useState } from 'react';
import { toast } from 'react-toastify';
import propTypes from 'prop-types';
import css from './SearchBar.module.css';

export const SearchBar = ({
  onFormSubmit,
  // setImageName,
  // imageName,
  // setArrImage
}) => {
  const [imageName, setImageName] = useState('');

  const handleImageNameChange = e => {

    setImageName(e.currentTarget.value);
    e.currentTarget.value = imageName;
    // setArrImage([])
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (imageName.trim() === '') {
      toast.warn('Введіть назву зображення');
      return;
    };
    onFormSubmit(imageName);
    setImageName('');
  };

  return (
    <header className={css.searchBar}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <button className={css.searchForm_button} type="submit">
          <span className={css.searchForm_button_label}>Search</span>
        </button>

        <input
          className={css.searchForm_input}
          onChange={handleImageNameChange}
          name="inputImage"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={imageName}
        />
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  onFormSubmit: propTypes.func.isRequired,
};