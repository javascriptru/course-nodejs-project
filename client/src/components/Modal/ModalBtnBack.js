import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'reactstrap';

const ModalBtnBack = ({handleToggleModal}) => (
  <Button
    color="link"
    className="arrow-back px-2 py-2"
    onClick={handleToggleModal}
    aria-label="back"
  >
    <img src="/assets/icons/icon-arrow.svg" alt="back"/>
  </Button>
);

ModalBtnBack.propTypes = {
  handleToggleModal: PropTypes.func.isRequired
};

export default ModalBtnBack;
