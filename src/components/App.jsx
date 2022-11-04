
import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThreeCircles } from 'react-loader-spinner';

import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    imageName: '',
    arrImage: [],
    page: 1,
    isLoading: false,
    isModal: null,
  };

  KEY = '29882224-53e6cb6eb5c61ad27904c20c4';
  componentDidUpdate(prevProps, prevState) {
    if (this.state.isModal) {
      window.addEventListener('keydown', this.onPressEsc);
    }
    if (this.state.isModal === null) {
      window.removeEventListener('keydown', this.onPressEsc);
    }

    if (
      prevState.imageName !== this.state.imageName ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isLoading: true });
      fetch(
        `https://pixabay.com/api/?q=${this.state.imageName}&page=${this.state.page}&key=${this.KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => res.json())
        .then(obj => {
          if (this.state.arrImage.length > 0) {
            this.setState({ isLoading: false });
            this.setState(prevState => {
              return { arrImage: [...prevState.arrImage, ...obj.hits] };
            });
          } else {
            this.setState({ page: 1 });
            this.setState({ arrImage: obj.hits });
            this.setState({ isLoading: false });
          }
        });
    }
  }

  handleFormSubmit = name => {
    this.setState({ page: 1 });
    this.setState({ arrImage: [] });
    this.setState({ imageName: name });    
  };

  onClickLoadMore = e => {
    e.preventDefault();
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  onClickImage = e => {
      const currentModalId = Number(e.currentTarget.id);
      this.state.arrImage.map(obj => {
        if (obj.id === currentModalId) {
          return this.setState({ isModal: obj });
        } else {
          return null;
        }
      });
  };

  closeModalClickBackdrop = e => {
    // console.log(e.currentTarget);
    // if (e.currentTarget.className === 'Overlay') {
      this.setState({ isModal: null });
    // }
  };

  onPressEsc = e => {
    if (e.key === 'Escape') {
      // console.log(e.key)
      this.setState({ isModal: null });
      window.removeEventListener('keydown', this.onWindowKeypress);
    }
  };

  render() {
    return (
      <div
        // onKeyDown={this.closeModalEsc}
        style={{
          height: '100vh',
          // display: 'flex',
          // justifyContent: 'center',
          // alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <SearchBar onFormSubmit={this.handleFormSubmit} />

        <ImageGallery
          arrImage={this.state.arrImage}
          onClickImage={this.onClickImage}
        />
        {this.state.isLoading && (
          <ThreeCircles
            position="bottom-center"
            height="100"
            width="100"
            color="#35a089"
            wrapperStyle={{}}
            wrapperClass="spinner"
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor=""
            innerCircleColor=""
            middleCircleColor=""
          />
        )}
        {this.state.arrImage.length > 0 && (
          <Button onClickLoadMore={this.onClickLoadMore} />
        )}
        {this.state.isModal && (
          <Modal
            currentImage={this.state.isModal}
            closeModalClickBackdrop={this.closeModalClickBackdrop}
          />
        )}
        <ToastContainer
          position="bottom-center"
          autoClose={2000}
          theme="dark"
        />
      </div>
    );
  }
}
