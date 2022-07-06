import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { id, big } = this.props.value;

    return createPortal(
      <div className={s.overlay} onClick={this.handleClick}>
        <div className={s.modal}>
          <img className={s.img} src={big} alt={id} />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  value: PropTypes.shape({
    big: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    small: PropTypes.string.isRequired,
  }),
  funcClose: PropTypes.func.isRequired,
};

export default Modal;
