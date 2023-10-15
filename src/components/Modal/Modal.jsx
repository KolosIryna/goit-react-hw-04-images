import { Component } from 'react';

import { StyledModal } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = event => {
    if (event.code === 'Escape' && this.props.isOpen) {
      this.props.onCloseModal();
    }
  };

  onOverlayClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onCloseModal();
    }
  };

  render() {
    const { isOpen, imageUrl, tags } = this.props;

    return (
      isOpen && (
        <StyledModal onClick={this.onOverlayClick} className="overlay">
          <div className="modal">
            <img src={imageUrl} alt={tags} />
          </div>
        </StyledModal>
      )
    );
  }
}
