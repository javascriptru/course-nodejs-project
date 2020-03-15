import React from "react";
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const ModalContextMenu = ({data}) => (
  <div className="modal-menu">
    {data && data.map((item, key) => (
      <Link to={item.src} key={key} className="modal-menu__item">{item.title}</Link>
    ))}
  </div>
);

ModalContextMenu.propTypes = {
  data: PropTypes.array.isRequired
};

export default ModalContextMenu;