import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'reactstrap';

const ModalBtnBack = ({handleToggleModal}) => (
  <Button
    color="link"
    className="btn-close float-none px-2 py-2"
    onClick={handleToggleModal}
    aria-label="close"
  >
    <img src="/assets/icons/icon-close.svg" alt="close"/>
  </Button>
);

ModalBtnBack.propTypes = {
  handleToggleModal: PropTypes.func.isRequired
};

export default ModalBtnBack;
