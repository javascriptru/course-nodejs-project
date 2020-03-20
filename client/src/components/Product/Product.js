import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchProductById} from '../../store/modules/products/actions';
import Loader from '../Loader';
import ProductCarousel from './ProductCarousel';
import {Col, Nav, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap";
import classnames from 'classnames';
import {getNounReviews} from "../../utils/getNoun";

const formatter = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' });

function Product({ product, fetchProductById, match }) {
  useEffect(() => {
    fetchProductById(match.params.id);
  }, [match.params.id]);
  
  const [activeTab, setActiveTab] = useState('description');
  
  function toggle(tab) {
    if(activeTab !== tab) setActiveTab(tab);
  }

  if (product.fetching || !product.product) {
    return <Loader />;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-5">
          <ProductCarousel images={product.product.images} />
        </div>
        <div className="col-lg-7">
          <div className="col-lg-12 mt-6 mb-2 p-0">
            <h3 className="h5">{product.product.title}</h3>
            <div className="rate my-2">
              {new Array(5).fill('').map((el, i) => (
                <i key={i} className={`icon-star${i < product.product.rating ? ' checked' : ''}`} />
              ))}
              <span className="rate-amount ml-2">
                {`${product.product.reviews.length} ${getNounReviews(product.product.reviews.length)}`}
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-9 py-2 product-info">
              {!!product.product.details[0] &&
                <React.Fragment>
                  <p><strong>{product.product.details[0].title}</strong></p>
                  <ul>
                    {product.product.details[0].items.map((detail, i) => (
                      <li key={`details_0_${i}`}>
                        <span>{detail.name}: {detail.value}</span>
                      </li>
                    ))}
                  </ul>
                </React.Fragment>
              }
              {!!product.product.details[1] &&
                <React.Fragment>
                  <p><strong>{product.product.details[1].title}</strong></p>
                  <ul>
                    {product.product.details[1].items.map((detail, i) => (
                      <li key={`details_1_${i}`}>
                        <span>{detail.name}: {detail.value}</span>
                      </li>
                    ))}
                  </ul>
                </React.Fragment>
              }
            </div>
            <div className="col-lg-3">
              <h4 className="col-title price-text mb-2 mt-0">{formatter.format(product.product.price)}</h4>
              <Link to={`/checkout/${product.product.id}`} className="btn btn-block btn-primary btn-lg">Купить</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-4">
        <div className="col-lg-7 offset-lg-5">
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === 'description' })}
                onClick={() => { toggle('description'); }}>
                Описание
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === 'characteristics' })}
                onClick={() => { toggle('characteristics'); }}>
                Характеристики
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === 'reviews' })}
                onClick={() => { toggle('reviews'); }}>
                Отзывы
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="description">
              <Row>
                <Col sm="12">
                  <p className="product-info">
                    {product.product.description}
                  </p>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="characteristics">
              <Row>
                <Col sm="12">
                  <dl className="row">
                    {product.product.details.slice(2, 5).map((detail, i) => {
                      return (
                        <React.Fragment key={`fragment_details_${i}`}>
                          {detail.items.map((item, j) => (
                            <React.Fragment key={`details_${i}_${j}`}>
                              <dt className="col-sm-4">{item.name}</dt>
                              <dd className="col-sm-8">{item.value}</dd>
                            </React.Fragment>
                          ))}
                        </React.Fragment>
                      )
                    })}
                  </dl>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="reviews">
              <Row>
                <Col sm="12">
                  <dl className="row">
                    {product.product.reviews.map((review, i) => (
                      <React.Fragment key={i}>
                        <dt className="col-sm-5">
                          <p>{review.author}</p>
                          <p>
                            {new Array(5).fill('').map((el, i) => (
                              <span key={i} className={`fa fa-star${i < review.rating ? ' checked' : ''}`} />
                            ))}
                          </p>
                        </dt>
                        <dd className="col-sm-7"><p>{review.text}</p></dd>
                      </React.Fragment>
                    ))}
                  </dl>
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state, props) {
  return {
    product: state.products.byId[props.match.params.id] || {}
  };
}

const mapDispatchToProps = { fetchProductById };


export default connect(mapStateToProps, mapDispatchToProps)(Product);
