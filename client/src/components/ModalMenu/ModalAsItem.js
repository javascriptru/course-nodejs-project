import React, {useContext} from "react";
import PropTypes from 'prop-types';
import useModal from "../../store/modules/helpers/useModal";
import Modal from '../Modal/Modal';
import {Button} from 'reactstrap';

const ModalAsItem = ({context, isChat}) => {
  const passedModalData = useContext(context);
  const {isOpen, handleToggleModal} = useModal();
  return (
    <>
      <Modal
        title={passedModalData.title}
        content={passedModalData.modalComponent}
        isBackBtn
        isCloseBtn
        isOpen={isOpen}
        handleToggleModal={handleToggleModal}
      />
      <Button color="link" className="modal-menu__item is-submenu w-100"
              onClick={handleToggleModal}
      >
        {passedModalData.title} {isChat && <img src="assets/icons/icon-chat.svg" alt=""/>}
      </Button>
    </>
  )
};

ModalAsItem.propTypes = {
  context: PropTypes.object.isRequired,
  isChat: PropTypes.bool
};

export default ModalAsItem;