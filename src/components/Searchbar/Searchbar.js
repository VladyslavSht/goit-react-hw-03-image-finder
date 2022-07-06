import React, { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

class Searchbar extends Component {
  state = { text: '' };

  handleInput = e => {
    const { value } = e.currentTarget;
    this.setState({ text: value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.text.trim() === '') {
      return toast.warning('Enter search request');
    }
    this.props.submit(this.state.text);
  };

  render() {
    const { text } = this.state;

    return (
      <header className={s.header}>
        <form className={s.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.button}>
            <span className="button-label">Search</span>
          </button>
          <input
            className={s.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={text}
            onChange={this.handleInput}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default Searchbar;
