import React from 'react';
import PropTypes from 'prop-types';
import {Modal as ReactstrapModal, ModalHeader} from 'reactstrap';
import ModalBtnBack from './ModalBtnBack';
import ModalBtnClose from './ModalBtnClose';

const Modal = ({title, content, isBackBtn, isCloseBtn, isOpen, handleToggleModal, ...rest}) => (
  <ReactstrapModal
    title={title}
    isOpen={isOpen}
    toggle={handleToggleModal}
    content={content}
    {...rest}
  >
    <ModalHeader>
      {title}
      {isBackBtn && (<ModalBtnBack handleToggleModal={handleToggleModal} />)}
      {isCloseBtn && (<ModalBtnClose handleToggleModal={handleToggleModal} />)}
    </ModalHeader>
    {content}
  </ReactstrapModal>
);

Modal.propTypes = {
  title: PropTypes.string,
  isBackBtn: PropTypes.bool,
  isCloseBtn: PropTypes.bool,
  content: PropTypes.element.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleToggleModal: PropTypes.func.isRequired
};

export default Modal;
