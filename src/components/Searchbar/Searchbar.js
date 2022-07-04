import React from 'react';
import { toast } from 'react-toastify';
import { ImSearch } from 'react-icons/im';

class Searchbar extends React.Component {
  state = {
    search: '',
  };

  handleChange = e => {
    this.setState({ search: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.search.trim() === '') {
      toast.warning('No name');
      return;
    }
    this.props.onSubmit(this.state.search);

    this.setState({ search: '' });
  };

  render() {
    return (
      <header class="searchbar">
        <form class="form" onSubmit={this.handleSubmit}>
          <button type="submit" class="button">
            <ImSearch style={{ marginRight: 8 }} />
            <span class="button-label">Search</span>
          </button>

          <input
            class="input"
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
