import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useHistory } from "react-router-dom";

const ListGroupMenuDropdown = ({dropdownTitle, dropdownItems}) => {
  const history = useHistory();
  const [isOpen, setToggleState] = useState(false);

  function handleToggleDropdown() {
      setToggleState(!isOpen);
  }
  
  function onItemClick(url) {
    return () => {
      history.push(url);
    }
  }

  return (
      <Dropdown isOpen={isOpen} toggle={handleToggleDropdown}>
          <DropdownToggle caret tag="a" className="nav-link">
              { dropdownTitle }
          </DropdownToggle>
          <DropdownMenu>
              { dropdownItems.map((item, key) => (
                <DropdownItem key={key} onClick={onItemClick(`/category/${item.slug}`)}>
                  {item.title}
                </DropdownItem>
              )) }
          </DropdownMenu>
      </Dropdown>
  )
};

ListGroupMenuDropdown.propTypes = {
    dropdownTitle: PropTypes.string,
    dropdownItems: PropTypes.array
};

export default ListGroupMenuDropdown;
