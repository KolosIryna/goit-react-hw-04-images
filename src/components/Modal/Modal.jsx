import { useEffect } from 'react';

import { StyledModal } from './Modal.styled';

export const Modal = ({ isOpen, imageUrl, tags, onCloseModal }) => {
  // componentDidMount() {
  //   window.addEventListener('keydown', this.onKeyDown);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.onKeyDown);
  // }
  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onCloseModal]);

  const onKeyDown = event => {
    if (event.code === 'Escape' && isOpen) {
      onCloseModal();
    }
  };

  const onOverlayClick = event => {
    if (event.currentTarget === event.target) {
      onCloseModal();
    }
  };

  return (
    isOpen && (
      <StyledModal onClick={onOverlayClick} className="overlay">
        <div className="modal">
          <img src={imageUrl} alt={tags} />
        </div>
      </StyledModal>
    )
  );
};
