import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import ListGroupMenuDropdown from './Dropdown';

const ListGroupMenu = ({ categories }) => {
    return (
      <div className="d-none d-lg-block col-lg-3">
        <ListGroup className="sidebar">
            {categories.map(category => {
                return (
                  <ListGroupItem key={category.id}>
                      <ListGroupMenuDropdown dropdownTitle={category.title} dropdownItems={category.subcategories} />
                  </ListGroupItem>
                );
            })}
        </ListGroup>
      </div>
    )
};

export default ListGroupMenu;
