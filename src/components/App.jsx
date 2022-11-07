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
  const [error, setError] = useState(false);

  const KEY = '29882224-53e6cb6eb5c61ad27904c20c4';

  useEffect(() => {
    window.addEventListener('keydown', onPressEsc);
    return () => {
      window.removeEventListener('keydown', onPressEsc);
    };
  }, [isModal]);

  useEffect(() => {
    if (imageName === '') return;
    setIsLoading(true);
    try {
      fetch(
        `https://pixabay.com/api/?q=${imageName}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => res.json())
        .then(obj => {
          if (arrImage.length > 0) {
            setIsLoading(false);
            setArrImage(prevState => {
              let bool = true;
              prevState.map(object => {
                if (object.id === obj.hits[0].id) {
                  return (bool = false);
                } else {
                  return null;
                }
              });
              if (bool) {
                return [...prevState, ...obj.hits];
              } else {
                return prevState;
              }
            });
          } else {
            setPage(1);
            setArrImage(obj.hits);
            setIsLoading(false);
            // setError(true);
          }
        });
    } catch (error) {
      setError(true);
    } finally {
      // setIsLoading(false);
    }
  }, [imageName, page, arrImage]);

  const handleFormSubmit = name => {
    setArrImage([]);
    setImageName(name);
    setPage(1);
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
    setIsModal(null);
  };

  const onPressEsc = e => {
    if (e.key === 'Escape') {
      setIsModal(null);
    }
  };

  return (
    <div
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
        // setImageName={setImageName}
        // imageName={imageName}
        // setArrImage={setArrImage}
      />
      {error && <p>Error download, try again</p>}
      {!error && (
        <ImageGallery arrImage={arrImage} onClickImage={onClickImage} />
      )}
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