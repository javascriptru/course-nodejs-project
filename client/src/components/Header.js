import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Modal from './Modal/Modal';
import ModalMenu from './ModalMenu/ModalMenu';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import {fetchCategories} from '../store/modules/categories/actions';
import {
  Row,
  Col,
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Form,
  Input,
  Button
} from 'reactstrap';
import useModal from '../store/modules/helpers/useModal';

function Header({token, categories, fetchCategories, history, location}) {
  const values = queryString.parse(location.search);
  const {isOpen, handleToggleModal} = useModal();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [query, setQuery] = useState(values.query || '');
  
  useEffect(() => {
    if (query !== values.query) {
      setQuery(values.query || '');
    }

    if (isOpen) handleToggleModal();
  }, [location.search]);
  
  useEffect(() => {
    if (isOpen) handleToggleModal();
  }, [location.pathname]);
  
  useEffect(() => {
    fetchCategories();
  }, []);

  function handleToggleHeaderMenu() {
    setIsOpenMenu(!isOpenMenu);
  }
  
  function search(event) {
    event.preventDefault();
    if (query === '') return;
    history.push(`/search?query=${query}`);
  }
  
  function logout(e) {
    e.preventDefault();
    localStorage.removeItem('token');
    window.location.href = "/";
  }

  return (
    <header>
      <Navbar light expand="lg">
        <div className="container-xl justify-content-start">
          <Row className="flex-grow-1">
            <Col lg="3">
              <NavbarToggler onClick={handleToggleHeaderMenu} className="d-none d-md-inline-flex d-lg-none">
                <img src="/assets/icons/icon-menu.svg" alt="menu icon"/>
              </NavbarToggler>
              <Modal
                title="Меню"
                content={<ModalMenu token={token} categories={categories} />}
                id="xsMenuModal"
                isCloseBtn
                isOpen={isOpen}
                handleToggleModal={handleToggleModal}
              />
              <NavbarToggler onClick={handleToggleModal} className="d-inline-flex d-md-none">
                <img src="/assets/icons/icon-menu.svg" alt="menu icon"/>
              </NavbarToggler>
              <Link to="/" className="navbar-brand"><strong>AnyShop</strong></Link>
            </Col>
          
            <Col lg="9">
              <Collapse isOpen={isOpenMenu} navbar className="d-flex justify-content-between">
                <Nav navbar className="w-75">
                  <NavItem className="flex-grow-1">
                    <Form onSubmit={search} inline>
                      <Input
                        className="form-control flex-grow-1 mr-1"
                        type="text"
                        placeholder="название товара или бренд"
                        aria-label="Search"
                        value={query}
                        onChange={event => setQuery(event.target.value)}
                      />
                      <Button type="submit" color="primary" outline>Поиск</Button>
                    </Form>
                  </NavItem>
                </Nav>
                {!token &&
                <div>
                  <Link to="/login" className="text-muted">Вход</Link>
                  {' | '}
                  <Link to="/register" className="text-muted">Регистрация</Link>
                </div>
                }
                {!!token &&
                  <a onClick={logout} href="#" className="text-muted">Выйти</a>
                }
              </Collapse>
            </Col>
          </Row>
        </div>
      </Navbar>
    </header>
  );
}

function mapStateToProps(state) {
  return {
    token: state.auth.token,
    categories: state.categories.items,
  };
}

const mapDispatchToProps = { fetchCategories };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
