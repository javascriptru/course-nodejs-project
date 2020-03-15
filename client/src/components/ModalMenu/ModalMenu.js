import React, {useState} from 'react';
import {withRouter, Link} from 'react-router-dom';

import Chat from '../Chat/Chat';
import ModalContextMenu from '../ModalContextMenu';
import ModalAsItem from './ModalAsItem';
import {Form, Input, FormGroup, Button} from 'reactstrap';

// Create a Context
const OpeningModalContext = React.createContext();

// Create modal provider
const ModalProvider = ({item}) => (
  <OpeningModalContext.Provider value={item}>
    <ModalAsItem context={OpeningModalContext} isChat={item.isChat} />
  </OpeningModalContext.Provider>
);

const ModalMenu = ({token, categories, history}) => {
  const [query, setQuery] = useState('');
  
  function onSearch(event) {
    event.preventDefault();
    if (!query.length) return;
    history.push(`/search?query=${query}`);
  }
  
  return (
    <div className="modal-menu">
      {!token &&
      <React.Fragment>
        <Link to="/login" className="modal-menu__item">Вход</Link>
        <Link to="/register" className="modal-menu__item">Регистрация</Link>
      </React.Fragment>
      }
      {!!token &&
      <ModalProvider item={{
        title: "Есть вопрос?",
        modalComponent: <Chat />,
        isChat: true,
      }} />
      }
      <div className="modal-menu__item">
        <Form inline>
          <FormGroup style={{marginBottom: 0}}>
            <Input
              type="text"
              name="query"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Поиск" />
          </FormGroup>
          <Button onClick={onSearch}>Найти</Button>
        </Form>
      </div>
      <h3 className="h6 mb-0 modal-menu__title">Категории</h3>
      {categories.map(category => {
        const item = {
          title: category.title,
          modalComponent: <ModalContextMenu data={category.subcategories.map(subcategory => ({
            title: subcategory.title,
            src: `/category/${subcategory.slug}`
          }))} />,
          isChat: false
        };
      
        return (
          <ModalProvider key={category.id} item={item} />
        );
      })}
    </div>
  );
}

export default withRouter(ModalMenu);
