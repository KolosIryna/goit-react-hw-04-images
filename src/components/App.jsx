import { useEffect, useState } from 'react';

import { getImage } from 'services/api';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';

import { StyledAppContainer } from './App.styled';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(0);
  const [modal, setModal] = useState({
    isModalOpen: false,
    modalImageUrl: '',
  });

  const [prevSearchQuery, setPrevSearchQuery] = useState('');
  const [prevPage, setPrevPage] = useState(1);

  const handleSearch = query => {
    setSearchQuery(query);
    setPage(1);
    setImages([]);
    setTotalImages(0);
  };

  useEffect(() => {
    const fetchAllImages = async () => {
      try {
        setIsLoading(true);

        const data = await getImage(searchQuery, page);
        if (!data.hits.length) return;

        setImages(prevImages => [...prevImages, ...data.hits]);
        setTotalImages(data.totalHits);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchQuery !== prevSearchQuery || page !== prevPage) {
      fetchAllImages();
    }

    setPrevSearchQuery(searchQuery);
    setPrevPage(page);
  }, [searchQuery, page, prevSearchQuery, prevPage]);

  const openModal = imageUrl => {
    setModal({
      isModalOpen: true,
      modalImageUrl: imageUrl,
    });
  };

  const onCloseModal = () => {
    setModal({
      isModalOpen: false,
      modalImageUrl: '',
    });
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <StyledAppContainer>
      <Searchbar onSearch={handleSearch} />
      {images.length > 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      <Modal
        isOpen={modal.isModalOpen}
        imageUrl={modal.modalImageUrl}
        onCloseModal={onCloseModal}
      />
      {images.length !== totalImages && !isLoading && (
        <Button onClick={loadMore} />
      )}
      {isLoading && <Loader />}
      {error && <p>{error}</p>}
    </StyledAppContainer>
  );
};
