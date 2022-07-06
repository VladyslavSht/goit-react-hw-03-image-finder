import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';

class App extends Component {
  state = {
    response: [],
    search: null,
    page: 0,
    error: null,
    status: 'idle',
    showModal: false,
    modalValue: [],
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.search !== this.state.search ||
      prevState.page !== this.state.page
    ) {
      this.requestHandler();
    } else {
      return;
    }
  }

  createArr = search => {
    const newArr = search.hits.map(elem => {
      return { id: elem.id, small: elem.webformatURL, big: elem.largeImageURL };
    });

    this.setState(prevState => {
      return {
        response: [...prevState.response, ...newArr],
        status: 'resolved',
      };
    });
  };

  requestHandler = () => {
    const { search, page } = this.state;
    const key = '26995225-4fa3fe4f15fe1635ebf8d0ee7';

    this.setState({ status: 'pending' });

    fetch(`https://pixabay.com/api/?key=${key}&q=${search}&page=${page}
    &image_type=photo&orientation=horizontal&per_page=12`)
      .then(response => {
        if (!response.ok) {
          return Promise.reject(new Error('Not valid search'));
        }
        return response.json();
      })
      .then(pictures => {
        if (pictures.total === 0) {
          toast.warning('Not valid search');
          return this.setState({ status: 'rejected' });
        }

        this.createArr(pictures);

        if (pictures.hits.length < 12) {
          toast.warning('There are no more results');
          this.setState({ status: 'rejected' });
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({ status: 'rejected' });
      });
  };

  searchImage = search => {
    this.setState(prevState => {
      if (prevState.search !== search) {
        return {
          page: 1,
          search: search,
          response: [],
        };
      }
      return { search: search };
    });
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleModal = id => {
    const imageId = this.state.response.find(elem => elem.id === id);
    this.setState({ modalValue: imageId });
    this.modalOpen();
  };

  modalOpen = () => {
    this.setState({ showModal: true });
  };

  modalClose = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { response, status, showModal, modalValue } = this.state;

    return (
      <div>
        {showModal && <Modal value={modalValue} onClose={this.modalClose} />}
        <Searchbar submit={this.searchImage} />

        <ImageGallery response={response} modal={this.handleModal} />

        {status === 'pending' && <Loader />}

        {status === 'resolved' && <Button handleLoadMore={this.loadMore} />}
        <ToastContainer autoClose={1000} />
      </div>
    );
  }
}

export default App;
