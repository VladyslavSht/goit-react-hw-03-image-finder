import React from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Puff } from 'react-loader-spinner';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

class ImageGallery extends React.Component {
  state = {
    search: null,
    error: null,
    status: 'idle',
    total: null,
    page: 1,
  };

  handleButton() {
    console.log(this.state);
    // this.setState(prevState => {
    //     return {page: prevState.page + 1}
    // })
    // console.log(this.state.page);
  }

  componentDidUpdate(prevProps) {
    const key = '26995225-4fa3fe4f15fe1635ebf8d0ee7';
    const searchWord = this.props.search;
    if (prevProps.search !== this.props.search) {
      this.setState({ status: 'pending' });
      fetch(
        `https://pixabay.com/api/?q=${searchWord}&page=1&key=${key}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          } else if (response.total === 0) {
            return Promise.reject(new Error('Not valid search'));
          }
        })
        .then(search => {
          this.setState({
            search: search.hits,
            status: 'resolved',
            total: search.total,
          });
          this.setState(prevState => {
            return (prevState.page = +1);
          });
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  render() {
    const { error, status, search, total } = this.state;

    if (status === 'pending') {
      return <Puff color="#00BFFF" height={80} width={80} />;
    }

    if (total === 0) {
      return <h1>По запросу {this.props.search} результатов нет</h1>;
    }

    if (status === 'rejected') {
      return <h1>{error.message}</h1>;
    }

    if (status === 'resolved') {
      return (
        <div>
          <ul className="gallery">
            {search.map(({ id, previewURL }) => (
              <ImageGalleryItem key={id} previewURL={previewURL} />
            ))}
          </ul>
          <button type="button" onClick={this.handleButton}>
            Load more
          </button>
        </div>
      );
    }
  }
}

export default ImageGallery;
