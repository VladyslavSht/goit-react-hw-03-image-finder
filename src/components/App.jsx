import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

export class App extends React.Component {
  state = {
    search: '',
  };

  handleSearchSubmit = search => {
    this.setState({ search });
  };

  render() {
    return (
      <div
        style={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery search={this.state.search} />
        <ToastContainer autoClose={1000} />
      </div>
    );
  }
}
