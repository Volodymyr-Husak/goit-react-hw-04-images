// import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThreeCircles } from 'react-loader-spinner';

import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { useState, useEffect } from 'react';

export const App = () => {
  const [imageName, setImageName] = useState('');
  const [arrImage, setArrImage] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(null);

  const KEY = '29882224-53e6cb6eb5c61ad27904c20c4';

  useEffect(() => {
    window.addEventListener('keydown', onPressEsc);
    return () => {
      window.removeEventListener('keydown', onPressEsc);
    };
  }, [isModal]);

  // const arrImageForFetch = arrImage;

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://pixabay.com/api/?q=${imageName}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(res => res.json())
      .then(obj => {
        if (arrImage.length > 0) {
          // console.log('dsfsdfdsfs')
          setIsLoading(false);
          setArrImage(prevState => {
            return [...prevState, ...obj.hits];
          });
        } else {
        setPage(1);
        setArrImage(obj.hits);
        setIsLoading(false);
        }
      });
  }, [imageName, page]);

  // const addObjectsImage = arr => {
  //   if (arrImage.length > 0) {
  //     console.log('dsfsdfdsfs');
  //     setIsLoading(false);
  //     setArrImage(prevState => {
  //       return [...prevState, ...arr];
  //     });
  //   }
  // };

  const handleFormSubmit = name => {
    setPage(1);
    setArrImage([]);
    setImageName(name);
  };

  const onClickLoadMore = e => {
    e.preventDefault();
    setPage(prevState => {
      return prevState + 1;
    });
  };

  const onClickImage = e => {
    const currentModalId = Number(e.currentTarget.id);
    arrImage.map(obj => {
      if (obj.id === currentModalId) {
        return setIsModal(obj);
      } else {
        return null;
      }
    });
  };

  const closeModalClickBackdrop = e => {
    // console.log(e.currentTarget);
    // if (e.currentTarget.className === 'Overlay') {
    setIsModal(null);
    // }
  };

  const onPressEsc = e => {
    if (e.key === 'Escape') {
      // console.log(e.key)
      setIsModal(null);
      window.removeEventListener('keydown', this.onWindowKeypress);
    }
  };

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
      <SearchBar
        onFormSubmit={handleFormSubmit}
        setImageName={setImageName}
        imageName={imageName} />

      <ImageGallery arrImage={arrImage} onClickImage={onClickImage} />
      {isLoading && (
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
      {arrImage.length > 0 && <Button onClickLoadMore={onClickLoadMore} />}
      {isModal && (
        <Modal
          currentImage={isModal}
          closeModalClickBackdrop={closeModalClickBackdrop}
        />
      )}
      <ToastContainer position="bottom-center" autoClose={2000} theme="dark" />
    </div>
  );
};

// export class App1 extends Component {
//   state = {
//     imageName: '',
//     arrImage: [],
//     page: 1,
//     isLoading: false,
//     isModal: null,
//   };

//   KEY = '29882224-53e6cb6eb5c61ad27904c20c4';
//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.isModal) {
//       window.addEventListener('keydown', this.onPressEsc);
//     }
//     if (this.state.isModal === null) {
//       window.removeEventListener('keydown', this.onPressEsc);
//     }

//     if (
//       prevState.imageName !== this.state.imageName ||
//       prevState.page !== this.state.page
//     ) {
//       this.setState({ isLoading: true });
//       fetch(
//         `https://pixabay.com/api/?q=${this.state.imageName}&page=${this.state.page}&key=${this.KEY}&image_type=photo&orientation=horizontal&per_page=12`
//       )
//         .then(res => res.json())
//         .then(obj => {
//           if (this.state.arrImage.length > 0) {
//             this.setState({ isLoading: false });
//             this.setState(prevState => {
//               return { arrImage: [...prevState.arrImage, ...obj.hits] };
//             });
//           } else {
//             this.setState({ page: 1 });
//             this.setState({ arrImage: obj.hits });
//             this.setState({ isLoading: false });
//           }
//         });
//     }
//   }

//   handleFormSubmit = name => {
//     this.setState({ page: 1 });
//     this.setState({ arrImage: [] });
//     this.setState({ imageName: name });
//   };

//   onClickLoadMore = e => {
//     e.preventDefault();
//     this.setState(prevState => {
//       return { page: prevState.page + 1 };
//     });
//   };

//   onClickImage = e => {
//     const currentModalId = Number(e.currentTarget.id);
//     this.state.arrImage.map(obj => {
//       if (obj.id === currentModalId) {
//         return this.setState({ isModal: obj });
//       } else {
//         return null;
//       }
//     });
//   };

//   closeModalClickBackdrop = e => {
//     // console.log(e.currentTarget);
//     // if (e.currentTarget.className === 'Overlay') {
//     this.setState({ isModal: null });
//     // }
//   };

//   onPressEsc = e => {
//     if (e.key === 'Escape') {
//       // console.log(e.key)
//       this.setState({ isModal: null });
//       window.removeEventListener('keydown', this.onWindowKeypress);
//     }
//   };

//   render() {
//     return (
//       <div
//         // onKeyDown={this.closeModalEsc}
//         style={{
//           height: '100vh',
//           // display: 'flex',
//           // justifyContent: 'center',
//           // alignItems: 'center',
//           fontSize: 40,
//           color: '#010101',
//         }}
//       >
//         <SearchBar onFormSubmit={this.handleFormSubmit} />

//         <ImageGallery
//           arrImage={this.state.arrImage}
//           onClickImage={this.onClickImage}
//         />
//         {this.state.isLoading && (
//           <ThreeCircles
//             position="bottom-center"
//             height="100"
//             width="100"
//             color="#35a089"
//             wrapperStyle={{}}
//             wrapperClass="spinner"
//             visible={true}
//             ariaLabel="three-circles-rotating"
//             outerCircleColor=""
//             innerCircleColor=""
//             middleCircleColor=""
//           />
//         )}
//         {this.state.arrImage.length > 0 && (
//           <Button onClickLoadMore={this.onClickLoadMore} />
//         )}
//         {this.state.isModal && (
//           <Modal
//             currentImage={this.state.isModal}
//             closeModalClickBackdrop={this.closeModalClickBackdrop}
//           />
//         )}
//         <ToastContainer
//           position="bottom-center"
//           autoClose={2000}
//           theme="dark"
//         />
//       </div>
//     );
//   }
// }
